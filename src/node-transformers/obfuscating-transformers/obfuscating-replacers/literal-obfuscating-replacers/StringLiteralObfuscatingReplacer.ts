import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { ICustomNodeGroup } from '../../../../interfaces/custom-nodes/ICustomNodeGroup';
import { IEncodedValue } from '../../../../interfaces/node-transformers/obfuscating-transformers/IEncodedValue';
import { IOptions } from '../../../../interfaces/options/IOptions';
import { IStorage } from '../../../../interfaces/storages/IStorage';

import { StringArrayEncoding } from '../../../../enums/StringArrayEncoding';

import { AbstractObfuscatingReplacer } from '../AbstractObfuscatingReplacer';
import { CryptUtils } from '../../../../utils/CryptUtils';
import { Nodes } from '../../../../node/Nodes';
import { RandomGeneratorUtils } from '../../../../utils/RandomGeneratorUtils';
import { Utils } from '../../../../utils/Utils';

@injectable()
export class StringLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer {
    /**
     * @type {number}
     */
    private static readonly minimumLengthForStringArray: number = 3;

    /**
     * @type {IStorage<ICustomNodeGroup>}
     */
    private readonly customNodeGroupStorage: IStorage<ICustomNodeGroup>;

    /**
     * @type {Map<string, ESTree.Node>}
     */
    private readonly nodesCache: Map <string, ESTree.Node> = new Map();

    /**
     * @type {string[]}
     */
    private readonly rc4Keys: string[];

    /**
     * @type {Map<string, string>}
     */
    private readonly stringLiteralHexadecimalIndexCache: Map <string, string> = new Map();

    /**
     * @type {IStorage<string>}
     */
    private readonly stringArrayStorage: IStorage<string>;

    /**
     * @param customNodeGroupStorage
     * @param stringArrayStorage
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.TCustomNodeGroupStorage) customNodeGroupStorage: IStorage<ICustomNodeGroup>,
        @inject(ServiceIdentifiers.TStringArrayStorage) stringArrayStorage: IStorage<string>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeGroupStorage = customNodeGroupStorage;
        this.stringArrayStorage = stringArrayStorage;

        this.rc4Keys = RandomGeneratorUtils.getRandomGenerator()
            .n(() => RandomGeneratorUtils.getRandomGenerator().string({length: 4}), 50);
    }

    /**
     * @param hexadecimalIndex
     * @return {ESTree.Literal}
     */
    private static getHexadecimalLiteralNode (hexadecimalIndex: string): ESTree.Literal {
        const hexadecimalLiteralNode: ESTree.Literal = Nodes.getLiteralNode(hexadecimalIndex);

        hexadecimalLiteralNode.obfuscatedNode = true;

        return hexadecimalLiteralNode;
    }

    /**
     * @param literalValue
     * @return {ESTree.Literal}
     */
    private static getRc4KeyLiteralNode (literalValue: string): ESTree.Literal {
        const rc4KeyLiteralNode: ESTree.Literal = Nodes.getLiteralNode(literalValue);

        rc4KeyLiteralNode.obfuscatedNode = true;

        return rc4KeyLiteralNode;
    }

    /**
     * @param nodeValue
     * @returns {ESTree.Node}
     */
    public replace (nodeValue: string): ESTree.Node {
        const usingStringArray: boolean = this.canUseStringArray(nodeValue);
        const cacheKey: string = `${nodeValue}-${String(usingStringArray)}`;

        if (this.nodesCache.has(cacheKey) && this.options.stringArrayEncoding !== StringArrayEncoding.rc4) {
            return <ESTree.Node>this.nodesCache.get(cacheKey);
        }

        let resultNode: ESTree.Node;

        if (usingStringArray) {
            resultNode = this.replaceWithStringArrayCallNode(nodeValue);
        } else {
            resultNode = Nodes.getLiteralNode(
                `${Utils.stringToUnicodeEscapeSequence(nodeValue, !this.options.unicodeEscapeSequence)}`
            );
        }

        this.nodesCache.set(cacheKey, resultNode);

        return resultNode;
    }

    /**
     * @param nodeValue
     * @return {boolean}
     */
    private canUseStringArray (nodeValue: string): boolean {
        return (
            this.options.stringArray &&
            nodeValue.length >= StringLiteralObfuscatingReplacer.minimumLengthForStringArray &&
            RandomGeneratorUtils.getMathRandom() <= this.options.stringArrayThreshold
        );
    }

    /**
     * @param value
     * @return {string}
     */
    private getArrayHexadecimalIndex (value: string): string {
        if (this.stringLiteralHexadecimalIndexCache.has(value)) {
            return <string>this.stringLiteralHexadecimalIndexCache.get(value);
        }

        const stringArrayStorageLength: number = this.stringArrayStorage.getLength();
        const hexadecimalIndex: string = `${Utils.hexadecimalPrefix}${Utils.decToHex(stringArrayStorageLength)}`;

        this.stringArrayStorage.set(stringArrayStorageLength, value);
        this.stringLiteralHexadecimalIndexCache.set(value, hexadecimalIndex);

        return hexadecimalIndex;
    }

    /**
     * @param value
     * @returns {IEncodedValue}
     */
    private getEncodedValue (value: string): IEncodedValue {
        let encodedValue: string,
            key: string | undefined;

        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding.rc4:
                key = RandomGeneratorUtils.getRandomGenerator().pickone(this.rc4Keys);
                encodedValue = CryptUtils.btoa(CryptUtils.rc4(value, key));

                break;

            case StringArrayEncoding.base64:
                encodedValue = CryptUtils.btoa(value);

                break;

            default:
                encodedValue = value;
        }

        encodedValue = Utils.stringToUnicodeEscapeSequence(encodedValue, !this.options.unicodeEscapeSequence);

        return { encodedValue, key };
    }

    /**
     * @param value
     * @returns {ESTree.Node}
     */
    private replaceWithStringArrayCallNode (value: string): ESTree.Node {
        const { encodedValue, key }: IEncodedValue = this.getEncodedValue(value);
        const rotatedStringArrayStorageId: string = Utils.stringRotate(this.stringArrayStorage.getStorageId(), 1);
        const stringArrayStorageCallsWrapperName: string = `_${Utils.hexadecimalPrefix}${rotatedStringArrayStorageId}`;
        const callExpressionArgs: (ESTree.Expression | ESTree.SpreadElement)[] = [
            StringLiteralObfuscatingReplacer.getHexadecimalLiteralNode(
                this.getArrayHexadecimalIndex(encodedValue)
            )
        ];

        if (key) {
            callExpressionArgs.push(StringLiteralObfuscatingReplacer.getRc4KeyLiteralNode(
                Utils.stringToUnicodeEscapeSequence(key, !this.options.unicodeEscapeSequence)
            ));
        }

        return Nodes.getCallExpressionNode(
            Nodes.getIdentifierNode(stringArrayStorageCallsWrapperName),
            callExpressionArgs
        );
    }
}
