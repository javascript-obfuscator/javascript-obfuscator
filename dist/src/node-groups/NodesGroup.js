"use strict";
class NodesGroup {
    constructor(options = {}) {
        this.nodes = new Map();
        this.options = options;
    }
    getNodes() {
        return this.nodes;
    }
}
exports.NodesGroup = NodesGroup;
