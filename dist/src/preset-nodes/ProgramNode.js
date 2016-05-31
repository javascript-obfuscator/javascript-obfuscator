"use strict";
const NodeType_1 = require("../enums/NodeType");
function getProgramNode(bodyNode) {
    return {
        'type': NodeType_1.NodeType.Program,
        'body': bodyNode
    };
}
exports.getProgramNode = getProgramNode;
