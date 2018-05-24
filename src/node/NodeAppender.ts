import * as ESTree from 'estree';

import { TNodeWithBlockScope } from '../types/node/TNodeWithBlockScope';
import { TStatement } from '../types/node/TStatement';

import { IStackTraceData } from '../interfaces/analyzers/stack-trace-analyzer/IStackTraceData';
import { TNodeWithScope } from '../types/node/TNodeWithScope';
import { NodeGuards } from './NodeGuards';

export class NodeAppender {
    /**
     * @param {TNodeWithScope} scope
     * @param {TStatement[]} statements
     */
    public static append (scope: TNodeWithScope, statements: TStatement[]): void {
        statements = NodeAppender.parentizeScopeStatementsBeforeAppend(scope, statements);

        NodeAppender.setScopeStatements(scope, [
            ...NodeAppender.getScopeStatements(scope),
            ...statements
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
     * @param {IStackTraceData[]} stackTraceData
     * @param {TNodeWithBlockScope} blockScopeNode
     * @param {TStatement[]} bodyStatements
     * @param {number} index
     */
    public static appendToOptimalBlockScope (
        stackTraceData: IStackTraceData[],
        blockScopeNode: TNodeWithBlockScope,
        bodyStatements: TStatement[],
        index: number = 0
    ): void {
        const targetBlockScope: TNodeWithBlockScope = stackTraceData.length
            ? NodeAppender.getOptimalBlockScope(stackTraceData, index)
            : blockScopeNode;

        NodeAppender.prepend(targetBlockScope, bodyStatements);
    }

    /**
     * Returns deepest block scope node at given deep.
     *
     * @param {IStackTraceData[]} stackTraceData
     * @param {number} index
     * @param {number} deep
     * @returns {BlockStatement}
     */
    public static getOptimalBlockScope (
        stackTraceData: IStackTraceData[],
        index: number,
        deep: number = Infinity
    ): ESTree.BlockStatement {
        const firstCall: IStackTraceData = stackTraceData[index];

        if (deep <= 0) {
            throw new Error('Invalid `deep` argument value. Value should be bigger then 0.');
        }

        if (deep > 1 && firstCall.stackTrace.length) {
            return NodeAppender.getOptimalBlockScope(firstCall.stackTrace, 0, --deep);
        } else {
            return firstCall.callee;
        }
    }

    /**
     * @param {TNodeWithScope} scope
     * @param {TStatement[]} statements
     * @param {Node} target
     */
    public static insertAfter (
        scope: TNodeWithScope,
        statements: TStatement[],
        target: ESTree.Statement
    ): void {
        const indexInScopeStatement: number = NodeAppender
            .getScopeStatements(scope)
            .indexOf(target);

        NodeAppender.insertAtIndex(scope, statements, indexInScopeStatement + 1);
    }

    /**
     * @param {TNodeWithScope} scope
     * @param {TStatement[]} statements
     * @param {number} index
     */
    public static insertAtIndex (
        scope: TNodeWithScope,
        statements: TStatement[],
        index: number
    ): void {
        statements = NodeAppender.parentizeScopeStatementsBeforeAppend(scope, statements);

        NodeAppender.setScopeStatements(scope, [
            ...NodeAppender.getScopeStatements(scope).slice(0, index),
            ...statements,
            ...NodeAppender.getScopeStatements(scope).slice(index)
        ]);
    }

    /**
     * @param {TNodeWithScope} scope
     * @param {TStatement[]} statements
     */
    public static prepend (scope: TNodeWithScope, statements: TStatement[]): void {
        statements = NodeAppender.parentizeScopeStatementsBeforeAppend(scope, statements);

        NodeAppender.setScopeStatements(scope, [
            ...statements,
            ...NodeAppender.getScopeStatements(scope),
        ]);
    }

    /**
     * @param {TNodeWithScope} scope
     * @returns {TStatement[]}
     */
    private static getScopeStatements (scope: TNodeWithScope): TStatement[] {
        if (NodeGuards.isSwitchCaseNode(scope)) {
            return scope.consequent;
        }

        return scope.body;
    }

    /**
     * @param {TNodeWithScope} scope
     * @param {TStatement[]} statements
     * @returns {TStatement[]}
     */
    private static parentizeScopeStatementsBeforeAppend (scope: TNodeWithScope, statements: TStatement[]): TStatement[] {
        statements.forEach((statement: TStatement) => {
            statement.parentNode = scope;
        });

        return statements;
    }

    /**
     * @param {TNodeWithScope} scope
     * @param {TStatement[]} statements
     */
    private static setScopeStatements (scope: TNodeWithScope, statements: TStatement[]): void {
        if (NodeGuards.isSwitchCaseNode(scope)) {
            scope.consequent = <ESTree.Statement[]>statements;

            return;
        }

        scope.body = statements;
    }
}
