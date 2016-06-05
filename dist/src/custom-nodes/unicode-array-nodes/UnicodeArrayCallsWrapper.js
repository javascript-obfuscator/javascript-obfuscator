"use strict";
const esprima = require('esprima');
const AppendState_1 = require("../../enums/AppendState");
const Node_1 = require('../Node');
const NodeUtils_1 = require("../../NodeUtils");
const Utils_1 = require("../../Utils");
class UnicodeArrayCallsWrapper extends Node_1.Node {
    constructor(unicodeArrayCallsWrapperName, unicodeArrayName, unicodeArray, options = {}) {
        super(options);
        this.appendState = AppendState_1.AppendState.AfterObfuscation;
        this.unicodeArrayCallsWrapperName = unicodeArrayCallsWrapperName;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.node = this.getNodeStructure();
    }
    appendNode(blockScopeNode) {
        NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }
    getNodeIdentifier() {
        return this.unicodeArrayCallsWrapperName;
    }
    ;
    getNode() {
        if (!this.unicodeArray.length) {
            return;
        }
        this.updateNode();
        return super.getNode();
    }
    getNodeStructure() {
        let keyName = Utils_1.Utils.getRandomVariableName(), node;
        node = esprima.parse(`
            var ${this.unicodeArrayCallsWrapperName} = function (${keyName}) {
                return ${this.unicodeArrayName}[parseInt(${keyName}, 0x010)];
            };
        `);
        NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
        return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
exports.UnicodeArrayCallsWrapper = UnicodeArrayCallsWrapper;
