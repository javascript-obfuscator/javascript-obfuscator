"use strict";
const JSFuck_1 = require("../enums/JSFuck");
const NodeUtils_1 = require("../NodeUtils");
const Utils_1 = require('../Utils');
class NodeObfuscator {
    constructor(nodes, options = {}) {
        this.nodes = nodes;
        this.options = options;
    }
    replaceNodeIdentifierByNewValue(node, parentNode, namesMap) {
        if (NodeUtils_1.NodeUtils.isIdentifierNode(node) && namesMap.has(node.name)) {
            const parentNodeIsAPropertyNode = (NodeUtils_1.NodeUtils.isPropertyNode(parentNode) &&
                parentNode.key === node), parentNodeIsAMemberExpressionNode = (NodeUtils_1.NodeUtils.isMemberExpressionNode(parentNode) &&
                parentNode.computed === false &&
                parentNode.property === node);
            if (parentNodeIsAPropertyNode || parentNodeIsAMemberExpressionNode) {
                return;
            }
            node.name = namesMap.get(node.name);
        }
    }
    replaceLiteralBooleanByJSFuck(nodeValue) {
        return nodeValue ? JSFuck_1.JSFuck.True : JSFuck_1.JSFuck.False;
    }
    replaceLiteralNumberByHexadecimalValue(nodeValue) {
        const prefix = '0x';
        if (!Utils_1.Utils.isInteger(nodeValue)) {
            return String(nodeValue);
        }
        return `${prefix}${Utils_1.Utils.decToHex(nodeValue)}`;
    }
    replaceLiteralStringByUnicodeArrayCall(nodeValue) {
        let value = Utils_1.Utils.stringToUnicode(nodeValue), unicodeArray = this.nodes.get('unicodeArrayNode').getNodeData(), sameIndex = unicodeArray.indexOf(value), index, hexadecimalIndex;
        if (sameIndex < 0) {
            index = unicodeArray.length;
            unicodeArray.push(Utils_1.Utils.stringToUnicode(nodeValue));
        }
        else {
            index = sameIndex;
        }
        hexadecimalIndex = this.replaceLiteralNumberByHexadecimalValue(index);
        if (this.options['wrapUnicodeArrayCalls']) {
            return `${this.nodes.get('unicodeArrayCallsWrapper').getNodeIdentifier()}('${hexadecimalIndex}')`;
        }
        return `${this.nodes.get('unicodeArrayNode').getNodeIdentifier()}[${hexadecimalIndex}]`;
    }
}
exports.NodeObfuscator = NodeObfuscator;
