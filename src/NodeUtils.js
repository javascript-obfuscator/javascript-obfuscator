"use strict";
const Utils_1 = require("./Utils");
class NodeUtils {
    static getScopeOfNode(node, depth = 0) {
        if (node.parentNode.type === 'Program') {
            return node.parentNode;
        }
        if (!Utils_1.Utils.arrayContains(NodeUtils.scopeNodes, node.parentNode.type)) {
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
    static getParentNodeWithType(node, types, limitNodeTypes = [], depth = 0) {
        if (node.parentNode.type === 'Program' || Utils_1.Utils.arrayContains(limitNodeTypes, node.parentNode.type)) {
            return node.parentNode;
        }
        if (!Utils_1.Utils.arrayContains(types, node.parentNode.type)) {
            return NodeUtils.getParentNodeWithType(node.parentNode, types, limitNodeTypes, depth);
        }
        if (depth > 0) {
            return NodeUtils.getParentNodeWithType(node.parentNode, types, limitNodeTypes, --depth);
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
