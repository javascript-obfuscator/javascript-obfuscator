import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeFactory } from '../../node/NodeFactory';

/**
 * Simplifies `IfStatement` node
 */
@injectable()
export class IfStatementSimplifyTransformer extends AbstractNodeTransformer {
    /**
     * @type {WeakSet<ESTree.Statement>}
     */
    private readonly branchStatementsWithReturnStatementSet: WeakSet<ESTree.Statement> = new Set();

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Minification:
                return {
                    leave: (
                        node: ESTree.Node,
                        parentNode: ESTree.Node | null
                    ): ESTree.Node | undefined => {
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
     * @returns {ESTree.IfStatement}
     */
    public transformNode (
        ifStatementNode: ESTree.IfStatement,
        parentNode: ESTree.Node
    ): ESTree.Node {
        const consequentExpression: ESTree.Expression | null = this.convertBranchStatementToExpression(ifStatementNode.consequent);

        if (!consequentExpression) {
            return ifStatementNode;
        }

        const isConsequentWithReturnStatement: boolean = this.branchStatementsWithReturnStatementSet
            .has(ifStatementNode.consequent);

        if (!ifStatementNode.alternate) {
            if (isConsequentWithReturnStatement) {
                return NodeFactory.ifStatementNode(
                    ifStatementNode.test,
                    NodeFactory.returnStatementNode(consequentExpression)
                );
            }

            return NodeFactory.expressionStatementNode(
                NodeFactory.logicalExpressionNode(
                    '&&',
                    ifStatementNode.test,
                    consequentExpression,
                )
            );
        }

        const alternateExpression: ESTree.Expression | null = this.convertBranchStatementToExpression(ifStatementNode.alternate);

        if (!alternateExpression) {
            return ifStatementNode;
        }

        const isAlternateWithReturnStatement: boolean = this.branchStatementsWithReturnStatementSet
            .has(ifStatementNode.alternate);

        if (isConsequentWithReturnStatement && isAlternateWithReturnStatement) {
            return NodeFactory.returnStatementNode(
                NodeFactory.conditionalExpressionNode(
                    ifStatementNode.test,
                    consequentExpression,
                    alternateExpression
                )
            );
        }

        if (isConsequentWithReturnStatement) {
            return NodeFactory.ifStatementNode(
                ifStatementNode.test,
                NodeFactory.returnStatementNode(consequentExpression),
                NodeFactory.expressionStatementNode(alternateExpression)
            );
        }

        if (isAlternateWithReturnStatement) {
            return NodeFactory.ifStatementNode(
                ifStatementNode.test,
                NodeFactory.expressionStatementNode(consequentExpression),
                NodeFactory.returnStatementNode(alternateExpression)
            );
        }

        return NodeFactory.expressionStatementNode(
            NodeFactory.conditionalExpressionNode(
                ifStatementNode.test,
                consequentExpression,
                alternateExpression
            )
        );
    }

    /**
     * @param {ESTree.Statement} statementNode
     * @returns {ESTree.Expression | null}
     */
    private convertBranchStatementToExpression (
        statementNode: ESTree.Statement
    ): ESTree.Expression | null {
        if (!this.isValidBranchStatementStatementForConvert(statementNode)) {
            return null;
        }

        const unwrappedExpressions: ESTree.Expression[] = statementNode
            .body
            .reduce<ESTree.Expression[]>(
                (acc: ESTree.Expression[], statementBodyStatementNode: ESTree.Statement) => {
                    if (NodeGuards.isExpressionStatementNode(statementBodyStatementNode)) {
                        return [
                            ...acc,
                            statementBodyStatementNode.expression
                        ];
                    }

                    if (
                        NodeGuards.isReturnStatementNode(statementBodyStatementNode)
                        && statementBodyStatementNode.argument
                    ) {
                        return [
                            ...acc,
                            statementBodyStatementNode.argument
                        ];
                    }

                    return acc;
                },
                []
            );

        if (!unwrappedExpressions.length) {
            return null;
        }

        return unwrappedExpressions.length === 1
            ? unwrappedExpressions[0]
            : NodeFactory.sequenceExpressionNode(unwrappedExpressions);
    }

    /**
     * @param {ESTree.Statement} statementNode
     * @returns {statementNode is ESTree.BlockStatement & {body: (ESTree.ExpressionStatement | ESTree.ReturnStatement)[]}}
     */
    private isValidBranchStatementStatementForConvert (
        statementNode: ESTree.Statement
    ): statementNode is ESTree.BlockStatement & {body: (ESTree.ExpressionStatement | ESTree.ReturnStatement)[]} {
        if (!NodeGuards.isBlockStatementNode(statementNode)) {
            return false;
        }

        let isValidStatementNode: boolean = true;

        for (const statement of statementNode.body) {
            if (
                !NodeGuards.isExpressionStatementNode(statement)
                && !NodeGuards.isReturnStatementNode(statement)
            ) {
                isValidStatementNode = false;

                break;
            } else if (NodeGuards.isReturnStatementNode(statement)) {
                this.branchStatementsWithReturnStatementSet.add(statementNode);
            }
        }

        return isValidStatementNode;
    }
}
