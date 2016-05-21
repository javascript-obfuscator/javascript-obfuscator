"use strict";
const estraverse = require('estraverse');
const NodeType_1 = require("../enums/NodeType");
const Node_1 = require('./Node');
class UnicodeArrayRotateFunctionCallNode extends Node_1.Node {
    constructor(astTree, unicodeArrayRotateFunctionName, unicodeArrayName, unicodeArrayRotateValue) {
        super();
        this.astTree = astTree;
        this.unicodeArrayRotateFunctionName = unicodeArrayRotateFunctionName;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        this.node = this.getNodeStructure();
    }
    appendNode() {
        estraverse.replace(this.astTree, {
            leave: (node, parent) => {
                switch (node.type) {
                    case NodeType_1.NodeType.Program:
                        node.body.unshift(this.getNode());
                        break;
                    default:
                        break;
                }
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
                    'name': this.unicodeArrayRotateFunctionName
                },
                'arguments': [
                    {
                        'type': NodeType_1.NodeType.Identifier,
                        'name': this.unicodeArrayName
                    },
                    {
                        'type': NodeType_1.NodeType.Literal,
                        'value': this.unicodeArrayRotateValue,
                        'raw': `'${this.unicodeArrayRotateValue}'`
                    },
                    {
                        'type': NodeType_1.NodeType.Literal,
                        'value': true,
                        'raw': 'true'
                    }
                ]
            }
        };
    }
}
exports.UnicodeArrayRotateFunctionCallNode = UnicodeArrayRotateFunctionCallNode;
