import * as estraverse from 'estraverse';

import { IBlockStatementNode } from "./interfaces/nodes/IBlockStatementNode";
import { IIdentifierNode } from "./interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "./interfaces/nodes/ILiteralNode";
import { IMemberExpressionNode } from "./interfaces/nodes/IMemberExpressionNode";
import { IProgramNode } from "./interfaces/nodes/IProgramNode";
import { IPropertyNode } from "./interfaces/nodes/IPropertyNode";
import { INode } from './interfaces/nodes/INode';
import { IVariableDeclaratorNode } from "./interfaces/nodes/IVariableDeclaratorNode";

import { BlockScopeNode } from "./types/BlockScopeNode";

import { NodeType } from "./enums/NodeType";

import { Utils } from "./Utils";

export class NodeUtils {
    /**
     * @type {string[]}
     */
    private static scopeNodes: string[] = [
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
                if (NodeUtils.isLiteralNode(node)) {
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
    public static getBlockScopeNodeByIndex (node: INode, index: number = 0): INode {
        if (NodeUtils.isNodeHasBlockScope(node) && node.body[index]) {
            return node.body[index];
        }

        return node;
    }

    /**
     * @param node
     * @param depth
     * @returns {INode}
     */
    public static getBlockScopeOfNode (node: INode, depth: number = 0): BlockScopeNode {
        if (!node.parentNode) {
            throw new ReferenceError('`parentNode` property of given node is `undefined`');
        }

        if (node.parentNode.type === NodeType.Program) {
            return <BlockScopeNode> node.parentNode;
        }

        if (!Utils.arrayContains(NodeUtils.scopeNodes, node.parentNode.type)) {
            return NodeUtils.getBlockScopeOfNode(node.parentNode, depth);
        }

        if (depth > 0) {
            return NodeUtils.getBlockScopeOfNode(node.parentNode, --depth);
        }

        if (node.type !== NodeType.BlockStatement) {
            return NodeUtils.getBlockScopeOfNode(node.parentNode);
        }

        return <BlockScopeNode> node; // blocks statement of scopeNodes
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
     * @returns {boolean}
     */
    public static isBlockStatementNode (node: INode): node is IBlockStatementNode {
        return node.type === NodeType.BlockStatement;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isIdentifierNode (node: INode): node is IIdentifierNode {
        return node.type === NodeType.Identifier;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isLiteralNode (node: INode): node is ILiteralNode {
        return node.type === NodeType.Literal;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isMemberExpressionNode (node: INode): node is IMemberExpressionNode {
        return node.type === NodeType.MemberExpression;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isNodeHasBlockScope (node: INode): node is BlockScopeNode {
        return node.hasOwnProperty('body');
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isProgramNode (node: INode): node is IProgramNode {
        return node.type === NodeType.Program;
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isPropertyNode (node: INode): node is IPropertyNode {
        return node.type === NodeType.Property;
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isVariableDeclaratorNode (node: INode): node is IVariableDeclaratorNode {
        return node.type === NodeType.VariableDeclarator;
    }

    /**
     * @param node
     */
    public static parentize (node: INode): void {
        estraverse.replace(node, {
            enter: (node: INode, parentNode: INode): any => {
                Object.defineProperty(node, 'parentNode', {
                    configurable: true,
                    enumerable: true,
                    value: parentNode || node,
                    writable: true
                });
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
