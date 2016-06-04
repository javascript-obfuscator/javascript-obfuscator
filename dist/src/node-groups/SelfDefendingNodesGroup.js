"use strict";
const NodesGroup_1 = require('./NodesGroup');
const SelfDefendingUnicodeNode_1 = require("../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode");
class SelfDefendingNodesGroup extends NodesGroup_1.NodesGroup {
    constructor(options = {}) {
        super(options);
        this.nodes.set('selfDefendingUnicodeNode', new SelfDefendingUnicodeNode_1.SelfDefendingUnicodeNode(this.options));
    }
}
exports.SelfDefendingNodesGroup = SelfDefendingNodesGroup;
