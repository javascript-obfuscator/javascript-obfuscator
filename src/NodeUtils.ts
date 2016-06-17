import * as estraverse from 'estraverse';

import { INode } from './interfaces/nodes/INode';

import { TNodeWithBlockStatement } from "./types/TNodeWithBlockStatement";

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
        NodeType.MethodDefinition
    ];

    /**
     * @param node
     */
    public static addXVerbatimPropertyToLiterals (node: INode): void {
        estraverse.replace(node, {
            enter: (node: INode, parentNode: INode): any => {
                if (Nodes.isLiteralNode(node)) {
                   node['x-verbatim-property'] = node.raw;
                }
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
     * @param node
     * @param index
     * @returns {INode}
     */
    public static getBlockStatementNodeByIndex (node: INode, index: number = 0): INode {
        if (Nodes.isNodeHasBlockStatement(node) && node.body[index]) {
            return node.body[index];
        }

        return node;
    }

    /**
     * @param node
     * @param depth
     * @returns {INode}
     */
    public static getBlockScopeOfNode (node: INode, depth: number = 0): TNodeWithBlockStatement {
        if (!node.parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (node.parentNode.type === NodeType.Program) {
            return <TNodeWithBlockStatement> node.parentNode;
        }

        if (!Utils.arrayContains(NodeUtils.nodesWithBlockScope, node.parentNode.type)) {
            return NodeUtils.getBlockScopeOfNode(node.parentNode, depth);
        }

        if (depth > 0) {
            return NodeUtils.getBlockScopeOfNode(node.parentNode, --depth);
        }

        if (node.type !== NodeType.BlockStatement) {
            return NodeUtils.getBlockScopeOfNode(node.parentNode);
        }

        return <TNodeWithBlockStatement> node; // blocks statement of scopeNodes
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
                Object.defineProperty(node, 'parentNode', {
                    configurable: true,
                    enumerable: true,
                    value: isRootNode ? Nodes.getProgramNode([node]) : parentNode || node,
                    writable: true
                });

                isRootNode = false;
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
     * @returns {boolean}
     */
    private static validateNode (node: INode): boolean {
        return !!node;
    }
}
