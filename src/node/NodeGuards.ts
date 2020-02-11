import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../types/node/TNodeWithLexicalScope';
import { TNodeWithStatements } from '../types/node/TNodeWithStatements';

import { NodeType } from '../enums/node/NodeType';

export class NodeGuards {
    /**
     * @type {string[]}
     */
    private static readonly nodesWithLexicalStatements: string[] = [
        NodeType.ArrowFunctionExpression,
        NodeType.FunctionDeclaration,
        NodeType.FunctionExpression,
        NodeType.MethodDefinition,
    ];

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isArrayPatternNode (node: ESTree.Node): node is ESTree.ArrayPattern {
        return node.type === NodeType.ArrayPattern;
    }

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
    public static isAssignmentExpressionNode (node: ESTree.Node): node is ESTree.AssignmentExpression {
        return node.type === NodeType.AssignmentExpression;
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
    public static isClassDeclarationNode (
        node: ESTree.Node
    ): node is ESTree.ClassDeclaration & { id: ESTree.Identifier } {
        return node.type === NodeType.ClassDeclaration && node.id !== null;
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
    public static isDirectiveNode (node: ESTree.Node): node is ESTree.Directive {
        return node.type === NodeType.ExpressionStatement
            && 'directive' in node;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isExportNamedDeclarationNode (node: ESTree.Node): node is ESTree.ExportNamedDeclaration {
        return node.type === NodeType.ExportNamedDeclaration;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isExpressionStatementNode (node: ESTree.Node): node is ESTree.ExpressionStatement {
        return node.type === NodeType.ExpressionStatement
            && !('directive' in node);
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isFunctionNode (node: ESTree.Node): node is ESTree.Function {
        return NodeGuards.isFunctionDeclarationNode(node) ||
            NodeGuards.isFunctionExpressionNode(node) ||
            NodeGuards.isArrowFunctionExpressionNode(node);
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isFunctionDeclarationNode (
        node: ESTree.Node
    ): node is ESTree.FunctionDeclaration & { id: ESTree.Identifier } {
        return node.type === NodeType.FunctionDeclaration && node.id !== null;
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
    public static isImportDeclarationNode (node: ESTree.Node): node is ESTree.ImportDeclaration {
        return node.type === NodeType.ImportDeclaration;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isImportSpecifierNode (node: ESTree.Node): node is ESTree.ImportSpecifier {
        return node.type === NodeType.ImportSpecifier;
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
    // eslint-disable-next-line @typescript-eslint/ban-types
    public static isNode (object: Object & { type?: string }): object is ESTree.Node {
        return object && !object.type !== undefined;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isNodeWithLexicalScope (node: ESTree.Node): node is TNodeWithLexicalScope {
        return NodeGuards.isProgramNode(node) || NodeGuards.isFunctionNode(node);
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isNodeWithBlockLexicalScope (node: ESTree.Node): node is TNodeWithLexicalScope {
        return NodeGuards.isNodeWithLexicalScope(node) || NodeGuards.isBlockStatementNode(node);
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {boolean}
     */
    public static isNodeWithLexicalScopeStatements (
        node: ESTree.Node,
        parentNode: ESTree.Node
    ): node is TNodeWithStatements {
        return NodeGuards.isProgramNode(node)
            || (NodeGuards.isBlockStatementNode(node) && NodeGuards.nodesWithLexicalStatements.includes(parentNode.type));
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isNodeWithStatements (node: ESTree.Node): node is TNodeWithStatements {
        return NodeGuards.isProgramNode(node)
            || NodeGuards.isBlockStatementNode(node)
            || NodeGuards.isSwitchCaseNode(node);
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isNodeWithComments (node: ESTree.Node): node is ESTree.Node {
        return Boolean(node.leadingComments) || Boolean(node.trailingComments);
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
     * @returns {boolean}
     */
    public static isRestElementNode (node: ESTree.Node): node is ESTree.RestElement {
        return node.type === NodeType.RestElement;
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
    public static isSequenceExpressionNode (node: ESTree.Node): node is ESTree.SequenceExpression {
        return node.type === NodeType.SequenceExpression;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isSuperNode (node: ESTree.Node): node is ESTree.Super {
        return node.type === NodeType.Super;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isSwitchCaseNode (node: ESTree.Node): node is ESTree.SwitchCase {
        return node.type === NodeType.SwitchCase;
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    public static isTaggedTemplateExpressionNode (node: ESTree.Node): node is ESTree.TaggedTemplateExpression {
        return node.type === NodeType.TaggedTemplateExpression;
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
    public static isUseStrictOperator (node: ESTree.Node): node is ESTree.Directive {
        return NodeGuards.isDirectiveNode(node)
            && node.directive === 'use strict';
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
