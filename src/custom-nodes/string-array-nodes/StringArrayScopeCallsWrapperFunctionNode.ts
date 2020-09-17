import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { ICustomCodeHelperFormatter } from '../../interfaces/custom-code-helpers/ICustomCodeHelperFormatter';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { AbstractStringArrayCallNode } from './AbstractStringArrayCallNode';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class StringArrayScopeCallsWrapperFunctionNode extends AbstractStringArrayCallNode {
    /**
     * @type {number}
     */
    @initializable()
    private shiftedIndex!: number;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayCallsWrapperName!: string;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayScopeCallsWrapperName!: string;


    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomCodeHelperFormatter} customCodeHelperFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomCodeHelperFormatter) customCodeHelperFormatter: ICustomCodeHelperFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            identifierNamesGeneratorFactory,
            customCodeHelperFormatter,
            randomGenerator,
            options
        );
    }

    /**
     * @param {string} stringArrayScopeCallsWrapperName
     * @param {string} stringArrayCallsWrapperName
     * @param {number} shiftedIndex
     */
    public initialize (
        stringArrayScopeCallsWrapperName: string,
        stringArrayCallsWrapperName: string,
        shiftedIndex: number
    ): void {
        this.stringArrayScopeCallsWrapperName = stringArrayScopeCallsWrapperName;
        this.stringArrayCallsWrapperName = stringArrayCallsWrapperName;
        this.shiftedIndex = shiftedIndex;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        // identifiers of function expression parameters
        // as a temporary names use random strings
        const firstParameterIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode(this.randomGenerator.getRandomString(6));
        const secondParameterIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode(this.randomGenerator.getRandomString(6));

        // identifiers of call to the parent string array scope wrapper
        // as a temporary names use random strings
        const firstCallArgumentIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode(this.randomGenerator.getRandomString(6));
        const secondCallArgumentIdentifierNode: ESTree.Identifier = NodeFactory.identifierNode(this.randomGenerator.getRandomString(6));

        // function expression node
        const functionExpressionNode: ESTree.FunctionExpression =  NodeFactory.functionExpressionNode(
            [
                firstParameterIdentifierNode,
                secondParameterIdentifierNode,
            ],
            NodeFactory.blockStatementNode([
                NodeFactory.returnStatementNode(
                    NodeFactory.callExpressionNode(
                        NodeFactory.identifierNode(this.stringArrayCallsWrapperName),
                        [
                            NodeFactory.binaryExpressionNode(
                                '-',
                                firstCallArgumentIdentifierNode,
                                this.getHexadecimalNode(this.shiftedIndex)
                            ),
                            secondCallArgumentIdentifierNode
                        ]
                    )
                )
            ])
        );

        const structure: TStatement = NodeFactory.variableDeclarationNode(
            [
                NodeFactory.variableDeclaratorNode(
                    NodeFactory.identifierNode(this.stringArrayScopeCallsWrapperName),
                    functionExpressionNode
                )
            ],
            'const',
        );

        NodeUtils.parentizeAst(structure);

        // have to generate names for both parameter and call identifiers
        const firstParameterName: string = this.identifierNamesGenerator.generateForLexicalScope(functionExpressionNode);
        const secondParameterName: string = this.identifierNamesGenerator.generateForLexicalScope(functionExpressionNode);

        firstParameterIdentifierNode.name = firstParameterName;
        secondParameterIdentifierNode.name = secondParameterName;

        firstCallArgumentIdentifierNode.name = firstParameterName;
        secondCallArgumentIdentifierNode.name = secondParameterName;

        return [structure];
    }
}
