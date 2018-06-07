import * as escodegen from 'escodegen-wallaby';
import * as espree from 'espree';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockScope } from '../types/node/TNodeWithBlockScope';
import { TNodeWithScope } from '../types/node/TNodeWithScope';
import { TObject } from '../types/TObject';
import { TStatement } from '../types/node/TStatement';

import { NodeGuards } from './NodeGuards';
import { NodeMetadata } from './NodeMetadata';

export class NodeUtils {
    /**
     * @param {T} literalNode
     * @returns {T}
     */
    public static addXVerbatimPropertyTo (literalNode: ESTree.Literal): ESTree.Literal {
        literalNode['x-verbatim-property'] = {
            content: literalNode.raw,
            precedence: escodegen.Precedence.Primary
        };

        return literalNode;
    }

    /**
     * @param {T} astTree
     * @returns {T}
     */
    public static clone <T extends ESTree.Node = ESTree.Node> (astTree: T): T {
        return NodeUtils.parentizeAst(NodeUtils.cloneRecursive(astTree));
    }

    /**
     * @param {string} code
     * @returns {Statement[]}
     */
    public static convertCodeToStructure (code: string): ESTree.Statement[] {
        const structure: ESTree.Program = espree.parse(code, { sourceType: 'script' });

        estraverse.replace(structure, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node => {
                NodeUtils.parentizeNode(node, parentNode);

                if (NodeGuards.isLiteralNode(node)) {
                    NodeUtils.addXVerbatimPropertyTo(node);
                }

                NodeMetadata.set(node, { ignoredNode: false });

                return node;
            }
        });

        return <ESTree.Statement[]>structure.body;
    }

    /**
     * @param {NodeGuards[]} structure
     * @returns {string}
     */
    public static convertStructureToCode (structure: ESTree.Node[]): string {
        return structure.reduce((code: string, node: ESTree.Node) => {
            return code + escodegen.generate(node, {
                sourceMapWithCode: true
            }).code;
        }, '');
    }

    /**
     * @param {Node} node
     * @returns {TNodeWithBlockScope}
     */
    public static getBlockScopeOfNode (node: ESTree.Node): TNodeWithBlockScope {
        return NodeUtils.getBlockScopesOfNodeRecursive(node, 1)[0];
    }

    /**
     * @param {Node} node
     * @returns {TNodeWithBlockScope[]}
     */
    public static getBlockScopesOfNode (node: ESTree.Node): TNodeWithBlockScope[] {
        return NodeUtils.getBlockScopesOfNodeRecursive(node);
    }

    /**
     * @param {Statement} statement
     * @returns {TStatement | null}
     */
    public static getNextSiblingStatement (statement: ESTree.Statement): TStatement | null {
        return NodeUtils.getSiblingStatementByOffset(statement, 1);
    }

    /**
     * @param {Statement} statement
     * @returns {TStatement | null}
     */
    public static getPreviousSiblingStatement (statement: ESTree.Statement): TStatement | null {
        return NodeUtils.getSiblingStatementByOffset(statement, -1);
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

        if (!NodeGuards.isNodeHasScope(parentNode)) {
            return NodeUtils.getRootStatementOfNode(parentNode);
        }

        return <ESTree.Statement>node;
    }

    /**
     * @param {NodeGuards} node
     * @returns {TNodeWithScope}
     */
    public static getScopeOfNode (node: ESTree.Node): TNodeWithScope {
        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (!NodeGuards.isNodeHasScope(parentNode)) {
            return NodeUtils.getScopeOfNode(parentNode);
        }

        return parentNode;
    }

    /**
     * @param {UnaryExpression} unaryExpressionNode
     * @returns {NodeGuards}
     */
    public static getUnaryExpressionArgumentNode (unaryExpressionNode: ESTree.UnaryExpression): ESTree.Node {
        if (NodeGuards.isUnaryExpressionNode(unaryExpressionNode.argument)) {
            return NodeUtils.getUnaryExpressionArgumentNode(unaryExpressionNode.argument);
        }

        return unaryExpressionNode.argument;
    }

    /**
     * @param {T} astTree
     * @returns {T}
     */
    public static parentizeAst <T extends ESTree.Node = ESTree.Node> (astTree: T): T {
        estraverse.replace(astTree, {
            enter: NodeUtils.parentizeNode
        });

        return astTree;
    }

    /**
     * @param {T} node
     * @param {Node} parentNode
     * @returns {T}
     */
    public static parentizeNode <T extends ESTree.Node = ESTree.Node> (node: T, parentNode: ESTree.Node | null): T {
        node.parentNode = parentNode || node;

        return node;
    }

    /**
     * @param {T} node
     * @returns {T}
     */
    private static cloneRecursive <T> (node: T): T {
        if (node === null) {
            return node;
        }

        const copy: TObject = {};

        Object
            .keys(node)
            .forEach((property: string) => {
                if (property === 'parentNode') {
                    return;
                }

                const value: T[keyof T] = node[<keyof T>property];

                let clonedValue: T[keyof T] | T[keyof T][] | null;

                if (value === null || value instanceof RegExp) {
                    clonedValue = value;
                } else if (Array.isArray(value)) {
                    clonedValue = value.map(NodeUtils.cloneRecursive);
                } else if (typeof value === 'object') {
                    clonedValue = NodeUtils.cloneRecursive(value);
                } else {
                    clonedValue = value;
                }

                copy[property] = clonedValue;
            });

        return <T>copy;
    }

    /***
     * @param {Node} node
     * @param {number} maxSize
     * @param {TNodeWithBlockScope[]} blockScopes
     * @param {number} depth
     * @returns {TNodeWithBlockScope[]}
     */
    private static getBlockScopesOfNodeRecursive (
        node: ESTree.Node,
        maxSize: number = Infinity,
        blockScopes: TNodeWithBlockScope[] = [],
        depth: number = 0
    ): TNodeWithBlockScope[] {
        if (blockScopes.length >= maxSize) {
            return blockScopes;
        }

        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        /**
         * Stage 1: process root block statement node of the slice of AST-tree
         */
        if (NodeGuards.isBlockStatementNode(node) && parentNode === node) {
            blockScopes.push(node);
        }

        /**
         * Stage 2: process any other nodes
         */
        if (
            /**
             * we can add program node instantly
             */
            NodeGuards.isProgramNode(node) ||
            /**
             * we shouldn't add to the array input node that is node with block scope itself
             * so, on depth 0 we will skip push to the array of block scopes
             */
            (depth && NodeGuards.isNodeHasBlockScope(node, parentNode))
        ) {
            blockScopes.push(node);
        }

        if (node !== parentNode) {
            return NodeUtils.getBlockScopesOfNodeRecursive(parentNode, maxSize, blockScopes, ++depth);
        }

        return blockScopes;
    }

    /**
     * @param {Statement} statement
     * @param {number} offset
     * @returns {TStatement | null}
     */
    private static getSiblingStatementByOffset (statement: ESTree.Statement, offset: number): TStatement | null {
        const scopeNode: TNodeWithScope = NodeUtils.getScopeOfNode(statement);
        const scopeBody: TStatement[] = !NodeGuards.isSwitchCaseNode(scopeNode)
            ? scopeNode.body
            : scopeNode.consequent;
        const indexInScope: number = scopeBody.indexOf(statement);

        return scopeBody[indexInScope + offset] || null;
    }
}
