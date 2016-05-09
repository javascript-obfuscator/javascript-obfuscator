"use strict";
const NodeObfuscator_1 = require('./NodeObfuscator');
const Utils_1 = require('../Utils');
let estraverse = require('estraverse');
class FunctionDeclarationObfuscator extends NodeObfuscator_1.NodeObfuscator {
    constructor(...args) {
        super(...args);
        this.functionName = new Map();
    }
    obfuscateNode(functionDeclarationNode, parentNode) {
        if (parentNode.type === 'Program') {
            return;
        }
        this.replaceFunctionName(functionDeclarationNode);
        this.replaceFunctionCalls(parentNode);
    }
    replaceFunctionName(functionDeclarationNode) {
        estraverse.replace(functionDeclarationNode.id, {
            leave: (node) => {
                if (node.type !== 'Identifier') {
                    return;
                }
                this.functionName.set(node.name, Utils_1.Utils.getRandomVariableName());
                node.name = this.functionName.get(node.name);
            }
        });
    }
    replaceFunctionCalls(functionParentNode) {
        estraverse.replace(functionParentNode, {
            leave: (node, parentNode) => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.functionName);
            }
        });
    }
}
exports.FunctionDeclarationObfuscator = FunctionDeclarationObfuscator;
