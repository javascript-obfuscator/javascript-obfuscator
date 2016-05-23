"use strict";
const NodeType_1 = require("./enums/NodeType");
const Utils_1 = require("./Utils");
class NodeUtils {
    static getBlockScopeNodeByIndex(node, index = 0) {
        if (NodeUtils.isNodeHasBlockScope(node) && node.body[index]) {
            return node.body[index];
        }
        return node;
    }
    static getScopeOfNode(node, depth = 0) {
        if (node.parentNode.type === NodeType_1.NodeType.Program) {
            return node.parentNode;
        }
        if (!Utils_1.Utils.arrayContains(NodeUtils.scopeNodes, node.parentNode.type)) {
            return NodeUtils.getScopeOfNode(node.parentNode, depth);
        }
        if (depth > 0) {
            return NodeUtils.getScopeOfNode(node.parentNode, --depth);
        }
        if (node.type !== NodeType_1.NodeType.BlockStatement) {
            return NodeUtils.getScopeOfNode(node.parentNode);
        }
        return node;
    }
    static getParentNodeWithType(node, types, limitNodeTypes = [], depth = 0) {
        if (node.parentNode.type === NodeType_1.NodeType.Program || Utils_1.Utils.arrayContains(limitNodeTypes, node.parentNode.type)) {
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
        return node.type === NodeType_1.NodeType.BlockStatement;
    }
    static isIdentifierNode(node) {
        return node.type === NodeType_1.NodeType.Identifier;
    }
    static isLiteralNode(node) {
        return node.type === NodeType_1.NodeType.Literal;
    }
    static isMemberExpressionNode(node) {
        return node.type === NodeType_1.NodeType.MemberExpression;
    }
    static isNodeHasBlockScope(node) {
        return node.hasOwnProperty('body');
    }
    static isProgramNode(node) {
        return node.type === NodeType_1.NodeType.Program;
    }
    static isPropertyNode(node) {
        return node.type === NodeType_1.NodeType.Property;
    }
    static isVariableDeclaratorNode(node) {
        return node.type === NodeType_1.NodeType.VariableDeclarator;
    }
}
NodeUtils.scopeNodes = [
    NodeType_1.NodeType.ArrowFunctionExpression,
    NodeType_1.NodeType.FunctionDeclaration,
    NodeType_1.NodeType.FunctionExpression,
    NodeType_1.NodeType.MethodDefinition
];
exports.NodeUtils = NodeUtils;
