"use strict";
const DebugProtectionFunctionCallNode_1 = require("../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode");
const DebugProtectionFunctionIntervalNode_1 = require("../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode");
const DebugProtectionFunctionNode_1 = require("../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode");
const NodesGroup_1 = require('./NodesGroup');
const Utils_1 = require('../Utils');
class DebugProtectionNodesGroup extends NodesGroup_1.NodesGroup {
    constructor(options = {}) {
        super(options);
        this.debugProtectionFunctionIdentifier = Utils_1.Utils.getRandomVariableName();
        this.nodes.set('debugProtectionFunctionNode', new DebugProtectionFunctionNode_1.DebugProtectionFunctionNode(this.debugProtectionFunctionIdentifier));
        this.nodes.set('debugProtectionFunctionCallNode', new DebugProtectionFunctionCallNode_1.DebugProtectionFunctionCallNode(this.debugProtectionFunctionIdentifier));
        if (this.options['debugProtectionInterval']) {
            this.nodes.set('debugProtectionFunctionIntervalNode', new DebugProtectionFunctionIntervalNode_1.DebugProtectionFunctionIntervalNode(this.debugProtectionFunctionIdentifier));
        }
    }
}
exports.DebugProtectionNodesGroup = DebugProtectionNodesGroup;
