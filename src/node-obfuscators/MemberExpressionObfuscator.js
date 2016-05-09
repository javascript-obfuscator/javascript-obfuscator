"use strict";
const NodeObfuscator_1 = require('./NodeObfuscator');
let escodegen = require('escodegen'), estraverse = require('estraverse');
class MemberExpressionObfuscator extends NodeObfuscator_1.NodeObfuscator {
    obfuscateNode(memberExpressionNode) {
        estraverse.replace(memberExpressionNode.property, {
            leave: (node, parentNode) => {
                switch (node.type) {
                    case 'Literal':
                        this.literalNodeController(node);
                        break;
                    case 'Identifier':
                        if (memberExpressionNode.computed) {
                            break;
                        }
                        memberExpressionNode.computed = true;
                        this.identifierNodeController(node);
                        break;
                }
            }
        });
    }
    identifierNodeController(node) {
        let nodeValue = node['name'];
        node['type'] = 'Literal';
        node['value'] = nodeValue;
        node['raw'] = `'${nodeValue}'`;
        node['x-verbatim-property'] = {
            content: this.replaceLiteralStringByArrayElement(nodeValue),
            precedence: escodegen['Precedence']['Primary']
        };
        delete node['name'];
    }
    literalNodeController(node) {
        switch (typeof node.value) {
            case 'string':
                if (node['x-verbatim-property']) {
                    break;
                }
                node['x-verbatim-property'] = {
                    content: this.replaceLiteralStringByArrayElement(node.value),
                    precedence: escodegen['Precedence']['Primary']
                };
                break;
        }
    }
}
exports.MemberExpressionObfuscator = MemberExpressionObfuscator;
