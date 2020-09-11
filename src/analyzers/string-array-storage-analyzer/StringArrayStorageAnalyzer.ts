import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageAnalyzer } from '../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';

import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeLiteralUtils } from '../../node/NodeLiteralUtils';

/**
 * Adds values of literal nodes to the string array storage
 */
@injectable()
export class StringArrayStorageAnalyzer implements IStringArrayStorageAnalyzer {
    /**
     * @type {number}
     */
    private static readonly minimumLengthForStringArray: number = 3;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {randomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @type {IStringArrayStorage}
     */
    private readonly stringArrayStorage: IStringArrayStorage;

    /**
     * @type {Map<ESTree.Literal, IStringArrayStorageItemData>}
     */
    private readonly stringArrayStorageData: Map<ESTree.Literal, IStringArrayStorageItemData> = new Map();

    /**
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
    ) {
        this.stringArrayStorage = stringArrayStorage;
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {Program} astTree
     */
    public analyze (astTree: ESTree.Program): void {
        if (!this.options.stringArray) {
            return;
        }

        estraverse.traverse(astTree, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): estraverse.VisitorOption | void => {
                if (!parentNode) {
                    return;
                }

                if (NodeMetadata.isIgnoredNode(node)) {
                    return estraverse.VisitorOption.Skip;
                }

                if (!NodeGuards.isLiteralNode(node)) {
                    return;
                }

                this.analyzeLiteralNode(node, parentNode);
            }
        });
    }

    /**
     * @param {Literal} literalNode
     * @returns {IStringArrayStorageItemData | undefined}
     */
    public getItemDataForLiteralNode (literalNode: ESTree.Literal): IStringArrayStorageItemData | undefined {
        return this.stringArrayStorageData.get(literalNode);
    }

    /**
     * @param {Literal} literalNode
     * @param {Node} parentNode
     */
    private analyzeLiteralNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): void {
        if (typeof literalNode.value !== 'string') {
            return;
        }

        if (NodeLiteralUtils.isProhibitedLiteralNode(literalNode, parentNode)) {
            return;
        }

        if (!this.shouldAddValueToStringArray(literalNode.value)) {
            return;
        }

        this.stringArrayStorageData.set(
            literalNode,
            this.stringArrayStorage.getOrThrow(literalNode.value)
        );
    }

    /**
     * @param {string} value
     * @returns {boolean}
     */
    private shouldAddValueToStringArray (value: string): boolean {
        return value.length >= StringArrayStorageAnalyzer.minimumLengthForStringArray
            && this.randomGenerator.getMathRandom() <= this.options.stringArrayThreshold;
    }
}
