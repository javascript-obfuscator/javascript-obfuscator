import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IIfStatementSimplifyData } from '../../interfaces/node-transformers/minification-transformers/IIfStatementSimplifyData';
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
        const consequentSimplifyData: IIfStatementSimplifyData | null = this.getIfStatementSimplifyData(ifStatementNode.consequent);

        // Variant #1: no valid consequent expression
        if (!consequentSimplifyData) {
            return ifStatementNode;
        }

        // Variant #2: valid consequent expression only
        if (!ifStatementNode.alternate) {
            return this.getConsequentNode(ifStatementNode, consequentSimplifyData);
        }

        const alternateSimplifyData: IIfStatementSimplifyData | null = this.getIfStatementSimplifyData(ifStatementNode.alternate);

        if (!alternateSimplifyData) {
            return ifStatementNode;
        }

        // Variant #3: valid consequent and alternate expressions
        return this.getConsequentAndAlternateNode(ifStatementNode, consequentSimplifyData, alternateSimplifyData);
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
        if (consequentSimplifyData.leadingStatements.length) {
            return NodeFactory.ifStatementNode(
                ifStatementNode.test,
                NodeFactory.blockStatementNode([
                    ...consequentSimplifyData.leadingStatements,
                    consequentSimplifyData.statement
                ])
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
                consequentSimplifyData.statement
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
                consequentSimplifyData.expression,
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
        if (consequentSimplifyData.leadingStatements.length || alternateSimplifyData.leadingStatements.length) {
            return NodeFactory.ifStatementNode(
                ifStatementNode.test,
                consequentSimplifyData.leadingStatements.length
                    ? NodeFactory.blockStatementNode([
                        ...consequentSimplifyData.leadingStatements,
                        consequentSimplifyData.statement
                    ])
                    : consequentSimplifyData.statement,
                alternateSimplifyData.leadingStatements.length
                    ? NodeFactory.blockStatementNode([
                        ...alternateSimplifyData.leadingStatements,
                        alternateSimplifyData.statement
                    ])
                    : alternateSimplifyData.statement
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
                    consequentSimplifyData.expression,
                    alternateSimplifyData.expression
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
                consequentSimplifyData.statement,
                alternateSimplifyData.statement
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
                consequentSimplifyData.expression,
                alternateSimplifyData.expression
            )
        );
    }

    /**
     * @param {ESTree.Statement | null | undefined} statementNode
     * @returns {IIfStatementSimplifyData | null}
     */
    // eslint-disable-next-line complexity
    private getIfStatementSimplifyData (
        statementNode: ESTree.Statement | null | undefined
    ): IIfStatementSimplifyData | null {
        if (!statementNode || !NodeGuards.isBlockStatementNode(statementNode)) {
            return null;
        }

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

        if (startIndex === null || !unwrappedExpressions.length) {
            return null;
        }

        const hasSingleExpression: boolean = unwrappedExpressions.length === 1;

        const expression: ESTree.Expression = hasSingleExpression
            ? unwrappedExpressions[0]
            : NodeFactory.sequenceExpressionNode(unwrappedExpressions);

        const leadingStatements: ESTree.Statement[] = startIndex > 0
            ? statementNode.body.slice(0, startIndex)
            : [];
        const statement: ESTree.Statement = hasReturnStatement
            ? NodeFactory.returnStatementNode(expression)
            : NodeFactory.expressionStatementNode(expression);

        return {
            leadingStatements,
            statement,
            expression,
            hasReturnStatement,
            hasSingleExpression
        };
    }
}
