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
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';

import { initializable } from '../../decorators/Initializable';

import { AbstractStringArrayCallNode } from './AbstractStringArrayCallNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';
import { IStringArrayScopeCallsWrapperData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';

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
     * @type {IStringArrayScopeCallsWrapperData}
     */
    @initializable()
    private stringArrayCallsWrapperData!: IStringArrayScopeCallsWrapperData;

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
     * @param {number} index
     * @param {number} indexShiftAmount
     * @param {IStringArrayScopeCallsWrapperData} stringArrayCallsWrapperData
     * @param {string | null} decodeKey
     */
    public initialize (
        index: number,
        indexShiftAmount: number,
        stringArrayCallsWrapperData: IStringArrayScopeCallsWrapperData,
        decodeKey: string | null
    ): void {
        this.index = index;
        this.indexShiftAmount = indexShiftAmount;
        this.stringArrayCallsWrapperData = stringArrayCallsWrapperData;
        this.decodeKey = decodeKey;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        const resultIndex: number = this.indexShiftAmount + this.stringArrayCallsWrapperData.index + this.index;

        const indexNode: ESTree.Expression = this.getStringArrayIndexNode(resultIndex);
        const rc4KeyLiteralNode: ESTree.Literal | null = this.decodeKey
            ? this.getRc4KeyLiteralNode(this.decodeKey)
            : null;

        // filling call expression arguments with a fake arguments first
        const callExpressionArgs: ESTree.Expression[] = this.arrayUtils.fillWithRange(
            !this.stringArrayCallsWrapperData.parameterIndexesData
                // root string array calls wrapper
                ? AbstractStringArrayCallNode.stringArrayRootCallsWrapperParametersCount
                // scope string array calls wrapper
                : this.options.stringArrayWrappersParametersMaxCount,
            () => this.getFakeStringArrayIndexNode(resultIndex)
        );

        callExpressionArgs.splice(
            this.stringArrayCallsWrapperData.parameterIndexesData?.valueIndexParameterIndex ?? 0,
            1,
            indexNode
        );

        if (this.stringArrayCallsWrapperData.parameterIndexesData) {
            callExpressionArgs.splice(
                this.stringArrayCallsWrapperData.parameterIndexesData.decodeKeyParameterIndex,
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
                NodeFactory.identifierNode(this.stringArrayCallsWrapperData.name),
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
