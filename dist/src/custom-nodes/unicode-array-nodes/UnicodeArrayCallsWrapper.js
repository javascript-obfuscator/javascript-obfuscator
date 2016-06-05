"use strict";
const esprima = require('esprima');
const AppendState_1 = require("../../enums/AppendState");
const JSFuck_1 = require("../../enums/JSFuck");
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
        let code = '', environmentName = Utils_1.Utils.getRandomVariableName(), keyName = Utils_1.Utils.getRandomVariableName(), node;
        if (this.options['selfDefending']) {
            code = `
                var ${environmentName} = function(){return ${Utils_1.Utils.stringToUnicode('production')};};
                                                                          
                if (
                    ${keyName} % ${Utils_1.Utils.getRandomInteger(this.unicodeArray.length / 8, this.unicodeArray.length / 2)} === 0x0 &&
                    (
                        Function(${Utils_1.Utils.stringToUnicode(`return/\\w+ *\\(\\) *{\\w+ *['|"].+['|"];? *}/`)})()[${Utils_1.Utils.stringToUnicode('test')}](
                            ${environmentName}[${Utils_1.Utils.stringToUnicode('toString')}]()
                        ) === ${JSFuck_1.JSFuck.True} || ${keyName}++
                    )
                );
                
                return ${this.unicodeArrayName}[parseInt(${keyName}, 0x010)];
            `;
        }
        else {
            code = `return ${this.unicodeArrayName}[parseInt(${keyName}, 0x010)]`;
        }
        node = esprima.parse(`
            var ${this.unicodeArrayCallsWrapperName} = function (${keyName}) {
                ${code}
            };
        `);
        NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
        return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
exports.UnicodeArrayCallsWrapper = UnicodeArrayCallsWrapper;
