import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IIteratedStatementsSimplifyData } from '../../interfaces/node-transformers/simplifying-transformers/IIteratedStatementsSimplifyData';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStatementSimplifyData } from '../../interfaces/node-transformers/simplifying-transformers/IStatementSimplifyData';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeFactory } from '../../node/NodeFactory';

/**
 * Simplifies `Statement` node
 */
@injectable()
export abstract class AbstractStatementSimplifyTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeTransformer[]}
     */
    public readonly runAfter: NodeTransformer[] = [
        NodeTransformer.ExpressionStatementsMergeTransformer,
        NodeTransformer.VariableDeclarationsMergeTransformer
    ];

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    protected constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * Returns IStatementSimplifyData based on `Statement` node
     *
     * @param {ESTree.Statement | null | undefined} statementNode
     * @returns {IStatementSimplifyData | null}
     */
    protected getStatementSimplifyData (
        statementNode: ESTree.Statement | null | undefined
    ): IStatementSimplifyData | null {
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
        } = this.collectIteratedStatementsSimplifyData(statementNode);

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
     * Iterates over `BlockStatement` node body and collects data
     *
     * @param {ESTree.Statement | null | undefined} statementNode
     * @returns {IIteratedStatementsSimplifyData}
     */
    protected collectIteratedStatementsSimplifyData (
        statementNode: ESTree.BlockStatement
    ): IIteratedStatementsSimplifyData {
        const statementNodeBodyLength: number = statementNode.body.length;
        const unwrappedExpressions: ESTree.Expression[] = [];

        let hasReturnStatement: boolean = false;
        let startIndex: number | null = null;

        for (let i = statementNodeBodyLength - 1; i >= 0; i--) {
            const statementBodyStatementNode: ESTree.Statement = statementNode.body[i];

            if (NodeGuards.isExpressionStatementNode(statementBodyStatementNode)) {
                if (NodeGuards.isSequenceExpressionNode(statementBodyStatementNode.expression)) {
                    unwrappedExpressions.unshift(...statementBodyStatementNode.expression.expressions);
                } else {
                    unwrappedExpressions.unshift(statementBodyStatementNode.expression);
                }

                startIndex = i;
                continue;
            }

            if (
                NodeGuards.isReturnStatementNode(statementBodyStatementNode)
                && statementBodyStatementNode.argument
            ) {
                unwrappedExpressions.unshift(statementBodyStatementNode.argument);
                hasReturnStatement = true;
                startIndex = i;
                continue;
            }

            break;
        }

        return {
            startIndex,
            unwrappedExpressions,
            hasReturnStatement
        };
    }

    /**
     * Returns leading statements
     *
     * @param {ESTree.BlockStatement} statementNode
     * @param {number | null} startIndex
     * @returns {ESTree.Statement[]}
     */
    protected getLeadingStatements (statementNode: ESTree.BlockStatement, startIndex: number | null): ESTree.Statement[] {
        // variant #1: no valid statements inside `BlockStatement` are found
        if (startIndex === null) {
            return statementNode.body;
        }

        return startIndex === 0
            // variant #2: all statements inside `BlockStatement` branch are valid
            ? []
            // variant #3: only last N statements inside `BlockStatement` branch are valid
            : statementNode.body.slice(0, startIndex);
    }

    /**
     * @param {IStatementSimplifyData} statementSimplifyData
     * @returns {ESTree.Statement}
     */
    protected getPartialStatement (statementSimplifyData: IStatementSimplifyData): ESTree.Statement {
        // variant #1: all statements inside `BlockStatement` branch are valid
        if (!statementSimplifyData.leadingStatements.length && statementSimplifyData.trailingStatement) {
            return statementSimplifyData.trailingStatement.statement;
        }

        // variant #2: only last N statements inside `BlockStatement` branch are valid
        return NodeFactory.blockStatementNode([
            ...statementSimplifyData.leadingStatements.length ? statementSimplifyData.leadingStatements : [],
            ...statementSimplifyData.trailingStatement ? [statementSimplifyData.trailingStatement.statement] : []
        ]);
    }

    /**
     * @param {ESTree.Statement} statementNode
     * @param {ESTree.Node} parentNode
     * @returns {ESTree.Node}
     */
    public abstract transformNode (
        statementNode: ESTree.Statement,
        parentNode: ESTree.Node
    ): ESTree.Node;
}
