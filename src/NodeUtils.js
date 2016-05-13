"use strict";
class NodeUtils {
    static getNodeScope(node, deep = 0) {
        let scopeNodes = [
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
        return node;
    }
    static getParentNodeWithType(node, types, limitNodeTypes = [], deep = 0) {
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
    static isBlockStatementNode(node) {
        return node.type === 'BlockStatement';
    }
    static isIdentifierNode(node) {
        return node.type === 'Identifier';
    }
    static isLiteralNode(node) {
        return node.type === 'Literal';
    }
    static isMemberExpressionNode(node) {
        return node.type === 'MemberExpression';
    }
    static isPropertyNode(node) {
        return node.type === 'Property';
    }
    static isVariableDeclaratorNode(node) {
        return node.type === 'VariableDeclarator';
    }
}
exports.NodeUtils = NodeUtils;
