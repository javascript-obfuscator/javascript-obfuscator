"use strict";
const AppendState_1 = require('../enums/AppendState');
class Node {
    constructor() {
        this.appendState = AppendState_1.AppendState.BeforeObfuscation;
    }
    getAppendState() {
        return this.appendState;
    }
    getNode() {
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
