import { IBlockStatementNode } from "./interfaces/nodes/IBlockStatementNode";
import { ICatchClauseNode } from "./interfaces/nodes/ICatchClauseNode";
import { IFunctionNode } from "./interfaces/nodes/IFunctionNode";
import { IIdentifierNode } from "./interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "./interfaces/nodes/ILiteralNode";
import { IMemberExpressionNode } from "./interfaces/nodes/IMemberExpressionNode";
import { IProgramNode } from "./interfaces/nodes/IProgramNode";
import { IPropertyNode } from "./interfaces/nodes/IPropertyNode";
import { INode } from './interfaces/nodes/INode';
import { IVariableDeclaratorNode } from "./interfaces/nodes/IVariableDeclaratorNode";

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
    public static getScopeOfNode (node: INode, depth: number = 0): INode {
        if (node.parentNode.type === NodeType.Program) {
            return node.parentNode;
        }

        if (!Utils.arrayContains(NodeUtils.scopeNodes, node.parentNode.type)) {
            return NodeUtils.getScopeOfNode(node.parentNode, depth);
        }

        if (depth > 0) {
            return NodeUtils.getScopeOfNode(node.parentNode, --depth);
        }

        if (node.type !== NodeType.BlockStatement) {
            return NodeUtils.getScopeOfNode(node.parentNode);
        }

        return node; // blocks statement of scopeNodes
    }

    /**
     * @param node
     * @param types
     * @param limitNodeTypes
     * @param depth
     * @returns {INode}
     */
    public static getParentNodeWithType (
        node: INode,
        types: string[],
        limitNodeTypes: string[] = [],
        depth: number = 0
    ): INode {
        if (node.parentNode.type === NodeType.Program || Utils.arrayContains(limitNodeTypes, node.parentNode.type)) {
            return node.parentNode;
        }

        if (!Utils.arrayContains(types, node.parentNode.type)) {
            return NodeUtils.getParentNodeWithType(node.parentNode, types, limitNodeTypes, depth);
        }

        if (depth > 0) {
            return NodeUtils.getParentNodeWithType(node.parentNode, types, limitNodeTypes, --depth);
        }

        return node.parentNode;
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
    public static isNodeHasBlockScope (
        node: INode
    ): node is IBlockStatementNode|ICatchClauseNode|IFunctionNode|IProgramNode {
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
