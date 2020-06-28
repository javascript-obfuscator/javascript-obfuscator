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
     * @type {WeakSet<ESTree.BlockStatement>}
     */
    private readonly ifStatementBlockStatementsWithReturnStatementSet: WeakSet<ESTree.BlockStatement> = new Set();

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
    // eslint-disable-next-line complexity
    public transformNode (
        ifStatementNode: ESTree.IfStatement,
        parentNode: ESTree.Node
    ): ESTree.Node {
        if (this.isValidIfStatementBlockStatementForConvert(ifStatementNode.consequent)) {
            const consequentExpression: ESTree.Expression | null = this.toExpression(ifStatementNode.consequent.body);

            if (!consequentExpression) {
                return ifStatementNode;
            }

            if (ifStatementNode.alternate) {
                if (this.isValidIfStatementBlockStatementForConvert(ifStatementNode.alternate)) {
                    const alternateExpression: ESTree.Expression | null = this.toExpression(ifStatementNode.alternate.body);

                    if (!alternateExpression) {
                        return ifStatementNode;
                    }

                    if (
                        this.ifStatementBlockStatementsWithReturnStatementSet.has(ifStatementNode.consequent)
                        && this.ifStatementBlockStatementsWithReturnStatementSet.has(ifStatementNode.alternate)
                    ) {
                        return NodeFactory.returnStatementNode(
                            NodeFactory.conditionalExpressionNode(
                                ifStatementNode.test,
                                consequentExpression,
                                alternateExpression
                            )
                        );
                    }

                    if (this.ifStatementBlockStatementsWithReturnStatementSet.has(ifStatementNode.consequent)) {
                        return NodeFactory.ifStatementNode(
                            ifStatementNode.test,
                            NodeFactory.returnStatementNode(consequentExpression),
                            NodeFactory.expressionStatementNode(alternateExpression)
                        );
                    }

                    if (this.ifStatementBlockStatementsWithReturnStatementSet.has(ifStatementNode.alternate)) {
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
                } else {
                    return ifStatementNode;
                }
            }

            return this.ifStatementBlockStatementsWithReturnStatementSet.has(ifStatementNode.consequent)
                ? NodeFactory.ifStatementNode(
                    ifStatementNode.test,
                    NodeFactory.returnStatementNode(consequentExpression)
                )
                : NodeFactory.expressionStatementNode(
                    NodeFactory.logicalExpressionNode(
                        '&&',
                        ifStatementNode.test,
                        consequentExpression,
                    )
                );

        }

        return ifStatementNode;
    }

    /**
     * @param {ESTree.Statement} statementNode
     * @returns {statementNode is ESTree.BlockStatement & {body: (ESTree.ExpressionStatement | ESTree.ReturnStatement)[]}}
     * @private
     */
    private isValidIfStatementBlockStatementForConvert (
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
                this.ifStatementBlockStatementsWithReturnStatementSet.add(statementNode);
            }
        }

        return isValidStatementNode;
    }

    /**
     * @param {(ESTree.ExpressionStatement | ESTree.ReturnStatement)[]} statementNodes
     * @returns {ESTree.Expression | null}
     */
    private toExpression (
        statementNodes: (ESTree.ExpressionStatement | ESTree.ReturnStatement)[]
    ): ESTree.Expression | null {
        const unwrappedExpressions: ESTree.Expression[] = statementNodes
            .map((statementNode: ESTree.ExpressionStatement | ESTree.ReturnStatement) => {
                if (NodeGuards.isExpressionStatementNode(statementNode)) {
                    return statementNode.expression;
                }

                if (NodeGuards.isReturnStatementNode(statementNode)) {
                    return statementNode.argument;
                }

                return statementNode;
            })
            .filter((expressionNode: ESTree.Expression | null | undefined): expressionNode is ESTree.Expression =>
                !!expressionNode
            );

        if (!unwrappedExpressions.length) {
            return null;
        }

        return unwrappedExpressions.length === 1
            ? unwrappedExpressions[0]
            : NodeFactory.sequenceExpressionNode(unwrappedExpressions);
    }
}
