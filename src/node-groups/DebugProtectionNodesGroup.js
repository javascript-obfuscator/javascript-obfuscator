"use strict";
const estraverse = require('estraverse');
const DebugProtectionFunctionCallNode_1 = require("../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode");
const DebugProtectionFunctionIntervalNode_1 = require("../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode");
const DebugProtectionFunctionNode_1 = require("../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode");
const NodesGroup_1 = require('./NodesGroup');
const NodeUtils_1 = require("../NodeUtils");
const Utils_1 = require('../Utils');
class DebugProtectionNodesGroup extends NodesGroup_1.NodesGroup {
    constructor(options) {
        super();
        this.debugProtectionFunctionIdentifier = Utils_1.Utils.getRandomVariableName();
        this.options = options;
        this.debugProtectionFunctionIndex = this.getDebugProtectionFunctionIndex();
        this.nodes = new Map([
            [
                'debugProtectionFunctionNode',
                new DebugProtectionFunctionNode_1.DebugProtectionFunctionNode(this.debugProtectionFunctionIdentifier)
            ],
            [
                'debugProtectionFunctionCallNode',
                new DebugProtectionFunctionCallNode_1.DebugProtectionFunctionCallNode(this.debugProtectionFunctionIdentifier)
            ]
        ]);
        if (this.options['debugProtectionInterval']) {
            this.nodes.set('debugProtectionFunctionIntervalNode', new DebugProtectionFunctionIntervalNode_1.DebugProtectionFunctionIntervalNode(this.debugProtectionFunctionIdentifier));
        }
    }
    getDebugProtectionFunctionIndex() {
        let randomIndex;
        estraverse.replace(this.astTree, {
            leave: (node, parent) => {
                if (NodeUtils_1.NodeUtils.isProgramNode(node)) {
                    let programBodyLength = node.body.length;
                    randomIndex = Utils_1.Utils.getRandomInteger(0, programBodyLength);
                    return estraverse.VisitorOption.Break;
                }
                return estraverse.VisitorOption.Skip;
            }
        });
        return randomIndex;
    }
}
exports.DebugProtectionNodesGroup = DebugProtectionNodesGroup;
