"use strict";
const esprima = require('esprima');
const AppendState_1 = require("../../enums/AppendState");
const NoCustomNodesPreset_1 = require("../../preset-options/NoCustomNodesPreset");
const JavaScriptObfuscator_1 = require("../../JavaScriptObfuscator");
const Node_1 = require('../Node');
const NodeUtils_1 = require("../../NodeUtils");
const Utils_1 = require("../../Utils");
class SelfDefendingUnicodeNode extends Node_1.Node {
    constructor(options = {}) {
        super(options);
        this.appendState = AppendState_1.AppendState.AfterObfuscation;
        this.node = this.getNodeStructure();
    }
    appendNode(blockScopeNode) {
        let programBodyLength = blockScopeNode.body.length, randomIndex = 0;
        if (programBodyLength > 2) {
            randomIndex = Utils_1.Utils.getRandomInteger(programBodyLength, programBodyLength / 2);
        }
        NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
    }
    getNodeStructure() {
        let node = esprima.parse(JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(`
                (function () {                                
                    var func = function () {
                        return '\x77\x69\x6e\x64\x6f\x77';
                    };
                                        
                    if (
                        !/(\\\\\[x|u](\\w){2,4})+/.test(func.toString())
                    ) {
                        console.log('LOL');
                    }
                })();
            `, NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET));
        NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
        return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;
