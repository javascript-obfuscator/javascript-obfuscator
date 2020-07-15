import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStatementSimplifyData } from '../../interfaces/node-transformers/simplifying-transformers/IStatementSimplifyData';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractStatementSimplifyTransformer } from './AbstractStatementSimplifyTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

/**
 * Simplifies `IfStatement` node
 */
@injectable()
export class IfStatementSimplifyTransformer extends AbstractStatementSimplifyTransformer {
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
            case NodeTransformationStage.Simplifying:
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
        const consequentSimplifyData: IStatementSimplifyData | null = this.getStatementSimplifyData(ifStatementNode.consequent);

        // Variant #1: no valid consequent expression data
        if (!consequentSimplifyData) {
            return ifStatementNode;
        }

        let transformedNode: ESTree.Node;

        if (!ifStatementNode.alternate) {
            // Variant #2: valid data for consequent expression only
            transformedNode = this.getConsequentNode(ifStatementNode, consequentSimplifyData);
        } else {
            const alternateSimplifyData: IStatementSimplifyData | null = this.getStatementSimplifyData(ifStatementNode.alternate);

            if (!alternateSimplifyData) {
                return ifStatementNode;
            }

            // Variant #3: valid data for consequent and alternate expressions
            transformedNode = this.getConsequentAndAlternateNode(ifStatementNode, consequentSimplifyData, alternateSimplifyData);
        }

        return NodeUtils.parentizeNode(transformedNode, parentNode);
    }

    /**
     * @param {ESTree.IfStatement} ifStatementNode
     * @param {IStatementSimplifyData} consequentSimplifyData
     * @returns {ESTree.Node}
     */
    protected getConsequentNode (
        ifStatementNode: ESTree.IfStatement,
        consequentSimplifyData: IStatementSimplifyData
    ): ESTree.Node {
        /**
         * Converts:
         * if (true) {
         *     const foo = 1;
         *     console.log(1);
         *     return 1;
         * }
         *
         * to:
         * if (true) {
         *     const foo = 1;
         *     return console.log(1), 1;
         * }
         */
        if (
            consequentSimplifyData.leadingStatements.length
            || !consequentSimplifyData.trailingStatement
        ) {
            return NodeFactory.ifStatementNode(
                ifStatementNode.test,
                this.getPartialStatement(consequentSimplifyData)
            );
        }

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
        if (consequentSimplifyData.hasReturnStatement) {
            return NodeFactory.ifStatementNode(
                ifStatementNode.test,
                consequentSimplifyData.trailingStatement.statement
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
                consequentSimplifyData.trailingStatement.expression
            )
        );
    }

    /**
     * @param {ESTree.IfStatement} ifStatementNode
     * @param {IStatementSimplifyData} consequentSimplifyData
     * @param {IStatementSimplifyData} alternateSimplifyData
     * @returns {ESTree.Node}
     */
    protected getConsequentAndAlternateNode (
        ifStatementNode: ESTree.IfStatement,
        consequentSimplifyData: IStatementSimplifyData,
        alternateSimplifyData: IStatementSimplifyData
    ): ESTree.Node {
        /**
         * Converts:
         * if (true) {
         *     const foo = 1;
         *     console.log(1);
         *     return 1;
         * }
         *
         * to:
         * if (true) {
         *     const foo = 1;
         *     return console.log(1), 1;
         * }
         */
        if (
            consequentSimplifyData.leadingStatements.length
            || alternateSimplifyData.leadingStatements.length
            || !consequentSimplifyData.trailingStatement
            || !alternateSimplifyData.trailingStatement
        ) {
            return NodeFactory.ifStatementNode(
                ifStatementNode.test,
                this.getPartialStatement(consequentSimplifyData),
                this.getPartialStatement(alternateSimplifyData)
            );
        }

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
        if (consequentSimplifyData.hasReturnStatement && alternateSimplifyData.hasReturnStatement) {
            return NodeFactory.returnStatementNode(
                NodeFactory.conditionalExpressionNode(
                    ifStatementNode.test,
                    consequentSimplifyData.trailingStatement.expression,
                    alternateSimplifyData.trailingStatement.expression
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
        if (consequentSimplifyData.hasReturnStatement || alternateSimplifyData.hasReturnStatement) {
            return NodeFactory.ifStatementNode(
                ifStatementNode.test,
                consequentSimplifyData.trailingStatement.statement,
                alternateSimplifyData.trailingStatement.statement
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
                consequentSimplifyData.trailingStatement.expression,
                alternateSimplifyData.trailingStatement.expression
            )
        );
    }

    /**
     * @param {IStatementSimplifyData} statementSimplifyData
     * @returns {ESTree.Statement}
     */
    protected getPartialStatement (statementSimplifyData: IStatementSimplifyData): ESTree.Statement {
        const partialStatement: ESTree.Statement = super.getPartialStatement(statementSimplifyData);

        if (!NodeGuards.isBlockStatementNode(partialStatement)) {
            return partialStatement;
        }

        return partialStatement.body.length === 1
        && !this.isProhibitedSingleStatementForIfStatementBranch(partialStatement.body[0])
            ? partialStatement.body[0]
            : partialStatement;

    }

    /**
     * @param {ESTree.Statement} statement
     * @returns {boolean}
     */
    protected isProhibitedSingleStatementForIfStatementBranch (statement: ESTree.Statement): boolean {
        /**
         * Function declaration is not allowed outside of block in `strict` mode
         */
        return NodeGuards.isFunctionDeclarationNode(statement)
            /**
             * Without ignore it can break following code:
             * Input:
             * if (condition1) {
             *     if (condition2) {
             *         var foo = bar();
             *     }
             * } else {
             *     var baz = bark();
             * }
             *
             * Invalid output:
             * if (condition1)
             *     if (condition2)
             *         var foo = bar();
             *     else
             *         var baz = bark();
             */
            || NodeGuards.isIfStatementNode(statement)

            /**
             * `let` and `const` variable declarations are not allowed outside of `IfStatement` block statement
             * Input:
             * if (condition1) {
             *     const foo = 1;
             * }
             *
             * Invalid output with runtime error:
             * if (condition1)
             *     const foo = 1;
             */
            || (NodeGuards.isVariableDeclarationNode(statement) && statement.kind !== 'var');
    }
}
