"use strict";
const esprima = require('esprima');
const AppendState_1 = require("../../enums/AppendState");
const NoCustomNodesPreset_1 = require("../../preset-options/NoCustomNodesPreset");
const JavaScriptObfuscator_1 = require("../../JavaScriptObfuscator");
const Node_1 = require('../Node');
const NodeUtils_1 = require("../../NodeUtils");
class SelfDefendingUnicodeNode extends Node_1.Node {
    constructor(options = {}) {
        super(options);
        this.appendState = AppendState_1.AppendState.AfterObfuscation;
        this.node = this.getNodeStructure();
    }
    appendNode(blockScopeNode) {
        NodeUtils_1.NodeUtils.prependNode(blockScopeNode.body, this.getNode());
    }
    getNodeStructure() {
        let node = esprima.parse(JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(`
               
            `, NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET));
        NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
        return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;
