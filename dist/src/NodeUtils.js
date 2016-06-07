"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = require('estraverse');
var NodeType_1 = require("./enums/NodeType");
var Utils_1 = require("./Utils");

var NodeUtils = function () {
    function NodeUtils() {
        _classCallCheck(this, NodeUtils);
    }

    _createClass(NodeUtils, null, [{
        key: "addXVerbatimPropertyToLiterals",
        value: function addXVerbatimPropertyToLiterals(node) {
            estraverse.replace(node, {
                enter: function enter(node, parentNode) {
                    if (NodeUtils.isLiteralNode(node)) {
                        node['x-verbatim-property'] = node.raw;
                    }
                }
            });
        }
    }, {
        key: "appendNode",
        value: function appendNode(blockScopeBody, node) {
            if (!NodeUtils.validateNode(node)) {
                return;
            }
            blockScopeBody.push(node);
        }
    }, {
        key: "getBlockScopeNodeByIndex",
        value: function getBlockScopeNodeByIndex(node) {
            var index = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            if (NodeUtils.isNodeHasBlockScope(node) && node.body[index]) {
                return node.body[index];
            }
            return node;
        }
    }, {
        key: "getBlockScopeOfNode",
        value: function getBlockScopeOfNode(node) {
            var depth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            if (!node.parentNode) {
                throw new ReferenceError('`parentNode` property of given node is `undefined`');
            }
            if (node.parentNode.type === NodeType_1.NodeType.Program) {
                return node.parentNode;
            }
            if (!Utils_1.Utils.arrayContains(NodeUtils.scopeNodes, node.parentNode.type)) {
                return NodeUtils.getBlockScopeOfNode(node.parentNode, depth);
            }
            if (depth > 0) {
                return NodeUtils.getBlockScopeOfNode(node.parentNode, --depth);
            }
            if (node.type !== NodeType_1.NodeType.BlockStatement) {
                return NodeUtils.getBlockScopeOfNode(node.parentNode);
            }
            return node;
        }
    }, {
        key: "getProgramNode",
        value: function getProgramNode(bodyNode) {
            return {
                'type': NodeType_1.NodeType.Program,
                'body': bodyNode
            };
        }
    }, {
        key: "insertNodeAtIndex",
        value: function insertNodeAtIndex(blockScopeBody, node, index) {
            if (!NodeUtils.validateNode(node)) {
                return;
            }
            blockScopeBody.splice(index, 0, node);
        }
    }, {
        key: "isBlockStatementNode",
        value: function isBlockStatementNode(node) {
            return node.type === NodeType_1.NodeType.BlockStatement;
        }
    }, {
        key: "isIdentifierNode",
        value: function isIdentifierNode(node) {
            return node.type === NodeType_1.NodeType.Identifier;
        }
    }, {
        key: "isLiteralNode",
        value: function isLiteralNode(node) {
            return node.type === NodeType_1.NodeType.Literal;
        }
    }, {
        key: "isMemberExpressionNode",
        value: function isMemberExpressionNode(node) {
            return node.type === NodeType_1.NodeType.MemberExpression;
        }
    }, {
        key: "isNodeHasBlockScope",
        value: function isNodeHasBlockScope(node) {
            return node.hasOwnProperty('body');
        }
    }, {
        key: "isProgramNode",
        value: function isProgramNode(node) {
            return node.type === NodeType_1.NodeType.Program;
        }
    }, {
        key: "isPropertyNode",
        value: function isPropertyNode(node) {
            return node.type === NodeType_1.NodeType.Property;
        }
    }, {
        key: "isVariableDeclaratorNode",
        value: function isVariableDeclaratorNode(node) {
            return node.type === NodeType_1.NodeType.VariableDeclarator;
        }
    }, {
        key: "parentize",
        value: function parentize(node) {
            var isRootNode = true;
            estraverse.replace(node, {
                enter: function enter(node, parentNode) {
                    Object.defineProperty(node, 'parentNode', {
                        configurable: true,
                        enumerable: true,
                        value: isRootNode ? NodeUtils.getProgramNode([node]) : parentNode || node,
                        writable: true
                    });
                    isRootNode = false;
                }
            });
        }
    }, {
        key: "prependNode",
        value: function prependNode(blockScopeBody, node) {
            if (!NodeUtils.validateNode(node)) {
                return;
            }
            blockScopeBody.unshift(node);
        }
    }, {
        key: "validateNode",
        value: function validateNode(node) {
            return !!node;
        }
    }]);

    return NodeUtils;
}();

NodeUtils.scopeNodes = [NodeType_1.NodeType.ArrowFunctionExpression, NodeType_1.NodeType.FunctionDeclaration, NodeType_1.NodeType.FunctionExpression, NodeType_1.NodeType.MethodDefinition];
exports.NodeUtils = NodeUtils;
