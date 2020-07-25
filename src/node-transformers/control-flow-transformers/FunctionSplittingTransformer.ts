import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';

import { IFunctionSplittingBranchStatementData } from '../../interfaces/node-transformers/control-flow-transformers/IFunctionSplittingBranchStatementData';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeAnalyzer } from '../../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeUtils } from '../../node/NodeUtils';

/**
 * Extracts some function statements into another function
 */
@injectable()
export class FunctionSplittingTransformer extends AbstractNodeTransformer {
    /**
     * @type {IScopeAnalyzer}
     */
    private readonly scopeAnalyzer: IScopeAnalyzer;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IScopeAnalyzer} scopeAnalyzer
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IScopeAnalyzer) scopeAnalyzer: IScopeAnalyzer
    ) {
        super(randomGenerator, options);

        this.scopeAnalyzer = scopeAnalyzer;
    }


    /**
     * @param {Node} node
     * @returns {boolean}
     */
    private static isProhibitedStatementNode (node: ESTree.Node): boolean {
        const isVariableDeclarationWithVarKind: boolean = NodeGuards.isVariableDeclarationNode(node)
            && node.kind === 'var';
        const isFunctionDeclarationNode: boolean = NodeGuards.isFunctionDeclarationNode(node);
        const isAssignmentExpressionNode: boolean = NodeGuards.isAssignmentExpressionNode(node);
        const isThisExpressionNode: boolean = NodeGuards.isThisExpressionNode(node);
        const isSuperNode: boolean = NodeGuards.isSuperNode(node);
        const isBreakOrContinueStatement: boolean = NodeGuards.isBreakStatementNode(node)
            || NodeGuards.isContinueStatementNode(node);
        const isAwaitExpressionNode: boolean = NodeGuards.isAwaitExpressionNode(node);

        return isVariableDeclarationWithVarKind
            || isFunctionDeclarationNode
            || isAssignmentExpressionNode
            || isThisExpressionNode
            || isSuperNode
            || isBreakOrContinueStatement
            || isAwaitExpressionNode;
    }

    /**
     * @param {ESTree.BlockStatement} blockStatementNode
     * @returns {IFunctionSplittingBranchStatementData}
     */
    private static getBranchStatementData (blockStatementNode: ESTree.BlockStatement): IFunctionSplittingBranchStatementData {
        const branchStatementData: IFunctionSplittingBranchStatementData = {
            hasReturnStatement: false,
            isProhibitedBranchStatement: false
        };

        estraverse.traverse(blockStatementNode, {
            enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                if (FunctionSplittingTransformer.isProhibitedStatementNode(node)) {
                    branchStatementData.isProhibitedBranchStatement = true;

                    return estraverse.VisitorOption.Break;
                }

                if (NodeGuards.isReturnStatementNode(node)) {
                    branchStatementData.hasReturnStatement = true;
                }
            }
        });

        return branchStatementData;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isIfStatementNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {ESTree.IfStatement} ifStatementNode
     * @param {ESTree.Node} parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (ifStatementNode: ESTree.IfStatement, parentNode: ESTree.Node): ESTree.Node {
        if (!NodeGuards.isNodeWithStatements(parentNode) || !parentNode.parentNode) {
            return ifStatementNode;
        }

        this.transformIfStatementBranchStatementNode(ifStatementNode.consequent, parentNode);
        this.transformIfStatementBranchStatementNode(ifStatementNode.alternate, parentNode);

        NodeUtils.parentizeAst(parentNode);

        return ifStatementNode;
    }

    /**
     * @param {ESTree.Statement | null | undefined} ifStatementBranchStatementNode
     * @param {TNodeWithStatements} parentNode
     */
    private transformIfStatementBranchStatementNode (
        ifStatementBranchStatementNode: ESTree.Statement | null | undefined,
        parentNode: TNodeWithStatements
    ): void {
        if (!ifStatementBranchStatementNode || !NodeGuards.isBlockStatementNode(ifStatementBranchStatementNode)) {
            return;
        }

        const branchStatementData: IFunctionSplittingBranchStatementData = FunctionSplittingTransformer.getBranchStatementData(ifStatementBranchStatementNode);

        if (branchStatementData.isProhibitedBranchStatement) {
            return;
        }

        const wrappedIfStatementBranchStatementNode: ESTree.Program = NodeFactory.programNode([
            ifStatementBranchStatementNode
        ]);

        this.scopeAnalyzer.analyze(wrappedIfStatementBranchStatementNode);

        const scope: eslintScope.Scope = this.scopeAnalyzer.acquireScope(wrappedIfStatementBranchStatementNode);

        const functionExpressionName: string = this.randomGenerator.getRandomString(6);

        const [
            variableDeclarationNode,
            functionExpressionNode
        ] = this.getFunctionExpressionNodeData(
            functionExpressionName,
            this.getFunctionExpressionArguments(scope)
        );

        NodeAppender.prepend(parentNode, [variableDeclarationNode]);
        this.moveStatementsToFunctionExpression(
            ifStatementBranchStatementNode,
            functionExpressionNode,
            functionExpressionName,
            this.getFunctionExpressionArguments(scope),
            branchStatementData
        );
    }

    /**
     * @param {string} functionExpressionName
     * @param {ESTree.Identifier[]} functionExpressionArguments
     * @returns {[ESTree.VariableDeclaration, ESTree.FunctionExpression]}
     */
    private getFunctionExpressionNodeData (
        functionExpressionName: string,
        functionExpressionArguments: ESTree.Identifier[]
    ): [ESTree.VariableDeclaration, ESTree.FunctionExpression] {
        const functionExpressionNode: ESTree.FunctionExpression = NodeFactory.functionExpressionNode(
            functionExpressionArguments,
            NodeFactory.blockStatementNode([])
        );
        const variableDeclarationNode: ESTree.VariableDeclaration = NodeFactory.variableDeclarationNode([
            NodeFactory.variableDeclaratorNode(
                NodeFactory.identifierNode(functionExpressionName),
                functionExpressionNode
            )
        ]);

        return [variableDeclarationNode, functionExpressionNode];
    }

    /**
     * @param {eslintScope.Scope} scope
     * @returns {ESTree.Identifier[]}
     */
    private getFunctionExpressionArguments (scope: eslintScope.Scope): ESTree.Identifier[] {
        return scope
            .through
            .reduce(
                (functionExpressionArguments: ESTree.Identifier[], through: eslintScope.Reference) => {
                    const isExistingArgument: boolean = !!functionExpressionArguments
                        .find((identifierNode: ESTree.Identifier) => identifierNode.name === through.identifier.name);

                    if (isExistingArgument) {
                        return functionExpressionArguments;
                    }

                    return [
                        ...functionExpressionArguments,
                        NodeUtils.clone(through.identifier)
                    ];
                },
                []
            );
    }

    /**
     * @param {ESTree.BlockStatement} ifStatementBranchStatementNode
     * @param {ESTree.FunctionExpression} functionExpressionNode
     * @param {string} functionExpressionName
     * @param {ESTree.Identifier[]} functionExpressionArguments
     * @param {IFunctionSplittingBranchStatementData} branchStatementData
     */
    private moveStatementsToFunctionExpression (
        ifStatementBranchStatementNode: ESTree.BlockStatement,
        functionExpressionNode: ESTree.FunctionExpression,
        functionExpressionName: string,
        functionExpressionArguments: ESTree.Identifier[],
        branchStatementData: IFunctionSplittingBranchStatementData
    ): void {
        functionExpressionNode.body.body.push(...ifStatementBranchStatementNode.body);

        const callExpressionNode: ESTree.CallExpression = NodeFactory.callExpressionNode(
            NodeFactory.identifierNode(functionExpressionName),
            functionExpressionArguments
        );
        const rootStatementNode: ESTree.ExpressionStatement | ESTree.ReturnStatement = branchStatementData.hasReturnStatement
            ? NodeFactory.returnStatementNode(callExpressionNode)
            : NodeFactory.expressionStatementNode(callExpressionNode);

        ifStatementBranchStatementNode.body = [rootStatementNode];
    }
}
