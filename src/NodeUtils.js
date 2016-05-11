"use strict";
class NodeUtils {
    static getParentNodeWithType(node, types, limitNodeTypes = [], deep = 0) {
        if (node.parentNode.type === 'Program' || limitNodeTypes.indexOf(node.parentNode.type) >= 0) {
            return node.parentNode;
        }
        if (types.indexOf(node.parentNode.type) < 0) {
            return NodeUtils.getParentNodeWithType(node.parentNode, types, limitNodeTypes, deep);
        }
        if (deep > 0) {
            return NodeUtils.getParentNodeWithType(node.parentNode, types, limitNodeTypes, --deep);
        }
        return node.parentNode;
    }
}
exports.NodeUtils = NodeUtils;
