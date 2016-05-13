"use strict";
const escodegen = require('escodegen');
const estraverse = require('estraverse');
const NodeObfuscator_1 = require('./NodeObfuscator');
const Utils_1 = require('../Utils');
class ObjectExpressionObfuscator extends NodeObfuscator_1.NodeObfuscator {
    obfuscateNode(objectExpressionNode) {
        objectExpressionNode.properties.forEach((property) => {
            estraverse.replace(property.key, {
                leave: (node, parentNode) => {
                    switch (node.type) {
                        case 'Literal':
                            this.literalNodeController(node);
                            break;
                        case 'Identifier':
                            this.identifierNodeController(node);
                            break;
                    }
                }
            });
        });
    }
    literalNodeController(node) {
        switch (typeof node.value) {
            case 'string':
                if (node['x-verbatim-property']) {
                    break;
                }
                node['x-verbatim-property'] = {
                    content: Utils_1.Utils.stringToUnicode(node.value),
                    precedence: escodegen.Precedence.Primary
                };
                break;
        }
    }
    identifierNodeController(node) {
        let nodeValue = node['name'];
        node['type'] = 'Literal';
        node['value'] = nodeValue;
        node['raw'] = `'${nodeValue}'`;
        node['x-verbatim-property'] = {
            content: Utils_1.Utils.stringToUnicode(nodeValue),
            precedence: escodegen['Precedence']['Primary']
        };
        delete node['name'];
    }
}
exports.ObjectExpressionObfuscator = ObjectExpressionObfuscator;
