import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../types/node/TNodeWithBlockStatement';

import { NodeType } from '../enums/node/NodeType';

export class NodeGuards {
    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isArrowFunctionExpressionNode (node: ESTree.Node): node is ESTree.ArrowFunctionExpression {
        return node.type === NodeType.ArrowFunctionExpression;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isAssignmentPatternNode (node: ESTree.Node): node is ESTree.AssignmentPattern {
        return node.type === NodeType.AssignmentPattern;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isAwaitExpressionNode (node: ESTree.Node): node is ESTree.AwaitExpression {
        return node.type === NodeType.AwaitExpression;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isBlockStatementNode (node: ESTree.Node): node is ESTree.BlockStatement {
        return node.type === NodeType.BlockStatement;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isBreakStatementNode (node: ESTree.Node): node is ESTree.BreakStatement {
        return node.type === NodeType.BreakStatement;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isCallExpressionNode (node: ESTree.Node): node is ESTree.CallExpression {
        return node.type === NodeType.CallExpression;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isCatchClauseNode (node: ESTree.Node): node is ESTree.CatchClause {
        return node.type === NodeType.CatchClause;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isClassDeclarationNode (node: ESTree.Node): node is ESTree.ClassDeclaration {
        return node.type === NodeType.ClassDeclaration;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isContinueStatementNode (node: ESTree.Node): node is ESTree.ContinueStatement {
        return node.type === NodeType.ContinueStatement;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isExpressionStatementNode (node: ESTree.Node): node is ESTree.ExpressionStatement {
        return node.type === NodeType.ExpressionStatement;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isFunctionDeclarationNode (node: ESTree.Node): node is ESTree.FunctionDeclaration {
        return node.type === NodeType.FunctionDeclaration;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isFunctionExpressionNode (node: ESTree.Node): node is ESTree.FunctionExpression {
        return node.type === NodeType.FunctionExpression;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isIdentifierNode (node: ESTree.Node): node is ESTree.Identifier {
        return node.type === NodeType.Identifier;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isIfStatementNode (node: ESTree.Node): node is ESTree.IfStatement {
        return node.type === NodeType.IfStatement;
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {boolean}
     */
    public static isLabelIdentifierNode (node: ESTree.Node, parentNode: ESTree.Node): node is ESTree.Identifier {
        const parentNodeIsLabeledStatementNode: boolean = NodeGuards.isLabeledStatementNode(parentNode) && parentNode.label === node;
        const parentNodeIsContinueStatementNode: boolean = NodeGuards.isContinueStatementNode(parentNode) && parentNode.label === node;
        const parentNodeIsBreakStatementNode: boolean = NodeGuards.isBreakStatementNode(parentNode) && parentNode.label === node;

        return parentNodeIsLabeledStatementNode || parentNodeIsContinueStatementNode || parentNodeIsBreakStatementNode;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isLabeledStatementNode (node: ESTree.Node): node is ESTree.LabeledStatement {
        return node.type === NodeType.LabeledStatement;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isLiteralNode (node: ESTree.Node): node is ESTree.Literal {
        return node.type === NodeType.Literal;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isMemberExpressionNode (node: ESTree.Node): node is ESTree.MemberExpression {
        return node.type === NodeType.MemberExpression;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isMethodDefinitionNode (node: ESTree.Node): node is ESTree.MethodDefinition {
        return node.type === NodeType.MethodDefinition;
    }

    /**
     * @param {Object} object
     * @returns {boolean}
     */
    public static isNode (object: Object & { type?: string }): object is ESTree.Node {
        return object && !object.type !== undefined;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isNodeHasBlockStatement (node: ESTree.Node): node is TNodeWithBlockStatement {
        return Array.isArray((<TNodeWithBlockStatement>node).body);
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isObjectPatternNode (node: ESTree.Node): node is ESTree.ObjectPattern {
        return node.type === NodeType.ObjectPattern;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isObjectExpressionNode (node: ESTree.Node): node is ESTree.ObjectExpression {
        return node.type === NodeType.ObjectExpression;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isProgramNode (node: ESTree.Node): node is ESTree.Program {
        return node.type === NodeType.Program;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isPropertyNode (node: ESTree.Node): node is ESTree.Property {
        return node.type === NodeType.Property;
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {boolean}
     */
    public static isReplaceableIdentifierNode (node: ESTree.Node, parentNode: ESTree.Node): node is ESTree.Identifier {
        if (!NodeGuards.isIdentifierNode(node)) {
            return false;
        }

        const parentNodeIsPropertyNode: boolean = NodeGuards.isPropertyNode(parentNode)
            && !parentNode.computed
            && parentNode.key === node;
        const parentNodeIsMemberExpressionNode: boolean = (
            NodeGuards.isMemberExpressionNode(parentNode) &&
            parentNode.computed === false &&
            parentNode.property === node
        );

        return !parentNodeIsPropertyNode &&
            !parentNodeIsMemberExpressionNode &&
            !NodeGuards.isLabelIdentifierNode(node, parentNode);
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isReturnStatementNode (node: ESTree.Node): node is ESTree.ReturnStatement {
        return node.type === NodeType.ReturnStatement;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isTemplateLiteralNode (node: ESTree.Node): node is ESTree.TemplateLiteral {
        return node.type === NodeType.TemplateLiteral;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isUnaryExpressionNode (node: ESTree.Node): node is ESTree.UnaryExpression {
        return node.type === NodeType.UnaryExpression;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isUseStrictOperator (node: ESTree.Node): node is ESTree.ExpressionStatement {
        return node.type === NodeType.ExpressionStatement && node.directive === 'use strict';
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isVariableDeclarationNode (node: ESTree.Node): node is ESTree.VariableDeclaration {
        return node.type === NodeType.VariableDeclaration;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isVariableDeclaratorNode (node: ESTree.Node): node is ESTree.VariableDeclarator {
        return node.type === NodeType.VariableDeclarator;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isWhileStatementNode (node: ESTree.Node): node is ESTree.WhileStatement {
        return node.type === NodeType.WhileStatement;
    }
}
