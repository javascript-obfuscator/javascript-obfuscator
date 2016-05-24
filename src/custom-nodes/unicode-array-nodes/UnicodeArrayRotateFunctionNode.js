"use strict";
const esprima = require('esprima');
const AppendState_1 = require("../../enums/AppendState");
const Node_1 = require('../Node');
const NodeUtils_1 = require("../../NodeUtils");
const Utils_1 = require("../../Utils");
class UnicodeArrayRotateFunctionNode extends Node_1.Node {
    constructor(unicodeArrayName, unicodeArray, unicodeArrayRotateValue) {
        super();
        this.appendState = AppendState_1.AppendState.AfterObfuscation;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        this.node = this.getNodeStructure();
    }
    appendNode(blockScopeNode) {
        NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 0);
    }
    getNode() {
        if (!this.unicodeArray.length) {
            return;
        }
        return super.getNode();
    }
    getNodeStructure() {
        let arrayName = Utils_1.Utils.getRandomVariableName(), timesName = Utils_1.Utils.getRandomVariableName(), tempArrayName = Utils_1.Utils.getRandomVariableName(), node = esprima.parse(`
                (function (${arrayName}, ${timesName}) {
                    if (${timesName} < 0x${Utils_1.Utils.decToHex(0)}) {
                        return;
                    }

                    var ${tempArrayName};

                    while (${timesName}--) {
                        ${tempArrayName} = ${arrayName}[${Utils_1.Utils.stringToUnicode('shift')}]();
                        ${arrayName}[${Utils_1.Utils.stringToUnicode('push')}](${tempArrayName});
                    }
                })(${this.unicodeArrayName}, 0x${Utils_1.Utils.decToHex(this.unicodeArrayRotateValue)});
            `);
        NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
        return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
exports.UnicodeArrayRotateFunctionNode = UnicodeArrayRotateFunctionNode;
