"use strict";
const esprima = require('esprima');
const AppendState_1 = require("../../enums/AppendState");
const JSFuck_1 = require("../../enums/JSFuck");
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
            randomIndex = Utils_1.Utils.getRandomInteger(programBodyLength / 2, programBodyLength - 1);
        }
        NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
    }
    getNodeStructure() {
        let node = esprima.parse(JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate(`
                (function () {                                
                    var func = function(){return ${Utils_1.Utils.stringToUnicode('dev')};},
                        func2 = function () {
                            return 'window';
                        };
                
                    !Function(${Utils_1.Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})().test(func.toString()) ? Function(${Utils_1.Utils.stringToUnicode(`return/(\\\\[x|u](\\w){2,4})+/`)})().test(func2.toString()) ? []['filter']['constructor'](${Utils_1.Utils.stringToJSFuck('while')} + '(${JSFuck_1.JSFuck.False}){}')() : []['filter']['constructor'](${Utils_1.Utils.stringToJSFuck('while')} + '(${JSFuck_1.JSFuck.True}){}')() : []['filter']['constructor'](${Utils_1.Utils.stringToJSFuck('while')} + '(${JSFuck_1.JSFuck.False}){}')();
                })();
            `, NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET));
        NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
        return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;
