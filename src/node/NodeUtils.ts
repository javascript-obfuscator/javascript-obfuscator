import * as escodegen from 'escodegen-wallaby';
import * as esprima from 'esprima';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../types/node/TNodeWithBlockStatement';
import { TObject } from '../types/TObject';
import { TStatement } from '../types/node/TStatement';

import { NodeType } from '../enums/node/NodeType';

import { NodeGuards } from './NodeGuards';

export class NodeUtils {
    /**
     * @type {string[]}
     */
    private static readonly nodesWithBlockScope: string[] = [
        NodeType.ArrowFunctionExpression,
        NodeType.FunctionDeclaration,
        NodeType.FunctionExpression,
        NodeType.MethodDefinition,
        NodeType.Program
    ];

    /**
     * @param {T} astTree
     * @returns {T}
     */
    public static addXVerbatimPropertyToLiterals <T extends ESTree.Node = ESTree.Node> (astTree: T): T {
        estraverse.replace(astTree, {
            leave: (node: ESTree.Node) => {
                if (NodeGuards.isLiteralNode(node)) {
                    node['x-verbatim-property'] = {
                        content: node.raw,
                        precedence: escodegen.Precedence.Primary
                    };
                }
            }
        });

        return astTree;
    }

    /**
     * @param {T} astTree
     * @returns {T}
     */
    public static clone <T extends ESTree.Node = ESTree.Node> (astTree: T): T {
        /**
         * @param {T} node
         * @returns {T}
         */
        const cloneRecursive: (node: T) => T = (node: T) => {
            if (node === null) {
                return node;
            }

            const copy: TObject = {};

            Object
                .keys(node)
                .forEach((property: string): void => {
                    if (property === 'parentNode') {
                        return;
                    }

                    const value: any = (<TObject>node)[property];

                    let clonedValue: any | null;

                    if (value === null || value instanceof RegExp) {
                        clonedValue = value;
                    } else if (Array.isArray(value)) {
                        clonedValue = value.map(cloneRecursive);
                    } else if (typeof value === 'object') {
                        clonedValue = cloneRecursive(value);
                    } else {
                        clonedValue = value;
                    }

                    copy[property] = clonedValue;
                });

            return <T>copy;
        };

        return NodeUtils.parentize(cloneRecursive(astTree));
    }

    /**
     * @param {string} code
     * @returns {TStatement[]}
     */
    public static convertCodeToStructure (code: string): TStatement[] {
        let structure: ESTree.Program = esprima.parseScript(code);

        structure = NodeUtils.addXVerbatimPropertyToLiterals(structure);
        structure = NodeUtils.parentize(structure);

        return structure.body;
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
     * @param {NodeGuards} node
     * @param {number} index
     * @returns {NodeGuards}
     */
    public static getBlockStatementNodeByIndex (node: ESTree.Node, index: number = 0): ESTree.Node {
        if (!NodeGuards.isNodeHasBlockStatement(node)) {
            throw new TypeError('The specified node have no a block-statement');
        }

        if (node.body[index] === undefined) {
            throw new ReferenceError(`Wrong index \`${index}\`. Block-statement body length is \`${node.body.length}\``);
        }

        return node.body[index];
    }

    /**
     * @param {NodeGuards} node
     * @param {TNodeWithBlockStatement[]} blockScopes
     * @returns {TNodeWithBlockStatement[]}
     */
    public static getBlockScopesOfNode (node: ESTree.Node, blockScopes: TNodeWithBlockStatement[] = []): TNodeWithBlockStatement[] {
        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (NodeGuards.isBlockStatementNode(parentNode)) {
            if (!parentNode.parentNode) {
                throw new ReferenceError('`parentNode` property of `parentNode` of given node is `undefined`');
            }

            if (NodeUtils.nodesWithBlockScope.includes(parentNode.parentNode.type)) {
                blockScopes.push(parentNode);
            }
        }

        if (node !== parentNode) {
            return NodeUtils.getBlockScopesOfNode(parentNode, blockScopes);
        }

        if (NodeGuards.isNodeHasBlockStatement(parentNode)) {
            blockScopes.push(parentNode);
        }

        return blockScopes;
    }

    /**
     * @param {NodeGuards} node
     * @param {number} depth
     * @returns {number}
     */
    public static getNodeBlockScopeDepth (node: ESTree.Node, depth: number = 0): number {
        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (NodeGuards.isProgramNode(parentNode)) {
            return depth;
        }

        if (NodeGuards.isBlockStatementNode(node) && NodeUtils.nodesWithBlockScope.includes(parentNode.type)) {
            return NodeUtils.getNodeBlockScopeDepth(parentNode, ++depth);
        }

        return NodeUtils.getNodeBlockScopeDepth(parentNode, depth);
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
        estraverse.traverse(astTree, {
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
        node.obfuscatedNode = false;

        return node;
    }
}
