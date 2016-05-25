"use strict";
const escodegen = require('escodegen');
const NodeObfuscator_1 = require('./NodeObfuscator');
const NodeUtils_1 = require("../NodeUtils");
class LiteralObfuscator extends NodeObfuscator_1.NodeObfuscator {
    obfuscateNode(literalNode, parentNode) {
        if (NodeUtils_1.NodeUtils.isPropertyNode(parentNode) && parentNode.key === literalNode) {
            return;
        }
        if (literalNode['x-verbatim-property']) {
            return;
        }
        let content;
        switch (typeof literalNode.value) {
            case 'boolean':
                content = this.replaceLiteralBooleanByJSFuck(literalNode.value);
                break;
            case 'number':
                content = this.replaceLiteralNumberByHexadecimalValue(literalNode.value);
                break;
            case 'string':
                content = this.replaceLiteralStringByUnicodeArrayTranslatorCall(literalNode.value);
                break;
            default:
                return;
        }
        literalNode['x-verbatim-property'] = {
            content: content,
            precedence: escodegen.Precedence.Primary
        };
    }
}
exports.LiteralObfuscator = LiteralObfuscator;
