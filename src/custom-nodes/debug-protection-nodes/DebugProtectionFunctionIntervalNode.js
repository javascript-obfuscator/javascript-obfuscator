"use strict";
const NodeType_1 = require('../../enums/NodeType');
const Node_1 = require('../Node');
const NodeUtils_1 = require('../../NodeUtils');
class DebugProtectionFunctionIntervalNode extends Node_1.Node {
    constructor(debugProtectionFunctionName) {
        super();
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
                    'name': 'setInterval'
                },
                'arguments': [
                    {
                        'type': NodeType_1.NodeType.FunctionExpression,
                        'id': null,
                        'params': [],
                        'defaults': [],
                        'body': {
                            'type': NodeType_1.NodeType.BlockStatement,
                            'body': [
                                {
                                    'type': NodeType_1.NodeType.ExpressionStatement,
                                    'expression': {
                                        'type': NodeType_1.NodeType.CallExpression,
                                        'callee': {
                                            'type': NodeType_1.NodeType.Identifier,
                                            'name': this.debugProtectionFunctionName
                                        },
                                        'arguments': []
                                    }
                                }
                            ]
                        },
                        'generator': false,
                        'expression': false
                    },
                    {
                        'type': NodeType_1.NodeType.Literal,
                        'value': 4000,
                        'raw': '4000'
                    }
                ]
            }
        };
    }
}
exports.DebugProtectionFunctionIntervalNode = DebugProtectionFunctionIntervalNode;
