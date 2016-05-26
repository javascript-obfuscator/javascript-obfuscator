"use strict";
const AppendState_1 = require('../enums/AppendState');
const NodeUtils_1 = require("../NodeUtils");
class Node {
    constructor() {
        this.appendState = AppendState_1.AppendState.BeforeObfuscation;
    }
    getAppendState() {
        return this.appendState;
    }
    getNode() {
        NodeUtils_1.NodeUtils.parentize(this.node);
        return this.node;
    }
    setNode(node) {
        this.node = node;
    }
    updateNode() {
        this.node = this.getNodeStructure();
    }
}
exports.Node = Node;
