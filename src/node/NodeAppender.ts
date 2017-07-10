import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../types/node/TNodeWithBlockStatement';
import { TStatement } from '../types/node/TStatement';

import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

/**
 * This class appends node into a first deepest BlockStatement in order of function calls
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
 * Appends node into block statement of `baz` function expression.
 */
export class NodeAppender {
    /**
     * @param {TNodeWithBlockStatement} blockScopeNode
     * @param {TStatement[]} nodeBodyStatements
     */
    public static appendNode (
        blockScopeNode: TNodeWithBlockStatement,
        nodeBodyStatements: TStatement[]
    ): void {
        if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
            nodeBodyStatements = [];
        }

        nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);

        blockScopeNode.body = [
            ...blockScopeNode.body,
            ...nodeBodyStatements
        ];
    }

    /**
     * @param {IStackTraceData[]} blockScopeStackTraceData
     * @param {TNodeWithBlockStatement} blockScopeNode
     * @param {TStatement[]} nodeBodyStatements
     * @param {number} index
     */
    public static appendNodeToOptimalBlockScope (
        blockScopeStackTraceData: IStackTraceData[],
        blockScopeNode: TNodeWithBlockStatement,
        nodeBodyStatements: TStatement[],
        index: number = 0
    ): void {
        let targetBlockScope: TNodeWithBlockStatement;

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
     * @param {TNodeWithBlockStatement} blockScopeNode
     * @param {TStatement[]} nodeBodyStatements
     * @param {number} index
     */
    public static insertNodeAtIndex (
        blockScopeNode: TNodeWithBlockStatement,
        nodeBodyStatements: TStatement[],
        index: number
    ): void {
        if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
            nodeBodyStatements = [];
        }

        nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);

        blockScopeNode.body = [
            ...blockScopeNode.body.slice(0, index),
            ...nodeBodyStatements,
            ...blockScopeNode.body.slice(index)
        ];
    }

    /**
     * @param {TNodeWithBlockStatement} blockScopeNode
     * @param {TStatement[]} nodeBodyStatements
     */
    public static prependNode (
        blockScopeNode: TNodeWithBlockStatement,
        nodeBodyStatements: TStatement[]
    ): void {
        if (!NodeAppender.validateBodyStatements(nodeBodyStatements)) {
            nodeBodyStatements = [];
        }

        nodeBodyStatements = NodeAppender.parentizeBodyStatementsBeforeAppend(blockScopeNode, nodeBodyStatements);

        blockScopeNode.body = [
            ...nodeBodyStatements,
            ...blockScopeNode.body,
        ];
    }

    /**
     * @param {TNodeWithBlockStatement} blockScopeNode
     * @param {TStatement[]} nodeBodyStatements
     * @returns {TStatement[]}
     */
    private static parentizeBodyStatementsBeforeAppend (
        blockScopeNode: TNodeWithBlockStatement,
        nodeBodyStatements: TStatement[]
    ): TStatement[] {
        nodeBodyStatements.forEach((statement: TStatement) => {
            statement.parentNode = blockScopeNode;
        });

        return nodeBodyStatements;
    }

    /**
     * @param {TStatement[]} nodeBodyStatements
     * @returns {boolean}
     */
    private static validateBodyStatements (nodeBodyStatements: TStatement[]): boolean {
        return nodeBodyStatements.every((statementNode: TStatement) => {
            return !!statementNode && statementNode.hasOwnProperty('type');
        });
    }
}
