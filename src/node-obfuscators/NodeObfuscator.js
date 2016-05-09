"use strict";
const Utils_1 = require('../Utils');
class NodeObfuscator {
    constructor(nodes) {
        this.nodes = nodes;
    }
    replaceNodeIdentifierByNewValue(node, parentNode, namesMap) {
        if (node.type === 'Identifier' && namesMap.has(node.name)) {
            if ((parentNode.type === 'Property' && parentNode.key === node) ||
                (parentNode.type === 'MemberExpression' && parentNode.computed === false && parentNode.property === node)) {
                return;
            }
            node.name = namesMap.get(node.name);
        }
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
//# sourceMappingURL=NodeObfuscator.js.map