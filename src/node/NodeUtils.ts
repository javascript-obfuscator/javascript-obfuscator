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
     * @param {T} node
     * @returns {T}
     */
    public static addXVerbatimPropertyToLiteralNode <T extends ESTree.Node = ESTree.Node> (node: T): T {
        if (NodeGuards.isLiteralNode(node)) {
            node['x-verbatim-property'] = {
                content: node.raw,
                precedence: escodegen.Precedence.Primary
            };
        }

        return node;
    }

    /**
     * @param {T} astTree
     * @returns {T}
     */
    public static clone <T extends ESTree.Node = ESTree.Node> (astTree: T): T {
        return NodeUtils.parentize(NodeUtils.cloneRecursive(astTree));
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
                NodeUtils.addXVerbatimPropertyToLiteralNode(node);
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
     * @param {Node} targetNode
     * @returns {TNodeWithBlockScope[]}
     */
    public static getBlockScopesOfNode (targetNode: ESTree.Node): TNodeWithBlockScope[] {
        return NodeUtils.getBlockScopesOfNodeRecursive(targetNode);
    }

    /**
     * @param {Statement} node
     * @returns {TStatement | null}
     */
    public static getNextSiblingStatementNode (node: ESTree.Statement): TStatement | null {
        return NodeUtils.getSiblingStatementNodeByOffset(node, 1);
    }

    /**
     * @param {Statement} node
     * @returns {TStatement | null}
     */
    public static getPreviousSiblingStatementNode (node: ESTree.Statement): TStatement | null {
        return NodeUtils.getSiblingStatementNodeByOffset(node, -1);
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
    public static parentize <T extends ESTree.Node = ESTree.Node> (astTree: T): T {
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

    /**
     * @param {Node} node
     * @param {TNodeWithBlockScope[]} blockScopes
     * @param {number} depth
     * @returns {TNodeWithBlockScope[]}
     */
    private static getBlockScopesOfNodeRecursive (
        node: ESTree.Node,
        blockScopes: TNodeWithBlockScope[] = [],
        depth: number = 0
    ): TNodeWithBlockScope[] {
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
            return NodeUtils.getBlockScopesOfNodeRecursive(parentNode, blockScopes, ++depth);
        }

        return blockScopes;
    }

    /**
     * @param {Statement} node
     * @param {number} offset
     * @returns {TStatement | null}
     */
    private static getSiblingStatementNodeByOffset (node: ESTree.Statement, offset: number): TStatement | null {
        const scopeNode: TNodeWithScope = NodeUtils.getScopeOfNode(node);
        const scopeBody: TStatement[] = !NodeGuards.isSwitchCaseNode(scopeNode)
            ? scopeNode.body
            : scopeNode.consequent;
        const indexInScope: number = scopeBody.indexOf(node);

        return scopeBody[indexInScope + offset] || null;
    }
}
