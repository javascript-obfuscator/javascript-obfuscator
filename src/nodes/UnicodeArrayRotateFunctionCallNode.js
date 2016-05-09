"use strict";
const Node_1 = require('./Node');
let estraverse = require('estraverse');
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
                    case 'Program':
                        node.body.unshift(this.getNode());
                        break;
                }
            }
        });
    }
    getNodeStructure() {
        return {
            'type': 'ExpressionStatement',
            'expression': {
                'type': 'CallExpression',
                'callee': {
                    'type': 'Identifier',
                    'name': this.unicodeArrayRotateFunctionName
                },
                'arguments': [
                    {
                        'type': 'Identifier',
                        'name': this.unicodeArrayName
                    },
                    {
                        'type': 'Literal',
                        'value': this.unicodeArrayRotateValue,
                        'raw': `'${this.unicodeArrayRotateValue}'`
                    },
                    {
                        'type': 'Literal',
                        'value': true,
                        'raw': 'true'
                    }
                ]
            }
        };
    }
}
exports.UnicodeArrayRotateFunctionCallNode = UnicodeArrayRotateFunctionCallNode;
