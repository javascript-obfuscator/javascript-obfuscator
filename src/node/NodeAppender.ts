import * as ESTree from 'estree';

import { TNodeWithStatements } from '../types/node/TNodeWithStatements';
import { TStatement } from '../types/node/TStatement';

import { ICallsGraphData } from '../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';

import { NodeGuards } from './NodeGuards';

export class NodeAppender {
    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {TStatement[]} statements
     */
    public static append (nodeWithStatements: TNodeWithStatements, statements: TStatement[]): void {
        statements = NodeAppender.parentizeScopeStatementsBeforeAppend(nodeWithStatements, statements);

        NodeAppender.setScopeStatements(nodeWithStatements, [
            ...NodeAppender.getScopeStatements(nodeWithStatements),
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
     * @param {ICallsGraphData[]} callsGraphData
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {TStatement[]} bodyStatements
     * @param {number} index
     */
    public static appendToOptimalBlockScope (
        callsGraphData: ICallsGraphData[],
        nodeWithStatements: TNodeWithStatements,
        bodyStatements: TStatement[],
        index: number = 0
    ): void {
        const targetBlockScope: TNodeWithStatements = callsGraphData.length
            ? NodeAppender.getOptimalBlockScope(callsGraphData, index)
            : nodeWithStatements;

        NodeAppender.prepend(targetBlockScope, bodyStatements);
    }

    /**
     * Returns deepest block scope node at given deep.
     *
     * @param {ICallsGraphData[]} callsGraphData
     * @param {number} index
     * @param {number} deep
     * @returns {BlockStatement}
     */
    public static getOptimalBlockScope (
        callsGraphData: ICallsGraphData[],
        index: number,
        deep: number = Infinity
    ): ESTree.BlockStatement {
        const firstCall: ICallsGraphData = callsGraphData[index];

        if (deep <= 0) {
            throw new Error('Invalid `deep` argument value. Value should be bigger then 0.');
        }

        if (deep > 1 && firstCall.callsGraph.length) {
            return NodeAppender.getOptimalBlockScope(firstCall.callsGraph, 0, --deep);
        } else {
            return firstCall.callee;
        }
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {TStatement[]} statements
     * @param {Node} target
     */
    public static insertBefore (
        nodeWithStatements: TNodeWithStatements,
        statements: TStatement[],
        target: ESTree.Statement
    ): void {
        const indexInScopeStatement: number = NodeAppender
            .getScopeStatements(nodeWithStatements)
            .indexOf(target);

        NodeAppender.insertAtIndex(nodeWithStatements, statements, indexInScopeStatement);
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {TStatement[]} statements
     * @param {Node} target
     */
    public static insertAfter (
        nodeWithStatements: TNodeWithStatements,
        statements: TStatement[],
        target: ESTree.Statement
    ): void {
        const indexInScopeStatement: number = NodeAppender
            .getScopeStatements(nodeWithStatements)
            .indexOf(target);

        NodeAppender.insertAtIndex(nodeWithStatements, statements, indexInScopeStatement + 1);
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {TStatement[]} statements
     * @param {number} index
     */
    public static insertAtIndex (
        nodeWithStatements: TNodeWithStatements,
        statements: TStatement[],
        index: number
    ): void {
        statements = NodeAppender.parentizeScopeStatementsBeforeAppend(nodeWithStatements, statements);

        NodeAppender.setScopeStatements(nodeWithStatements, [
            ...NodeAppender.getScopeStatements(nodeWithStatements).slice(0, index),
            ...statements,
            ...NodeAppender.getScopeStatements(nodeWithStatements).slice(index)
        ]);
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {TStatement[]} statements
     */
    public static prepend (nodeWithStatements: TNodeWithStatements, statements: TStatement[]): void {
        statements = NodeAppender.parentizeScopeStatementsBeforeAppend(nodeWithStatements, statements);

        NodeAppender.setScopeStatements(nodeWithStatements, [
            ...statements,
            ...NodeAppender.getScopeStatements(nodeWithStatements),
        ]);
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @returns {TStatement[]}
     */
    private static getScopeStatements (nodeWithStatements: TNodeWithStatements): TStatement[] {
        if (NodeGuards.isSwitchCaseNode(nodeWithStatements)) {
            return nodeWithStatements.consequent;
        }

        return nodeWithStatements.body;
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {TStatement[]} statements
     * @returns {TStatement[]}
     */
    private static parentizeScopeStatementsBeforeAppend (
        nodeWithStatements: TNodeWithStatements,
        statements: TStatement[]
    ): TStatement[] {
        statements.forEach((statement: TStatement) => {
            statement.parentNode = nodeWithStatements;
        });

        return statements;
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {TStatement[]} statements
     */
    private static setScopeStatements (nodeWithStatements: TNodeWithStatements, statements: TStatement[]): void {
        if (NodeGuards.isSwitchCaseNode(nodeWithStatements)) {
            nodeWithStatements.consequent = <ESTree.Statement[]>statements;

            return;
        }

        nodeWithStatements.body = statements;
    }
}
