import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayIndexNodeFactory } from '../../types/container/custom-nodes/string-array-index-nodes/TStringArrayIndexNodeFactory';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayScopeCallsWrapperParameterIndexesData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperParameterIndexesData';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';

import { initializable } from '../../decorators/Initializable';

import { AbstractStringArrayCallNode } from './AbstractStringArrayCallNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class StringArrayCallNode extends AbstractStringArrayCallNode {
    /**
     * @type {string | null}
     */
    @initializable()
    private decodeKey!: string | null;

    /**
     * @type {number}
     */
    @initializable()
    private index!: number;

    /**
     * @type {number}
     */
    @initializable()
    private indexShiftAmount!: number;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayCallsWrapperName!: string;

    /**
     * @type {IStringArrayScopeCallsWrapperParameterIndexesData | null}
     */
    @initializable()
    private stringArrayCallsWrapperParameterIndexesData!: IStringArrayScopeCallsWrapperParameterIndexesData | null;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {TStringArrayIndexNodeFactory} stringArrayIndexNodeFactory
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {IArrayUtils} arrayUtils
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.Factory__IStringArrayIndexNode)
            stringArrayIndexNodeFactory: TStringArrayIndexNodeFactory,
        @inject(ServiceIdentifiers.ICustomCodeHelperFormatter) customCodeHelperFormatter: ICustomCodeHelperFormatter,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            identifierNamesGeneratorFactory,
            stringArrayIndexNodeFactory,
            customCodeHelperFormatter,
            stringArrayStorage,
            arrayUtils,
            randomGenerator,
            options
        );
    }

    /**
     * @param {string} stringArrayCallsWrapperName
     * @param {IStringArrayScopeCallsWrapperParameterIndexesData | null} stringArrayCallsWrapperParameterIndexesData
     * @param {number} index
     * @param {number} indexShiftAmount
     * @param {string | null} decodeKey
     */
    public initialize (
        stringArrayCallsWrapperName: string,
        stringArrayCallsWrapperParameterIndexesData: IStringArrayScopeCallsWrapperParameterIndexesData | null,
        index: number,
        indexShiftAmount: number,
        decodeKey: string | null
    ): void {
        this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
        this.stringArrayCallsWrapperParameterIndexesData = stringArrayCallsWrapperParameterIndexesData;
        this.index = index;
        this.indexShiftAmount = indexShiftAmount;
        this.decodeKey = decodeKey;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const resultIndex: number = this.indexShiftAmount + this.index;

        const indexNode: ESTree.Expression = this.getStringArrayIndexNode(resultIndex);
        const rc4KeyLiteralNode: ESTree.Literal | null = this.decodeKey
            ? this.getRc4KeyLiteralNode(this.decodeKey)
            : null;

        // filling call expression arguments with a fake arguments first
        const callExpressionArgs: ESTree.Expression[] = this.arrayUtils.fillWithRange(
            !this.stringArrayCallsWrapperParameterIndexesData
                // root string array calls wrapper
                ? AbstractStringArrayCallNode.stringArrayRootCallsWrapperParametersCount
                // scope string array calls wrapper
                : this.options.stringArrayWrappersParametersMaxCount,
            () => this.getFakeStringArrayIndexNode(resultIndex)
        );

        callExpressionArgs.splice(
            this.stringArrayCallsWrapperParameterIndexesData?.valueIndexParameterIndex ?? 0,
            1,
            indexNode
        );

        if (this.stringArrayCallsWrapperParameterIndexesData) {
            callExpressionArgs.splice(
                this.stringArrayCallsWrapperParameterIndexesData.decodeKeyParameterIndex,
                1,
                // use rc4 key literal node if exists or a node with fake string array wrapper index
                rc4KeyLiteralNode ?? this.getFakeStringArrayIndexNode(resultIndex)
            );
        } else if (rc4KeyLiteralNode) {
            callExpressionArgs.splice(1, 1, rc4KeyLiteralNode);
        } else {
            // have to delete element
            callExpressionArgs.splice(1, 1);
        }

        const structure: TStatement = NodeFactory.expressionStatementNode(
            NodeFactory.callExpressionNode(
                NodeFactory.identifierNode(this.stringArrayCallsWrapperName),
                callExpressionArgs
            )
        );

        NodeUtils.parentizeAst(structure);

        return [structure];
    }

    /**
     * @param {number} actualIndex
     * @returns {Expression}
     */
    private getFakeStringArrayIndexNode (actualIndex: number): ESTree.Expression {
        return this.getStringArrayIndexNode(this.getFakeStringArrayIndex(actualIndex));
    }

    /**
     * @param {number} actualIndex
     * @returns {number}
     */
    private getFakeStringArrayIndex (actualIndex: number): number {
        const stringArrayStorageLength: number = this.stringArrayStorage.getLength();

        const fakeIndexOffset: number = stringArrayStorageLength / 2;

        const minimumIndex: number = actualIndex - fakeIndexOffset;
        const maximumIndex: number = actualIndex + fakeIndexOffset;

        return this.randomGenerator.getRandomInteger(minimumIndex, maximumIndex);
    }
}
