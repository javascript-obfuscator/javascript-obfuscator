import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IInitializable } from '../../../../interfaces/IInitializable';
import { IOptions } from '../../../../interfaces/options/IOptions';
import { IStringArrayStorage } from '../../../../interfaces/storages/string-array-storage/IStringArrayStorage';
import { IStringArrayStorageAnalyzer } from '../../../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IStringArrayStorageItemData } from '../../../../interfaces/storages/string-array-storage/IStringArrayStorageItem';

import { StringArrayEncoding } from '../../../../enums/StringArrayEncoding';

import { AbstractObfuscatingReplacer } from '../AbstractObfuscatingReplacer';
import { NodeMetadata } from '../../../../node/NodeMetadata';
import { NodeFactory } from '../../../../node/NodeFactory';
import { NumberUtils } from '../../../../utils/NumberUtils';
import { Utils } from '../../../../utils/Utils';

@injectable()
export class StringLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer implements IInitializable {
    /**
     * @type {Map<string, ESTree.Node>}
     */
    private readonly nodesCache: Map <string, ESTree.Node> = new Map();

    /**
     * @type {IStringArrayStorage}
     */
    private readonly stringArrayStorage: IStringArrayStorage;

    /**
     * @type {IStringArrayStorageAnalyzer}
     */
    private readonly stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer;

    /**
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IStringArrayStorageAnalyzer} stringArrayStorageAnalyzer
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IStringArrayStorageAnalyzer) stringArrayStorageAnalyzer: IStringArrayStorageAnalyzer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayStorageAnalyzer = stringArrayStorageAnalyzer;
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

    @postConstruct()
    public initialize (): void {
        if (this.options.shuffleStringArray) {
            this.stringArrayStorage.shuffleStorage();
        }

        if (this.options.rotateStringArray) {
            this.stringArrayStorage.rotateStorage();
        }
    }

    /**
     * @param {SimpleLiteral} literalNode
     * @returns {Node}
     */
    public replace (literalNode: ESTree.SimpleLiteral): ESTree.Node {
        const literalValue: ESTree.SimpleLiteral['value'] = literalNode.value;

        if (typeof literalValue !== 'string') {
            throw new Error('`StringLiteralObfuscatingReplacer` should accept only literals with `string` value');
        }

        const stringArrayStorageItemData: IStringArrayStorageItemData | undefined = this.stringArrayStorageAnalyzer
            .getItemDataForLiteralNode(literalNode);
        const cacheKey: string = `${literalValue}-${Boolean(stringArrayStorageItemData)}`;
        const useCachedValue: boolean = this.nodesCache.has(cacheKey) && this.options.stringArrayEncoding !== StringArrayEncoding.Rc4;

        if (useCachedValue) {
            return <ESTree.Node>this.nodesCache.get(cacheKey);
        }

        const resultNode: ESTree.Node = stringArrayStorageItemData
            ? this.replaceWithStringArrayCallNode(stringArrayStorageItemData)
            : this.replaceWithLiteralNode(literalValue);

        this.nodesCache.set(cacheKey, resultNode);

        return resultNode;
    }

    /**
     * @param {string} value
     * @returns {Node}
     */
    private replaceWithLiteralNode (value: string): ESTree.Node {
        return NodeFactory.literalNode(value);
    }

    /**
     * @param {IStringArrayStorageItemData} stringArrayStorageItemData
     * @returns {Node}
     */
    private replaceWithStringArrayCallNode (stringArrayStorageItemData: IStringArrayStorageItemData): ESTree.Node {
        const { index, decodeKey } = stringArrayStorageItemData;

        const hexadecimalIndex: string = `${Utils.hexadecimalPrefix}${NumberUtils.toHex(index)}`;
        const callExpressionArgs: (ESTree.Expression | ESTree.SpreadElement)[] = [
            StringLiteralObfuscatingReplacer.getHexadecimalLiteralNode(hexadecimalIndex)
        ];

        if (decodeKey) {
            callExpressionArgs.push(StringLiteralObfuscatingReplacer.getRc4KeyLiteralNode(decodeKey));
        }

        const stringArrayIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode(
            this.stringArrayStorage.getStorageCallsWrapperName()
        );

        return NodeFactory.callExpressionNode(
            stringArrayIdentifierNode,
            callExpressionArgs
        );
    }
}
