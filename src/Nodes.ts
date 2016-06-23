import { IBlockStatementNode } from "./interfaces/nodes/IBlockStatementNode";
import { IIdentifierNode } from "./interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "./interfaces/nodes/ILiteralNode";
import { IMemberExpressionNode } from "./interfaces/nodes/IMemberExpressionNode";
import { INode } from "./interfaces/nodes/INode";
import { IProgramNode } from "./interfaces/nodes/IProgramNode";
import { IPropertyNode } from "./interfaces/nodes/IPropertyNode";
import { IVariableDeclaratorNode } from "./interfaces/nodes/IVariableDeclaratorNode";

import { TNodeWithBlockStatement } from "./types/TNodeWithBlockStatement";

import { NodeType } from "./enums/NodeType";

export class Nodes {
    /**
     * @param bodyNode
     * @returns IProgramNode
     */
    public static getProgramNode (bodyNode: INode[]): IProgramNode {
        return {
            'type': NodeType.Program,
            'body': bodyNode
        };
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
     * @returns {boolean}
     */
    public static isNodeHasBlockStatement (node: INode): node is TNodeWithBlockStatement {
        return node.hasOwnProperty('body') && Array.isArray((<TNodeWithBlockStatement>node).body);
    }
}
