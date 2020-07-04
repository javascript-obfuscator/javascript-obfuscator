import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IIfStatementSimplifyData } from '../../interfaces/node-transformers/minification-transformers/IIfStatementSimplifyData';
import { IIfStatementIteratedStatementsData } from '../../interfaces/node-transformers/minification-transformers/IIfStatementIteratedStatementsData';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeUtils } from '../../node/NodeUtils';

/**
 * Simplifies `IfStatement` node
 */
@injectable()
export class IfStatementSimplifyTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeTransformer[]}
     */
    public readonly runAfter: NodeTransformer[] = [
        NodeTransformer.VariableDeclarationsMergeTransformer
    ];

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
        const consequentSimplifyData: IIfStatementSimplifyData | null = this.getIfStatementSimplifyData(ifStatementNode.consequent);

        // Variant #1: no valid consequent expression data
        if (!consequentSimplifyData) {
            return ifStatementNode;
        }

        let transformedNode: ESTree.Node;

        if (!ifStatementNode.alternate) {
            // Variant #2: valid data for consequent expression only
            transformedNode = this.getConsequentNode(ifStatementNode, consequentSimplifyData);
        } else {
            const alternateSimplifyData: IIfStatementSimplifyData | null = this.getIfStatementSimplifyData(ifStatementNode.alternate);

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
     * @param {IIfStatementSimplifyData} consequentSimplifyData
     * @returns {ESTree.Node}
     */
    private getConsequentNode (
        ifStatementNode: ESTree.IfStatement,
        consequentSimplifyData: IIfStatementSimplifyData
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
                this.getPartialIfStatementBranchNode(consequentSimplifyData)
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
     * @param {IIfStatementSimplifyData} consequentSimplifyData
     * @param {IIfStatementSimplifyData} alternateSimplifyData
     * @returns {ESTree.Node}
     */
    private getConsequentAndAlternateNode (
        ifStatementNode: ESTree.IfStatement,
        consequentSimplifyData: IIfStatementSimplifyData,
        alternateSimplifyData: IIfStatementSimplifyData
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
                this.getPartialIfStatementBranchNode(consequentSimplifyData),
                this.getPartialIfStatementBranchNode(alternateSimplifyData)
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
     * Returns IIfStatementSimplifyData based on `IfStatement` node body
     *
     * @param {ESTree.Statement | null | undefined} statementNode
     * @returns {IIfStatementSimplifyData | null}
     */
    private getIfStatementSimplifyData (
        statementNode: ESTree.Statement | null | undefined
    ): IIfStatementSimplifyData | null {
        if (!statementNode) {
            return null;
        }

        if (!NodeGuards.isBlockStatementNode(statementNode)) {
            return {
                leadingStatements: [statementNode],
                trailingStatement: null,
                hasReturnStatement: false,
                hasSingleExpression: false
            };
        }

        const {
            startIndex,
            unwrappedExpressions,
            hasReturnStatement
        } = this.collectIteratedStatementsData(statementNode);

        const leadingStatements: ESTree.Statement[] = this.getLeadingStatements(statementNode, startIndex);

        if (!unwrappedExpressions.length) {
            return {
                leadingStatements,
                trailingStatement: null,
                hasReturnStatement,
                hasSingleExpression: false
            };
        }

        const hasSingleExpression: boolean = unwrappedExpressions.length === 1;

        const expression: ESTree.Expression = hasSingleExpression
            ? unwrappedExpressions[0]
            : NodeFactory.sequenceExpressionNode(unwrappedExpressions);

        const statement: ESTree.Statement = hasReturnStatement
            ? NodeFactory.returnStatementNode(expression)
            : NodeFactory.expressionStatementNode(expression);

        return {
            leadingStatements,
            trailingStatement: {
                statement,
                expression
            },
            hasReturnStatement,
            hasSingleExpression
        };
    }

    /**
     * Iterates over `IfStatement` node body and collects data
     *
     * @param {ESTree.Statement | null | undefined} statementNode
     * @returns {IIfStatementIteratedStatementsData}
     */
    private collectIteratedStatementsData (
        statementNode: ESTree.BlockStatement
    ): IIfStatementIteratedStatementsData {
        const statementNodeBodyLength: number = statementNode.body.length;
        const unwrappedExpressions: ESTree.Expression[] = [];

        let hasReturnStatement: boolean = false;
        let startIndex: number | null = 0;

        for (let i = 0; i < statementNodeBodyLength; i++) {
            const statementBodyStatementNode: ESTree.Statement = statementNode.body[i];

            if (startIndex === null) {
                startIndex = i;
            }

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

            startIndex = null;
            unwrappedExpressions.length = 0;
        }

        return {
            startIndex,
            unwrappedExpressions,
            hasReturnStatement
        };
    }

    /**
     * Returns leading statements for IIfStatementSimplifyData
     *
     * @param {ESTree.BlockStatement} statementNode
     * @param {number | null} startIndex
     * @returns {ESTree.Statement[]}
     */
    private getLeadingStatements (statementNode: ESTree.BlockStatement, startIndex: number | null): ESTree.Statement[] {
        // variant #1: no valid statements inside `IfStatement` are found
        if (startIndex === null) {
            return statementNode.body;
        }

        return startIndex === 0
            // variant #2: all statements inside `IfStatement` branch are valid
            ? []
            // variant #3: only last N statements inside `IfStatement` branch are valid
            : statementNode.body.slice(0, startIndex);
    }

    /**
     * @param {IIfStatementSimplifyData} ifStatementSimplifyData
     * @returns {ESTree.BlockStatement}
     */
    private getPartialIfStatementBranchNode (ifStatementSimplifyData: IIfStatementSimplifyData): ESTree.Statement {
        // variant #1: all statements inside `IfStatement` branch are valid
        if (!ifStatementSimplifyData.leadingStatements.length && ifStatementSimplifyData.trailingStatement) {
            return ifStatementSimplifyData.trailingStatement.statement;
        }

        // variant #2: only last N statements inside `IfStatement` branch are valid
        const blockStatementNode: ESTree.BlockStatement = NodeFactory.blockStatementNode([
            ...ifStatementSimplifyData.leadingStatements.length ? ifStatementSimplifyData.leadingStatements : [],
            ...ifStatementSimplifyData.trailingStatement ? [ifStatementSimplifyData.trailingStatement.statement] : []
        ]);

        return blockStatementNode.body.length === 1
            && !this.isProhibitedSingleStatementForIfStatementBranch(blockStatementNode.body[0])
            ? blockStatementNode.body[0]
            : blockStatementNode;

    }

    /**
     * @param {ESTree.Statement} statement
     * @returns {boolean}
     */
    private isProhibitedSingleStatementForIfStatementBranch (statement: ESTree.Statement): boolean {
        // TODO: write tests
        // function declaration is not allowed outside of block in `strict` mode
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
            || NodeGuards.isIfStatementNode(statement);
    }
}
