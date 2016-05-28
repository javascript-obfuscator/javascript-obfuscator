"use strict";
const escodegen = require('escodegen');
const estraverse = require('estraverse');
const NodeType_1 = require("../enums/NodeType");
const NodeObfuscator_1 = require('./NodeObfuscator');
const NodeUtils_1 = require("../NodeUtils");
class MemberExpressionObfuscator extends NodeObfuscator_1.NodeObfuscator {
    obfuscateNode(memberExpressionNode) {
        estraverse.replace(memberExpressionNode.property, {
            leave: (node, parentNode) => {
                if (NodeUtils_1.NodeUtils.isLiteralNode(node)) {
                    this.literalNodeController(node);
                    return;
                }
                if (NodeUtils_1.NodeUtils.isIdentifierNode(node)) {
                    if (memberExpressionNode.computed) {
                        return;
                    }
                    memberExpressionNode.computed = true;
                    this.identifierNodeController(node);
                }
            }
        });
    }
    identifierNodeController(node) {
        let nodeValue = node.name, literalNode = {
            raw: `'${nodeValue}'`,
            'x-verbatim-property': {
                content: this.replaceLiteralStringByUnicodeArrayCall(nodeValue),
                precedence: escodegen.Precedence.Primary
            },
            type: NodeType_1.NodeType.Literal,
            value: nodeValue
        };
        delete node.name;
        Object.assign(node, literalNode);
    }
    literalNodeController(node) {
        switch (typeof node.value) {
            case 'string':
                if (node['x-verbatim-property']) {
                    break;
                }
                node['x-verbatim-property'] = {
                    content: this.replaceLiteralStringByUnicodeArrayCall(node.value),
                    precedence: escodegen.Precedence.Primary
                };
                break;
            default:
                break;
        }
    }
}
exports.MemberExpressionObfuscator = MemberExpressionObfuscator;
