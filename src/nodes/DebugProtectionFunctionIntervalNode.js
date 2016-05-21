"use strict";
const estraverse = require('estraverse');
const NodeType_1 = require('../enums/NodeType');
const Node_1 = require('./Node');
const NodeUtils_1 = require('../NodeUtils');
class DebugProtectionFunctionIntervalNode extends Node_1.Node {
    constructor(astTree, debugProtectionFunctionName) {
        super();
        this.astTree = astTree;
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.node = this.getNodeStructure();
    }
    appendNode() {
        estraverse.replace(this.astTree, {
            leave: (node, parent) => {
                if (NodeUtils_1.NodeUtils.isProgramNode(node)) {
                    node.body.push(this.getNode());
                    return estraverse.VisitorOption.Break;
                }
                return estraverse.VisitorOption.Skip;
            }
        });
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
