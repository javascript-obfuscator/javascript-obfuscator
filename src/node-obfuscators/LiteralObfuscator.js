"use strict";
const escodegen = require('escodegen');
const NodeObfuscator_1 = require('./NodeObfuscator');
const NodeUtils_1 = require("../NodeUtils");
class LiteralObfuscator extends NodeObfuscator_1.NodeObfuscator {
    obfuscateNode(literalNode, parentNode) {
        if (NodeUtils_1.NodeUtils.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return;
        }
        switch (typeof literalNode.value) {
            case 'string':
                if (literalNode['x-verbatim-property']) {
                    break;
                }
                literalNode['x-verbatim-property'] = {
                    content: this.replaceLiteralStringByArrayElement(literalNode.value),
                    precedence: escodegen.Precedence.Primary
                };
                break;
            default:
                break;
        }
    }
}
exports.LiteralObfuscator = LiteralObfuscator;
