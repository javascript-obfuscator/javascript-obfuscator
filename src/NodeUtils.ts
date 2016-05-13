import { IBlockStatementNode } from "./interfaces/nodes/IBlockStatementNode";
import { IIdentifierNode } from "./interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "./interfaces/nodes/ILiteralNode";
import { IMemberExpressionNode } from "./interfaces/nodes/IMemberExpressionNode";
import { IPropertyNode } from "./interfaces/nodes/IPropertyNode";
import { ITreeNode } from './interfaces/nodes/ITreeNode';
import { IVariableDeclaratorNode } from "./interfaces/nodes/IVariableDeclaratorNode";

export class NodeUtils {
    /**
     * @param node
     * @param deep
     * @returns {ITreeNode}
     */
    public static getNodeScope (node: ITreeNode,  deep: number = 0): ITreeNode {
        let scopeNodes: string[] = [
            'FunctionDeclaration',
            'FunctionExpression',
            'ArrowFunctionExpression',
            'MethodDefinition'
        ];

        if (node.parentNode.type === 'Program') {
            return node.parentNode;
        }

        if (scopeNodes.indexOf(node.parentNode.type) < 0) {
            return NodeUtils.getNodeScope(node.parentNode, deep);
        }

        if (deep > 0) {
            return NodeUtils.getNodeScope(node.parentNode, --deep);
        }

        if (node.type !== 'BlockStatement') {
            return NodeUtils.getNodeScope(node.parentNode);
        }

        return node; // BlockStatement of scopeNodes
    }

    /**
     * @param node
     * @param types
     * @param limitNodeTypes
     * @param deep
     * @returns {ITreeNode}
     */
    public static getParentNodeWithType (
        node: ITreeNode,
        types: string[],
        limitNodeTypes: string[] = [],
        deep: number = 0
    ): ITreeNode {
        if (node.parentNode.type === 'Program' || limitNodeTypes.indexOf(node.parentNode.type) >= 0) {
            return node.parentNode;
        }

        if (types.indexOf(node.parentNode.type) < 0) {
            return NodeUtils.getParentNodeWithType(node.parentNode, types, limitNodeTypes, deep);
        }

        if (deep > 0) {
            return NodeUtils.getParentNodeWithType(node.parentNode, types, limitNodeTypes, --deep);
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
