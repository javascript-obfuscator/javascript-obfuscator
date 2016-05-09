"use strict";
const NodeObfuscator_1 = require('./NodeObfuscator');
const Utils_1 = require('../Utils');
let estraverse = require('estraverse');
class FunctionObfuscator extends NodeObfuscator_1.NodeObfuscator {
    constructor(...args) {
        super(...args);
        this.functionParams = new Map();
    }
    obfuscateNode(functionNode) {
        this.replaceFunctionParams(functionNode);
        this.replaceFunctionParamsInBody(functionNode);
    }
    replaceFunctionParams(functionNode) {
        functionNode.params.forEach((paramsNode) => {
            estraverse.replace(paramsNode, {
                leave: (node, parentNode) => {
                    if (node.type !== 'Identifier') {
                        return;
                    }
                    this.functionParams.set(node.name, Utils_1.Utils.getRandomVariableName());
                    node.name = this.functionParams.get(node.name);
                }
            });
        });
    }
    replaceFunctionParamsInBody(functionNode) {
        estraverse.replace(functionNode.body, {
            leave: (node, parentNode) => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.functionParams);
            }
        });
    }
}
exports.FunctionObfuscator = FunctionObfuscator;
//# sourceMappingURL=FunctionObfuscator.js.map