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
import { IStringArrayScopeCallsWrapperData } from '../../interfaces/node-transformers/string-array-transformers/IStringArrayScopeCallsWrapperData';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';

import { initializable } from '../../decorators/Initializable';

import { AbstractStringArrayCallNode } from './AbstractStringArrayCallNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class StringArrayScopeCallsWrapperFunctionNode extends AbstractStringArrayCallNode {
    /**
     * @type {IStringArrayScopeCallsWrapperData}
     */
    @initializable()
    private upperStringArrayCallsWrapperData!: IStringArrayScopeCallsWrapperData;

    /**
     * @type {IStringArrayScopeCallsWrapperData}
     */
    @initializable()
    private stringArrayScopeCallsWrapperData!: IStringArrayScopeCallsWrapperData;

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
     * @param {IStringArrayScopeCallsWrapperData} stringArrayScopeCallsWrapperData
     * @param {IStringArrayScopeCallsWrapperData} upperStringArrayCallsWrapperData
     */
    public initialize (
        stringArrayScopeCallsWrapperData: IStringArrayScopeCallsWrapperData,
        upperStringArrayCallsWrapperData: IStringArrayScopeCallsWrapperData,
    ): void {
        this.stringArrayScopeCallsWrapperData = stringArrayScopeCallsWrapperData;
        this.upperStringArrayCallsWrapperData = upperStringArrayCallsWrapperData;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        // identifiers of function expression parameters
        // as a temporary names use random strings
        const stringArrayCallIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode(this.randomGenerator.getRandomString(6));
        const decodeKeyIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode(this.randomGenerator.getRandomString(6));

        const stringArrayCallNode: ESTree.Expression = this.getUpperStringArrayCallNode(
            stringArrayCallIdentifierNode,
            this.getStringArrayIndexNode(
                this.stringArrayScopeCallsWrapperData.index
                - this.upperStringArrayCallsWrapperData.index
            )
        );

        // stage 1: function expression node parameters
        // filling all parameters with a fake parameters first
        const parameters: ESTree.Identifier[] = this.arrayUtils.fillWithRange(
            !this.stringArrayScopeCallsWrapperData.parameterIndexesData
                // root string array calls wrapper
                ? AbstractStringArrayCallNode.stringArrayRootCallsWrapperParametersCount
                // scope string array calls wrapper
                : this.options.stringArrayWrappersParametersMaxCount,
            () => this.getFakeParameterNode()
        );
        parameters.splice(
            this.stringArrayScopeCallsWrapperData.parameterIndexesData?.valueIndexParameterIndex ?? 0,
            1,
            stringArrayCallIdentifierNode
        );
        parameters.splice(
            this.stringArrayScopeCallsWrapperData.parameterIndexesData?.decodeKeyParameterIndex ?? 1,
            1,
            decodeKeyIdentifierNode
        );

        // stage 2: upper string array call expression arguments
        // filling all call expression arguments with a fake string array calls
        const callExpressionArgs: ESTree.Expression[] = this.arrayUtils.fillWithRange(
            !this.upperStringArrayCallsWrapperData.parameterIndexesData
                // root string array calls wrapper
                ? AbstractStringArrayCallNode.stringArrayRootCallsWrapperParametersCount
                // scope string array calls wrapper
                : this.options.stringArrayWrappersParametersMaxCount,
            (index: number) => this.getUpperStringArrayCallNode(
                parameters[index],
                this.getFakeUpperStringArrayIndexNode()
            )
        );

        callExpressionArgs.splice(
            this.upperStringArrayCallsWrapperData.parameterIndexesData?.valueIndexParameterIndex ?? 0,
            1,
            stringArrayCallNode
        );
        callExpressionArgs.splice(
            this.upperStringArrayCallsWrapperData.parameterIndexesData?.decodeKeyParameterIndex ?? 1,
            1,
            decodeKeyIdentifierNode
        );

        // stage 3: function declaration node
        const functionDeclarationNode: ESTree.FunctionDeclaration =  NodeFactory.functionDeclarationNode(
            this.stringArrayScopeCallsWrapperData.name,
            parameters,
            NodeFactory.blockStatementNode([
                NodeFactory.returnStatementNode(
                    NodeFactory.callExpressionNode(
                        NodeFactory.identifierNode(this.upperStringArrayCallsWrapperData.name),
                        callExpressionArgs
                    )
                )
            ])
        );

        const structure: TStatement = functionDeclarationNode;

        NodeUtils.parentizeAst(structure);

        // stage 4: rename
        // have to generate names for both parameter and call identifiers
        for (const parameter of parameters) {
            parameter.name = this.identifierNamesGenerator.generateForLexicalScope(functionDeclarationNode);
        }

        return [structure];
    }

    /**
     * @param {Identifier} indexParameterIdentifierNode
     * @param {Expression} indexShiftNode
     * @returns {Expression}
     */
    private getUpperStringArrayCallNode (
        indexParameterIdentifierNode: ESTree.Identifier,
        indexShiftNode: ESTree.Expression
    ): ESTree.Expression {
        return NodeFactory.binaryExpressionNode(
            '-',
            indexParameterIdentifierNode,
            indexShiftNode
        );
    }

    /**
     * @returns {Identifier}
     */
    private getFakeParameterNode (): ESTree.Identifier {
        return NodeFactory.identifierNode(this.randomGenerator.getRandomString(6));
    }

    /**
     * @returns {Expression}
     */
    private getFakeUpperStringArrayIndexNode (): ESTree.Expression {
        return this.getStringArrayIndexNode(this.randomGenerator.getRandomInteger(0, 500));
    }
}
