import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IIfStatementExpressionData } from '../../interfaces/node-transformers/minification-transformers/IIfStatementExpressionData';
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
        const consequentExpressionData: IIfStatementExpressionData | null = this.getIfStatementExpressionData(ifStatementNode.consequent);

        // Variant #1: no valid consequent expression
        if (!consequentExpressionData) {
            return ifStatementNode;
        }

        // Variant #2: valid consequent expression only
        if (!ifStatementNode.alternate) {
            /**
             * Converts:
             * if (true) {
             *     return 1;
             * }
             *
             * to:
             * if (true)
             *     return 1;
             */
            if (consequentExpressionData.hasReturnStatement) {
                return NodeFactory.ifStatementNode(
                    ifStatementNode.test,
                    NodeFactory.returnStatementNode(consequentExpressionData.expression)
                );
            }

            /**
             * Converts:
             * if (true) {
             *     console.log(1);
             * }
             *
             * to:
             * true && console.log(1);
             */
            return NodeFactory.expressionStatementNode(
                NodeFactory.logicalExpressionNode(
                    '&&',
                    ifStatementNode.test,
                    consequentExpressionData.expression,
                )
            );
        }

        const alternateExpressionData: IIfStatementExpressionData | null = this.getIfStatementExpressionData(ifStatementNode.alternate);

        if (!alternateExpressionData) {
            return ifStatementNode;
        }

        // Variant #3: valid consequent and alternate expressions
        /**
         * Converts:
         * if (true) {
         *     return 1;
         * } else {
         *     return 2;
         * }
         *
         * to:
         * return true ? 1 : 2;
         */
        if (consequentExpressionData.hasReturnStatement && alternateExpressionData.hasReturnStatement) {
            return NodeFactory.returnStatementNode(
                NodeFactory.conditionalExpressionNode(
                    ifStatementNode.test,
                    consequentExpressionData.expression,
                    alternateExpressionData.expression
                )
            );
        }

        /**
         * Converts:
         * if (true) {
         *     return 1;
         * } else {
         *     console.log(2);
         * }
         *
         * to:
         * if (true)
         *     return 1;
         * else
         *     console.log(2);
         */
        if (consequentExpressionData.hasReturnStatement) {
            return NodeFactory.ifStatementNode(
                ifStatementNode.test,
                NodeFactory.returnStatementNode(consequentExpressionData.expression),
                NodeFactory.expressionStatementNode(alternateExpressionData.expression)
            );
        }

        /**
         * Converts:
         * if (true) {
         *     console.log(1);
         * } else {
         *     return 2;
         * }
         *
         * to:
         * if (true)
         *     console.log(1);
         * else
         *     return 2;
         */
        if (alternateExpressionData.hasReturnStatement) {
            return NodeFactory.ifStatementNode(
                ifStatementNode.test,
                NodeFactory.expressionStatementNode(consequentExpressionData.expression),
                NodeFactory.returnStatementNode(alternateExpressionData.expression)
            );
        }

        /**
         * Converts:
         * if (true) {
         *     console.log(1);
         * } else {
         *     console.log(2);
         * }
         *
         * to:
         * true ? console.log(1) : console.log(2);
         */
        return NodeFactory.expressionStatementNode(
            NodeFactory.conditionalExpressionNode(
                ifStatementNode.test,
                consequentExpressionData.expression,
                alternateExpressionData.expression
            )
        );
    }

    /**
     * @param {ESTree.Statement | null | undefined} statementNode
     * @returns {IIfStatementExpressionData | null}
     */
    private getIfStatementExpressionData (
        statementNode: ESTree.Statement | null | undefined
    ): IIfStatementExpressionData | null {
        if (!statementNode || !NodeGuards.isBlockStatementNode(statementNode)) {
            return null;
        }

        const unwrappedExpressions: ESTree.Expression[] = [];
        let hasReturnStatement: boolean = false;

        for (const statementBodyStatementNode of statementNode.body) {
            if (NodeGuards.isExpressionStatementNode(statementBodyStatementNode)) {
                unwrappedExpressions.push(statementBodyStatementNode.expression);
                continue;
            }

            if (
                NodeGuards.isReturnStatementNode(statementBodyStatementNode)
                && statementBodyStatementNode.argument
            ) {
                unwrappedExpressions.push(statementBodyStatementNode.argument);
                hasReturnStatement = true;
                continue;
            }

            return null;
        }

        if (!unwrappedExpressions.length) {
            return null;
        }

        return {
            expression: unwrappedExpressions.length === 1
                ? unwrappedExpressions[0]
                : NodeFactory.sequenceExpressionNode(unwrappedExpressions),
            hasReturnStatement
        };
    }
}
