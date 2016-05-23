import { IBlockStatementNode } from "./interfaces/nodes/IBlockStatementNode";
import { ICatchClauseNode } from "./interfaces/nodes/ICatchClauseNode";
import { IFunctionNode } from "./interfaces/nodes/IFunctionNode";
import { IIdentifierNode } from "./interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "./interfaces/nodes/ILiteralNode";
import { IMemberExpressionNode } from "./interfaces/nodes/IMemberExpressionNode";
import { IProgramNode } from "./interfaces/nodes/IProgramNode";
import { IPropertyNode } from "./interfaces/nodes/IPropertyNode";
import { ITreeNode } from './interfaces/nodes/ITreeNode';
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
     * @param node
     * @param index
     * @returns {ITreeNode}
     */
    public static getBlockScopeNodeByIndex (node: ITreeNode, index: number = 0): ITreeNode {
        if (NodeUtils.isNodeHasBlockScope(node) && node.body[index]) {
            return node.body[index];
        }

        return node;
    }

    /**
     * @param node
     * @param depth
     * @returns {ITreeNode}
     */
    public static getScopeOfNode (node: ITreeNode, depth: number = 0): ITreeNode {
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
     * @returns {ITreeNode}
     */
    public static getParentNodeWithType (
        node: ITreeNode,
        types: string[],
        limitNodeTypes: string[] = [],
        depth: number = 0
    ): ITreeNode {
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
     * @param node
     * @returns {boolean}
     */
    public static isBlockStatementNode (node: ITreeNode): node is IBlockStatementNode {
        return node.type === NodeType.BlockStatement;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isIdentifierNode (node: ITreeNode): node is IIdentifierNode {
        return node.type === NodeType.Identifier;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isLiteralNode (node: ITreeNode): node is ILiteralNode {
        return node.type === NodeType.Literal;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isMemberExpressionNode (node: ITreeNode): node is IMemberExpressionNode {
        return node.type === NodeType.MemberExpression;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isNodeHasBlockScope (
        node: ITreeNode
    ): node is IBlockStatementNode|ICatchClauseNode|IFunctionNode|IProgramNode {
        return node.hasOwnProperty('body');
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isProgramNode (node: ITreeNode): node is IProgramNode {
        return node.type === NodeType.Program;
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isPropertyNode (node: ITreeNode): node is IPropertyNode {
        return node.type === NodeType.Property;
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isVariableDeclaratorNode (node: ITreeNode): node is IVariableDeclaratorNode {
        return node.type === NodeType.VariableDeclarator;
    }
}
