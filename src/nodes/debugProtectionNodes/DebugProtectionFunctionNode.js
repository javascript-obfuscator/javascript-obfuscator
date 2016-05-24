"use strict";
const esprima = require('esprima');
const estraverse = require('estraverse');
const Node_1 = require('../Node');
const NodeUtils_1 = require('../../NodeUtils');
class DebugProtectionFunctionNode extends Node_1.Node {
    constructor(astTree, debugProtectionFunctionName, debugProtectionFunctionIndex) {
        super();
        this.astTree = astTree;
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.debugProtectionFunctionIndex = debugProtectionFunctionIndex;
        this.node = this.getNodeStructure();
    }
    appendNode() {
        estraverse.replace(this.astTree, {
            leave: (node, parent) => {
                if (NodeUtils_1.NodeUtils.isProgramNode(node)) {
                    NodeUtils_1.NodeUtils.insertNodeAtIndex(node.body, this.getNode(), this.debugProtectionFunctionIndex);
                    return estraverse.VisitorOption.Break;
                }
                return estraverse.VisitorOption.Skip;
            }
        });
    }
    getNodeIdentifier() {
        return this.debugProtectionFunctionName;
    }
    getNodeStructure() {
        return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(esprima.parse(`
                var ${this.debugProtectionFunctionName} = function () {
                    function debuggerProtection (counter) {
                        if (('' + counter / counter)['length'] !== 1 || counter % 20 === 0) {
                            (function () {}.constructor('debugger')());
                        } else {
                            [].filter.constructor((undefined + '')[2] + (!![] + '')[3] + (Function('return{}')() + '')[2] + (undefined + '')[0] + (![] + [0] + String)[20] + (![] + [0] + String)[20] + (!![] + '')[3] + (!![] + '')[1])();
                        }
                        
                        debuggerProtection(++counter);
                    }
                    
                    try {
                        debuggerProtection(0);
                    } catch (y) {}
                };
            `));
    }
}
exports.DebugProtectionFunctionNode = DebugProtectionFunctionNode;
