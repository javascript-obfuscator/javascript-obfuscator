"use strict";
const NodeUtils_1 = require("../NodeUtils");
const Utils_1 = require('../Utils');
class NodeObfuscator {
    constructor(nodes) {
        this.nodes = nodes;
    }
    replaceNodeIdentifierByNewValue(node, parentNode, namesMap) {
        if (NodeUtils_1.NodeUtils.isIdentifierNode(node) && namesMap.has(node.name)) {
            if ((NodeUtils_1.NodeUtils.isPropertyNode(parentNode) && parentNode.key === node) ||
                (NodeUtils_1.NodeUtils.isMemberExpressionNode(parentNode) && parentNode.computed === false && parentNode.property === node)) {
                return;
            }
            node.name = namesMap.get(node.name);
        }
    }
    replaceLiteralNumberByHexadecimalValue(nodeValue) {
        const prefix = '0x';
        return `${prefix}${Utils_1.Utils.decToHex(nodeValue)}`;
    }
    replaceLiteralStringByArrayElement(nodeValue) {
        let value = Utils_1.Utils.stringToUnicode(nodeValue), unicodeArray = this.nodes.get('unicodeArrayNode').getNodeData(), sameIndex = unicodeArray.indexOf(value), index;
        if (sameIndex < 0) {
            index = unicodeArray.length;
            unicodeArray.push(Utils_1.Utils.stringToUnicode(nodeValue));
        }
        else {
            index = sameIndex;
        }
        return `${this.nodes.get('unicodeArrayNode').getNodeIdentifier()}[${index}]`;
    }
}
exports.NodeObfuscator = NodeObfuscator;
