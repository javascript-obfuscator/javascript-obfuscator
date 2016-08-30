import * as escodegen from 'escodegen';
import * as esprima from 'esprima';
import * as estraverse from 'estraverse';

import { ILiteralNode } from "./interfaces/nodes/ILiteralNode";
import { INode } from './interfaces/nodes/INode';

import { TNodeWithBlockStatement } from "./types/TNodeWithBlockStatement";
import { TStatement } from "./types/nodes/TStatement";

import { NodeType } from "./enums/NodeType";

import { Nodes } from "./Nodes";
import { Utils } from "./Utils";

export class NodeUtils {
    /**
     * @type {string[]}
     */
    private static nodesWithBlockScope: string[] = [
        NodeType.ArrowFunctionExpression,
        NodeType.FunctionDeclaration,
        NodeType.FunctionExpression,
        NodeType.MethodDefinition,
        NodeType.Program
    ];

    /**
     * @param node
     */
    public static addXVerbatimPropertyToLiterals (node: INode): void {
        NodeUtils.typedReplace(node, NodeType.Literal, {
            leave: (node: ILiteralNode) => {
                node['x-verbatim-property'] = {
                    content : node.raw,
                    precedence: escodegen.Precedence.Primary
                };
            }
        });
    }

    /**
     * @param blockScopeBody
     * @param node
     */
    public static appendNode (blockScopeBody: INode[], node: INode): void {
        if (!NodeUtils.validateNode(node)) {
            return;
        }

        blockScopeBody.push(node);
    }

    /**
     * @param code
     * @returns {INode}
     */
    public static convertCodeToStructure (code: string): INode {
        let structure: INode = esprima.parse(code);

        NodeUtils.addXVerbatimPropertyToLiterals(structure);
        NodeUtils.parentize(structure);

        return NodeUtils.getBlockStatementNodeByIndex(structure);
    }

    /**
     * @param node
     * @param index
     * @returns {INode}
     */
    public static getBlockStatementNodeByIndex (node: INode, index: number = 0): INode {
        if (Nodes.isNodeHasBlockStatement(node)) {
            if (node.body[index] === undefined) {
                throw new ReferenceError(`Wrong index \`${index}\`. Block-statement body length is \`${node.body.length}\``);
            }

            return node.body[index];
        }

        throw new TypeError('The specified node have no a block-statement');
    }

    /**
     * @param node
     * @param depth
     * @returns {INode}
     */
    public static getBlockScopeOfNode (node: INode, depth: number = 0): TNodeWithBlockStatement {
        let parentNode: INode | undefined = node.parentNode;

        if (!parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (Nodes.isBlockStatementNode(parentNode)) {
            if (!parentNode.parentNode) {
                throw new ReferenceError('`parentNode` property of `parentNode` of given node is `undefined`');
            }

            if (!Utils.arrayContains(NodeUtils.nodesWithBlockScope, parentNode.parentNode.type)) {
                return NodeUtils.getBlockScopeOfNode(parentNode, depth);
            } else if (depth > 0) {
                return NodeUtils.getBlockScopeOfNode(parentNode, --depth);
            }

            return parentNode;
        }

        if (Nodes.isProgramNode(parentNode)) {
            return parentNode;
        }

        return NodeUtils.getBlockScopeOfNode(parentNode);
    }

    /**
     * @param blockScopeBody
     * @param node
     * @param index
     */
    public static insertNodeAtIndex (blockScopeBody: INode[], node: INode, index: number): void {
        if (!NodeUtils.validateNode(node)) {
            return;
        }

        blockScopeBody.splice(index, 0, node);
    }

    /**
     * @param node
     */
    public static parentize (node: INode): void {
        let isRootNode: boolean = true;

        estraverse.replace(node, {
            enter: (node: INode, parentNode: INode): any => {
                let value: INode;

                if (isRootNode) {
                    if (node.type === NodeType.Program) {
                        value = node;
                    } else {
                        value = Nodes.getProgramNode(<TStatement[]>[node]);
                        value['parentNode'] = value;
                    }

                    isRootNode = false;
                } else {
                    value = parentNode || node;
                }

                node['parentNode'] = value;
            }
        });
    }

    /**
     * @param blockScopeBody
     * @param node
     */
    public static prependNode (blockScopeBody: INode[], node: INode): void {
        if (!NodeUtils.validateNode(node)) {
            return;
        }

        blockScopeBody.unshift(node);
    }

    /**
     * @param node
     * @param nodeType
     * @param visitor
     */
    public static typedReplace (
        node: INode,
        nodeType: string,
        visitor: {enter?: (node: INode) => void, leave?: (node: INode) => void},
    ): void {
        NodeUtils.typedTraverse(node, nodeType, visitor, 'replace');
    }

    /**
     * @param node
     * @param nodeType
     * @param visitor
     * @param traverseType
     */
    public static typedTraverse (
        node: INode,
        nodeType: string,
        visitor: {enter?: (node: INode) => void, leave?: (node: INode) => void},
        traverseType: string = 'traverse'
    ): void {
        (<any>estraverse)[traverseType](node, {
            enter: (node: INode): any => {
                if (node.type === nodeType && visitor.enter) {
                    visitor.enter(node)
                }
            },
            leave: (node: INode): any => {
                if (node.type === nodeType && visitor.leave) {
                    visitor.leave(node)
                }
            }
        });
    }

    /**
     * @param node
     * @returns {boolean}
     */
    private static validateNode (node: INode): boolean {
        return !!node && node.hasOwnProperty('type');
    }
}
