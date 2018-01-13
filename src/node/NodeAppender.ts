import * as ESTree from 'estree';

import { TNodeWithBlockScope } from '../types/node/TNodeWithBlockScope';
import { TStatement } from '../types/node/TStatement';

import { IStackTraceData } from '../interfaces/analyzers/stack-trace-analyzer/IStackTraceData';
import { TNodeWithScope } from '../types/node/TNodeWithScope';
import { NodeGuards } from './NodeGuards';

export class NodeAppender {
    /**
     * @param {TNodeWithScope} scopeNode
     * @param {TStatement[]} scopeStatements
     */
    public static appendNode (scopeNode: TNodeWithScope, scopeStatements: TStatement[]): void {
        if (!NodeAppender.validateScopeStatements(scopeStatements)) {
            scopeStatements = [];
        }

        scopeStatements = NodeAppender.parentizeScopeStatementsBeforeAppend(scopeNode, scopeStatements);

        NodeAppender.setScopeNodeStatements(scopeNode, [
            ...NodeAppender.getScopeNodeStatements(scopeNode),
            ...scopeStatements
        ]);
    }

    /**
     * Appends node into a first deepest BlockStatement in order of function calls
     *
     * For example:
     *
     * function Foo () {
     *     var baz = function () {
     *
     *     }
     *
     *     baz();
     * }
     *
     * foo();
     *
     * Appends node into block statement of `baz` function expression
     *
     * @param {IStackTraceData[]} blockScopeStackTraceData
     * @param {TNodeWithBlockScope} blockScopeNode
     * @param {TStatement[]} nodeBodyStatements
     * @param {number} index
     */
    public static appendNodeToOptimalBlockScope (
        blockScopeStackTraceData: IStackTraceData[],
        blockScopeNode: TNodeWithBlockScope,
        nodeBodyStatements: TStatement[],
        index: number = 0
    ): void {
        let targetBlockScope: TNodeWithBlockScope;

        if (!blockScopeStackTraceData.length) {
            targetBlockScope = blockScopeNode;
        } else {
            targetBlockScope = NodeAppender.getOptimalBlockScope(
                blockScopeStackTraceData,
                index
            );
        }

        NodeAppender.prependNode(targetBlockScope, nodeBodyStatements);
    }

    /**
     * Returns deepest block scope node at given deep.
     *
     * @param {IStackTraceData[]} blockScopeTraceData
     * @param {number} index
     * @param {number} deep
     * @returns {BlockStatement}
     */
    public static getOptimalBlockScope (
        blockScopeTraceData: IStackTraceData[],
        index: number,
        deep: number = Infinity
    ): ESTree.BlockStatement {
        const firstCall: IStackTraceData = blockScopeTraceData[index];

        if (deep <= 0) {
            throw new Error(`Invalid \`deep\` argument value. Value should be bigger then 0.`);
        }

        if (deep > 1 && firstCall.stackTrace.length) {
            return NodeAppender.getOptimalBlockScope(firstCall.stackTrace, 0, --deep);
        } else {
            return firstCall.callee;
        }
    }

    /**
     * @param {TNodeWithScope} scopeNode
     * @param {TStatement[]} scopeStatements
     * @param {Node} targetStatement
     */
    public static insertNodeAfter (scopeNode: TNodeWithScope, scopeStatements: TStatement[], targetStatement: ESTree.Statement): void {
        const indexInScopeStatement: number = NodeAppender
            .getScopeNodeStatements(scopeNode)
            .indexOf(targetStatement);

        NodeAppender.insertNodeAtIndex(scopeNode, scopeStatements, indexInScopeStatement + 1);
    }

    /**
     * @param {TNodeWithScope} scopeNode
     * @param {TStatement[]} scopeStatements
     * @param {number} index
     */
    public static insertNodeAtIndex (scopeNode: TNodeWithScope, scopeStatements: TStatement[], index: number): void {
        if (!NodeAppender.validateScopeStatements(scopeStatements)) {
            scopeStatements = [];
        }

        scopeStatements = NodeAppender.parentizeScopeStatementsBeforeAppend(scopeNode, scopeStatements);

        NodeAppender.setScopeNodeStatements(scopeNode, [
            ...NodeAppender.getScopeNodeStatements(scopeNode).slice(0, index),
            ...scopeStatements,
            ...NodeAppender.getScopeNodeStatements(scopeNode).slice(index)
        ]);
    }

    /**
     * @param {TNodeWithScope} scopeNode
     * @param {TStatement[]} scopeStatements
     */
    public static prependNode (scopeNode: TNodeWithScope, scopeStatements: TStatement[]): void {
        if (!NodeAppender.validateScopeStatements(scopeStatements)) {
            scopeStatements = [];
        }

        scopeStatements = NodeAppender.parentizeScopeStatementsBeforeAppend(scopeNode, scopeStatements);

        NodeAppender.setScopeNodeStatements(scopeNode, [
            ...scopeStatements,
            ...NodeAppender.getScopeNodeStatements(scopeNode),
        ]);
    }

    /**
     * @param {TNodeWithScope} scopeNode
     * @returns {TStatement[]}
     */
    private static getScopeNodeStatements (scopeNode: TNodeWithScope): TStatement[] {
        if (NodeGuards.isSwitchCaseNode(scopeNode)) {
            return scopeNode.consequent;
        }

        return scopeNode.body;
    }

    /**
     * @param {TNodeWithScope} scopeNode
     * @param {TStatement[]} scopeStatements
     * @returns {TStatement[]}
     */
    private static parentizeScopeStatementsBeforeAppend (scopeNode: TNodeWithScope, scopeStatements: TStatement[]): TStatement[] {
        scopeStatements.forEach((statement: TStatement) => {
            statement.parentNode = scopeNode;
        });

        return scopeStatements;
    }

    /**
     * @param {TNodeWithScope} scopeNode
     * @param {TStatement[]} statements
     */
    private static setScopeNodeStatements (scopeNode: TNodeWithScope, statements: TStatement[]): void {
        if (NodeGuards.isSwitchCaseNode(scopeNode)) {
            scopeNode.consequent = <ESTree.Statement[]>statements;

            return;
        }

        scopeNode.body = statements;
    }

    /**
     * @param {TStatement[]} scopeStatement
     * @returns {boolean}
     */
    private static validateScopeStatements (scopeStatement: TStatement[]): boolean {
        return scopeStatement.every((statementNode: TStatement) => {
            return !!statementNode && statementNode.hasOwnProperty('type');
        });
    }
}
