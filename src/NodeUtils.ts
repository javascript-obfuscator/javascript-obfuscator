import { IBlockStatementNode } from "./interfaces/nodes/IBlockStatementNode";
import { IIdentifierNode } from "./interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "./interfaces/nodes/ILiteralNode";
import { IMemberExpressionNode } from "./interfaces/nodes/IMemberExpressionNode";
import { IPropertyNode } from "./interfaces/nodes/IPropertyNode";
import { ITreeNode } from './interfaces/nodes/ITreeNode';
import { IVariableDeclaratorNode } from "./interfaces/nodes/IVariableDeclaratorNode";

import { Utils } from "./Utils";

export class NodeUtils {
    /**
     * @type {string[]}
     */
    private static scopeNodes: string[] = [
        'ArrowFunctionExpression',
        'FunctionDeclaration',
        'FunctionExpression',
        'MethodDefinition'
    ];

    /**
     * @param node
     * @param depth
     * @returns {ITreeNode}
     */
    public static getScopeOfNode (node: ITreeNode, depth: number = 0): ITreeNode {
        if (node.parentNode.type === 'Program') {
            return node.parentNode;
        }

        if (!Utils.arrayContains(NodeUtils.scopeNodes, node.parentNode.type)) {
            return NodeUtils.getScopeOfNode(node.parentNode, depth);
        }

        if (depth > 0) {
            return NodeUtils.getScopeOfNode(node.parentNode, --depth);
        }

        if (node.type !== 'BlockStatement') {
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
        if (node.parentNode.type === 'Program' || Utils.arrayContains(limitNodeTypes, node.parentNode.type)) {
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
        return node.type === 'BlockStatement';
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isIdentifierNode (node: ITreeNode): node is IIdentifierNode {
        return node.type === 'Identifier';
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isLiteralNode (node: ITreeNode): node is ILiteralNode {
        return node.type === 'Literal';
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isMemberExpressionNode (node: ITreeNode): node is IMemberExpressionNode {
        return node.type === 'MemberExpression';
    }


    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isPropertyNode (node: ITreeNode): node is IPropertyNode {
        return node.type === 'Property';
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isVariableDeclaratorNode (node: ITreeNode): node is IVariableDeclaratorNode {
        return node.type === 'VariableDeclarator';
    }
}
