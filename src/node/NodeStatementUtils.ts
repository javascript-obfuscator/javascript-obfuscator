import * as ESTree from 'estree';

import { TNodeWithStatements } from '../types/node/TNodeWithStatements';
import { TStatement } from '../types/node/TStatement';

import { NodeGuards } from './NodeGuards';

export class NodeStatementUtils {
    /**
     * @param {Node} node
     * @returns {TNodeWithStatements}
     */
    public static getParentNodeWithStatements (node: ESTree.Node): TNodeWithStatements {
        return NodeStatementUtils.getParentNodesWithStatementsRecursive(node, 1)[0];
    }

    /**
     * @param {Node} node
     * @returns {TNodeWithStatements[]}
     */
    public static getParentNodesWithStatements (node: ESTree.Node): TNodeWithStatements[] {
        return NodeStatementUtils.getParentNodesWithStatementsRecursive(node);
    }

    /**
     * @param {Statement} statement
     * @returns {TStatement | null}
     */
    public static getNextSiblingStatement (statement: ESTree.Statement): TStatement | null {
        return NodeStatementUtils.getSiblingStatementByOffset(statement, 1);
    }

    /**
     * @param {Statement} statement
     * @returns {TStatement | null}
     */
    public static getPreviousSiblingStatement (statement: ESTree.Statement): TStatement | null {
        return NodeStatementUtils.getSiblingStatementByOffset(statement, -1);
    }

    /**
     * @param {Node} node
     * @returns {Statement}
     */
    public static getRootStatementOfNode (node: ESTree.Node): ESTree.Statement {
        if (NodeGuards.isProgramNode(node)) {
            throw new Error('Unable to find root statement for `Program` node');
        }

        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (!NodeGuards.isNodeWithStatements(parentNode)) {
            return NodeStatementUtils.getRootStatementOfNode(parentNode);
        }

        return <ESTree.Statement>node;
    }

    /**
     * @param {NodeGuards} node
     * @returns {TNodeWithStatements}
     */
    public static getScopeOfNode (node: ESTree.Node): TNodeWithStatements {
        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (!NodeGuards.isNodeWithStatements(parentNode)) {
            return NodeStatementUtils.getScopeOfNode(parentNode);
        }

        return parentNode;
    }

    /**
     * @param {Node} node
     * @param {number} maxSize
     * @param {TNodeWithStatements[]} nodesWithStatements
     * @param {number} depth
     * @returns {TNodeWithStatements[]}
     */
    private static getParentNodesWithStatementsRecursive (
        node: ESTree.Node,
        maxSize: number = Infinity,
        nodesWithStatements: TNodeWithStatements[] = [],
        depth: number = 0
    ): TNodeWithStatements[] {
        if (nodesWithStatements.length >= maxSize) {
            return nodesWithStatements;
        }

        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (
            /**
             * we can add program node instantly
             */
            NodeGuards.isProgramNode(node) ||
            (NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode) && depth > 0)
        ) {
            nodesWithStatements.push(node);
        }

        if (node !== parentNode) {
            return NodeStatementUtils.getParentNodesWithStatementsRecursive(parentNode, maxSize, nodesWithStatements, ++depth);
        }

        return nodesWithStatements;
    }

    /**
     * @param {Statement} statement
     * @param {number} offset
     * @returns {TStatement | null}
     */
    private static getSiblingStatementByOffset (statement: ESTree.Statement, offset: number): TStatement | null {
        const scopeNode: TNodeWithStatements = NodeStatementUtils.getScopeOfNode(statement);
        const scopeBody: TStatement[] = !NodeGuards.isSwitchCaseNode(scopeNode)
            ? scopeNode.body
            : scopeNode.consequent;
        const indexInScope: number = scopeBody.indexOf(statement);

        return scopeBody[indexInScope + offset] || null;
    }
}
