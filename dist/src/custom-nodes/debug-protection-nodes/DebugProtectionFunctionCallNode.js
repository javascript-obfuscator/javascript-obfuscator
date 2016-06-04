"use strict";
const NodeType_1 = require("../../enums/NodeType");
const Node_1 = require('../Node');
const NodeUtils_1 = require("../../NodeUtils");
class DebugProtectionFunctionCallNode extends Node_1.Node {
    constructor(debugProtectionFunctionName, options = {}) {
        super(options);
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.node = this.getNodeStructure();
    }
    appendNode(blockScopeNode) {
        NodeUtils_1.NodeUtils.appendNode(blockScopeNode.body, this.getNode());
    }
    getNodeStructure() {
        return {
            'type': NodeType_1.NodeType.ExpressionStatement,
            'expression': {
                'type': NodeType_1.NodeType.CallExpression,
                'callee': {
                    'type': NodeType_1.NodeType.Identifier,
                    'name': this.debugProtectionFunctionName
                },
                'arguments': []
            }
        };
    }
}
exports.DebugProtectionFunctionCallNode = DebugProtectionFunctionCallNode;
