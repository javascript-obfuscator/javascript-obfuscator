import * as escodegen from 'escodegen-wallaby';
import * as esprima from 'esprima';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../types/node/TNodeWithBlockStatement';
import { TStatement } from '../types/node/TStatement';

import { NodeType } from '../enums/NodeType';

import { Node } from './Node';

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
    public static addXVerbatimPropertyToLiterals <T extends ESTree.Node> (astTree: T): T {
        NodeUtils.typedReplace(astTree, NodeType.Literal, {
            leave: (literalNode: ESTree.Literal) => {
                literalNode['x-verbatim-property'] = {
                    content : literalNode.raw,
                    precedence: escodegen.Precedence.Primary
                };
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

            const copy: {[key: string]: any} = {};

            Object
                .keys(node)
                .filter((property: string) => property !== 'parentNode')
                .forEach((property: string): void => {
                    const value: any = (<{[key: string]: any}>node)[property];

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
     * @param {Node[]} structure
     * @returns {string}
     */
    public static convertStructureToCode (structure: ESTree.Node[]): string {
        let code: string = '';

        structure.forEach((node: ESTree.Node) => {
            code += escodegen.generate(node, {
                sourceMapWithCode: true
            }).code;
        });

        return code;
    }

    /**
     * @param {Node} node
     * @param {number} index
     * @returns {Node}
     */
    public static getBlockStatementNodeByIndex (node: ESTree.Node, index: number = 0): ESTree.Node {
        if (Node.isNodeHasBlockStatement(node)) {
            if (node.body[index] === undefined) {
                throw new ReferenceError(`Wrong index \`${index}\`. Block-statement body length is \`${node.body.length}\``);
            }

            return node.body[index];
        }

        throw new TypeError('The specified node have no a block-statement');
    }

    /**
     * @param {Node} node
     * @param {TNodeWithBlockStatement[]} blockScopes
     * @returns {TNodeWithBlockStatement[]}
     */
    public static getBlockScopesOfNode (node: ESTree.Node, blockScopes: TNodeWithBlockStatement[] = []): TNodeWithBlockStatement[] {
        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (Node.isBlockStatementNode(parentNode)) {
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

        if (Node.isNodeHasBlockStatement(parentNode)) {
            blockScopes.push(parentNode);
        }

        return blockScopes;
    }

    /**
     * @param {Node} node
     * @param {number} depth
     * @returns {number}
     */
    public static getNodeBlockScopeDepth (node: ESTree.Node, depth: number = 0): number {
        const parentNode: ESTree.Node | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (Node.isProgramNode(parentNode)) {
            return depth;
        }

        if (Node.isBlockStatementNode(node) && NodeUtils.nodesWithBlockScope.includes(parentNode.type)) {
            return NodeUtils.getNodeBlockScopeDepth(parentNode, ++depth);
        }

        return NodeUtils.getNodeBlockScopeDepth(parentNode, depth);
    }

    /**
     * @param {UnaryExpression} unaryExpressionNode
     * @returns {Node}
     */
    public static getUnaryExpressionArgumentNode (unaryExpressionNode: ESTree.UnaryExpression): ESTree.Node {
        if (Node.isUnaryExpressionNode(unaryExpressionNode.argument)) {
            return NodeUtils.getUnaryExpressionArgumentNode(unaryExpressionNode.argument);
        }

        return unaryExpressionNode.argument;
    }

    /**
     * @param {T} astTree
     * @returns {T}
     */
    public static parentize <T extends ESTree.Node = ESTree.Program> (astTree: T): T {
        estraverse.traverse(astTree, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                node.parentNode = parentNode || node;
                node.obfuscatedNode = false;
            }
        });

        return astTree;
    }

    /**
     * @param {Node} astTree
     * @param {string} nodeType
     * @param {visitor} visitor
     */
    public static typedReplace (
        astTree: ESTree.Node,
        nodeType: string,
        visitor: {enter?: (node: ESTree.Node) => void, leave?: (node: ESTree.Node) => void},
    ): void {
        NodeUtils.typedTraverse(astTree, nodeType, visitor, 'replace');
    }

    /**
     * @param {Node} astTree
     * @param {string} nodeType
     * @param {Visitor} visitor
     * @param {string} traverseType
     */
    public static typedTraverse (
        astTree: ESTree.Node,
        nodeType: string,
        visitor: estraverse.Visitor,
        traverseType: string = 'traverse'
    ): void {
        (<any>estraverse)[traverseType](astTree, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (node.type === nodeType && visitor.enter) {
                    return visitor.enter(node, parentNode);
                }
            },
            leave: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (node.type === nodeType && visitor.leave) {
                    return visitor.leave(node, parentNode);
                }
            }
        });
    }
}
