import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../types/node/TNodeWithBlockStatement';

import { NodeType } from '../enums/NodeType';

export class Node {
    /**
     * @param node
     * @returns {boolean}
     */
    public static isArrowFunctionExpressionNode (node: ESTree.Node): node is ESTree.ArrowFunctionExpression {
        return node.type === NodeType.ArrowFunctionExpression;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isBlockStatementNode (node: ESTree.Node): node is ESTree.BlockStatement {
        return node.type === NodeType.BlockStatement;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isBreakStatementNode (node: ESTree.Node): node is ESTree.BreakStatement {
        return node.type === NodeType.BreakStatement;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isCallExpressionNode (node: ESTree.Node): node is ESTree.CallExpression {
        return node.type === NodeType.CallExpression;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isContinueStatementNode (node: ESTree.Node): node is ESTree.ContinueStatement {
        return node.type === NodeType.ContinueStatement;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isExpressionStatementNode (node: ESTree.Node): node is ESTree.ExpressionStatement {
        return node.type === NodeType.ExpressionStatement;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isFunctionDeclarationNode (node: ESTree.Node): node is ESTree.FunctionDeclaration {
        return node.type === NodeType.FunctionDeclaration;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isFunctionExpressionNode (node: ESTree.Node): node is ESTree.FunctionExpression {
        return node.type === NodeType.FunctionExpression;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isIdentifierNode (node: ESTree.Node): node is ESTree.Identifier {
        return node.type === NodeType.Identifier;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isIfStatementNode (node: ESTree.Node): node is ESTree.IfStatement {
        return node.type === NodeType.IfStatement;
    }

    /**
     * @param node
     * @param parentNode
     * @returns {boolean}
     */
    public static isLabelIdentifierNode (node: ESTree.Node, parentNode: ESTree.Node): node is ESTree.Identifier {
        const parentNodeIsLabeledStatementNode: boolean = Node.isLabeledStatementNode(parentNode) && parentNode.label === node;
        const parentNodeIsContinueStatementNode: boolean = Node.isContinueStatementNode(parentNode) && parentNode.label === node;
        const parentNodeIsBreakStatementNode: boolean = Node.isBreakStatementNode(parentNode) && parentNode.label === node;

        return parentNodeIsLabeledStatementNode || parentNodeIsContinueStatementNode || parentNodeIsBreakStatementNode;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isLabeledStatementNode (node: ESTree.Node): node is ESTree.LabeledStatement {
        return node.type === NodeType.LabeledStatement;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isLiteralNode (node: ESTree.Node): node is ESTree.Literal {
        return node.type === NodeType.Literal;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isMemberExpressionNode (node: ESTree.Node): node is ESTree.MemberExpression {
        return node.type === NodeType.MemberExpression;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isObjectExpressionNode (node: ESTree.Node): node is ESTree.ObjectExpression {
        return node.type === NodeType.ObjectExpression;
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isProgramNode (node: ESTree.Node): node is ESTree.Program {
        return node.type === NodeType.Program;
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isPropertyNode (node: ESTree.Node): node is ESTree.Property {
        return node.type === NodeType.Property;
    }

    /**
     * @param node
     * @param parentNode
     * @returns {boolean}
     */
    public static isReplaceableIdentifierNode (node: ESTree.Node, parentNode: ESTree.Node): node is ESTree.Identifier {
        if (!Node.isIdentifierNode(node)) {
            return false;
        }

        const parentNodeIsPropertyNode: boolean = Node.isPropertyNode(parentNode) && parentNode.key === node;
        const parentNodeIsMemberExpressionNode: boolean = (
            Node.isMemberExpressionNode(parentNode) &&
            parentNode.computed === false &&
            parentNode.property === node
        );

        return !parentNodeIsPropertyNode && !parentNodeIsMemberExpressionNode && !Node.isLabelIdentifierNode(node, parentNode);
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isUnaryExpressionNode (node: ESTree.Node): node is ESTree.UnaryExpression {
        return node.type === NodeType.UnaryExpression;
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isVariableDeclarationNode (node: ESTree.Node): node is ESTree.VariableDeclaration {
        return node.type === NodeType.VariableDeclaration;
    }

    /**
     *
     * @param node
     * @returns {boolean}
     */
    public static isVariableDeclaratorNode (node: ESTree.Node): node is ESTree.VariableDeclarator {
        return node.type === NodeType.VariableDeclarator;
    }

    /**
     * @param node
     * @returns {boolean}
     */
    public static isNodeHasBlockStatement (node: ESTree.Node): node is TNodeWithBlockStatement {
        return node.hasOwnProperty('body') && Array.isArray((<TNodeWithBlockStatement>node).body);
    }
}
