"use strict";
class NodeUtils {
    static getScopeOfNode(node, depth = 0) {
        if (node.parentNode.type === 'Program') {
            return node.parentNode;
        }
        if (NodeUtils.scopeNodes.indexOf(node.parentNode.type) < 0) {
            return NodeUtils.getScopeOfNode(node.parentNode, depth);
        }
        if (depth > 0) {
            return NodeUtils.getScopeOfNode(node.parentNode, --depth);
        }
        if (node.type !== 'BlockStatement') {
            return NodeUtils.getScopeOfNode(node.parentNode);
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
NodeUtils.scopeNodes = [
    'ArrowFunctionExpression',
    'FunctionDeclaration',
    'FunctionExpression',
    'MethodDefinition'
];
exports.NodeUtils = NodeUtils;
