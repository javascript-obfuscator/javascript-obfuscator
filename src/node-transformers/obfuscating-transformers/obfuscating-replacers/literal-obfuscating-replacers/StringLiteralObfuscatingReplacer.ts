import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TStringArrayStorage } from '../../../../types/storages/TStringArrayStorage';

import { ICryptUtils } from '../../../../interfaces/utils/ICryptUtils';
import { IEncodedValue } from '../../../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/IEncodedValue';
import { IEscapeSequenceEncoder } from '../../../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../../interfaces/utils/IRandomGenerator';
import { IStringArrayIndexData } from '../../../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/IStringArrayIndexData';

import { StringArrayEncoding } from '../../../../enums/StringArrayEncoding';

import { AbstractObfuscatingReplacer } from '../AbstractObfuscatingReplacer';
import { NodeMetadata } from '../../../../node/NodeMetadata';
import { NodeFactory } from '../../../../node/NodeFactory';
import { NumberUtils } from '../../../../utils/NumberUtils';
import { Utils } from '../../../../utils/Utils';

@injectable()
export class StringLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer {
    /**
     * @type {number}
     */
    private static readonly minimumLengthForStringArray: number = 3;

    /**
     * @type {number}
     */
    private static readonly rc4KeyLength: number = 4;

    /**
     * @type {number}
     */
    private static readonly rc4KeysCount: number = 50;

    /**
     * @type {ICryptUtils}
     */
    private readonly cryptUtils: ICryptUtils;

    /**
     * @type {IEscapeSequenceEncoder}
     */
    private readonly escapeSequenceEncoder: IEscapeSequenceEncoder;

    /**
     * @type {Map<string, ESTree.Node>}
     */
    private readonly nodesCache: Map <string, ESTree.Node> = new Map();

    /**
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @type {string[]}
     */
    private readonly rc4Keys: string[];

    /**
     * @type {Map<string, string>}
     */
    private readonly stringLiteralHexadecimalIndexCache: Map <string, string> = new Map();

    /**
     * @type {TStringArrayStorage}
     */
    private readonly stringArrayStorage: TStringArrayStorage;

    /**
     * @param {TStringArrayStorage} stringArrayStorage
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     * @param {IRandomGenerator} randomGenerator
     * @param {ICryptUtils} cryptUtils
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.TStringArrayStorage) stringArrayStorage: TStringArrayStorage,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.ICryptUtils) cryptUtils: ICryptUtils,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            options
        );

        this.stringArrayStorage = stringArrayStorage;
        this.escapeSequenceEncoder = escapeSequenceEncoder;
        this.randomGenerator = randomGenerator;
        this.cryptUtils = cryptUtils;

        this.rc4Keys = this.randomGenerator.getRandomGenerator()
            .n(
                () => this.randomGenerator.getRandomGenerator().string({
                    length: StringLiteralObfuscatingReplacer.rc4KeyLength
                }),
                StringLiteralObfuscatingReplacer.rc4KeysCount
            );
    }

    /**
     * @param {string} hexadecimalIndex
     * @returns {Literal}
     */
    private static getHexadecimalLiteralNode (hexadecimalIndex: string): ESTree.Literal {
        const hexadecimalLiteralNode: ESTree.Literal = NodeFactory.literalNode(hexadecimalIndex);

        NodeMetadata.set(hexadecimalLiteralNode, { replacedLiteral: true });

        return hexadecimalLiteralNode;
    }

    /**
     * @param {string} literalValue
     * @returns {Literal}
     */
    private static getRc4KeyLiteralNode (literalValue: string): ESTree.Literal {
        const rc4KeyLiteralNode: ESTree.Literal = NodeFactory.literalNode(literalValue);

        NodeMetadata.set(rc4KeyLiteralNode, { replacedLiteral: true });

        return rc4KeyLiteralNode;
    }

    /**
     * @param {string} nodeValue
     * @returns {Node}
     */
    public replace (nodeValue: string): ESTree.Node {
        if (this.isReservedString(nodeValue)) {
            return NodeFactory.literalNode(nodeValue);
        }

        const useStringArray: boolean = this.canUseStringArray(nodeValue);
        const cacheKey: string = `${nodeValue}-${String(useStringArray)}`;
        const useCacheValue: boolean = this.nodesCache.has(cacheKey) && this.options.stringArrayEncoding !== StringArrayEncoding.Rc4;

        if (useCacheValue) {
            return <ESTree.Node>this.nodesCache.get(cacheKey);
        }

        const resultNode: ESTree.Node = useStringArray
            ? this.replaceWithStringArrayCallNode(nodeValue)
            : this.replaceWithLiteralNode(nodeValue);

        this.nodesCache.set(cacheKey, resultNode);

        return resultNode;
    }

    /**
     * @param {string} nodeValue
     * @returns {boolean}
     */
    private canUseStringArray (nodeValue: string): boolean {
        return (
            this.options.stringArray &&
            nodeValue.length >= StringLiteralObfuscatingReplacer.minimumLengthForStringArray &&
            this.randomGenerator.getMathRandom() <= this.options.stringArrayThreshold
        );
    }

    /**
     * @param {string} value
     * @param {number} stringArrayStorageLength
     * @returns {IStringArrayIndexData}
     */
    private getStringArrayHexadecimalIndex (value: string, stringArrayStorageLength: number): IStringArrayIndexData {
        if (this.stringLiteralHexadecimalIndexCache.has(value)) {
            return {
                fromCache: true,
                index: <string>this.stringLiteralHexadecimalIndexCache.get(value)
            };
        }

        const hexadecimalRawIndex: string = NumberUtils.toHex(stringArrayStorageLength);
        const hexadecimalIndex: string = `${Utils.hexadecimalPrefix}${hexadecimalRawIndex}`;

        this.stringLiteralHexadecimalIndexCache.set(value, hexadecimalIndex);

        return {
            fromCache: false,
            index: hexadecimalIndex
        };
    }

    /**
     * @param {string} value
     * @returns {IEncodedValue}
     */
    private getEncodedValue (value: string): IEncodedValue {
        let encodedValue: string;
        let key: string | null = null;

        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding.Rc4:
                key = this.randomGenerator.getRandomGenerator().pickone(this.rc4Keys);
                encodedValue = this.cryptUtils.btoa(this.cryptUtils.rc4(value, key));

                break;

            case StringArrayEncoding.Base64:
                encodedValue = this.cryptUtils.btoa(value);

                break;

            default:
                encodedValue = value;
        }

        return { encodedValue, key };
    }

    /**
     * @param {string} value
     * @returns {Node}
     */
    private replaceWithLiteralNode (value: string): ESTree.Node {
        return NodeFactory.literalNode(
            this.escapeSequenceEncoder.encode(value, this.options.unicodeEscapeSequence)
        );
    }

    /**
     * @param {string} value
     * @returns {Node}
     */
    private replaceWithStringArrayCallNode (value: string): ESTree.Node {
        const { encodedValue, key }: IEncodedValue = this.getEncodedValue(value);
        const escapedValue: string = this.escapeSequenceEncoder.encode(encodedValue, this.options.unicodeEscapeSequence);

        const stringArrayStorageLength: number = this.stringArrayStorage.getLength();
        const stringArrayStorageCallsWrapperName: string = this.stringArrayStorage.getStorageId().split('|')[1];

        const { fromCache, index }: IStringArrayIndexData = this.getStringArrayHexadecimalIndex(
            escapedValue,
            stringArrayStorageLength
        );

        if (!fromCache) {
            this.stringArrayStorage.set(stringArrayStorageLength, escapedValue);
        }

        const callExpressionArgs: (ESTree.Expression | ESTree.SpreadElement)[] = [
            StringLiteralObfuscatingReplacer.getHexadecimalLiteralNode(index)
        ];

        if (key) {
            callExpressionArgs.push(StringLiteralObfuscatingReplacer.getRc4KeyLiteralNode(
                this.escapeSequenceEncoder.encode(key, this.options.unicodeEscapeSequence)
            ));
        }

        const stringArrayIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode(stringArrayStorageCallsWrapperName);

        // prevent obfuscation of this identifier
        NodeMetadata.set(stringArrayIdentifierNode, { renamedIdentifier: true });

        return NodeFactory.callExpressionNode(
            stringArrayIdentifierNode,
            callExpressionArgs
        );
    }

    /**
     * @param {string} value
     * @returns {boolean}
     */
    private isReservedString (value: string): boolean {
        if (!this.options.reservedStrings.length) {
            return false;
        }

        return this.options.reservedStrings
            .some((reservedString: string) => {
                return new RegExp(reservedString, 'g').exec(value) !== null;
            });
    }
}
