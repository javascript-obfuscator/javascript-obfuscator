"use strict";
const estraverse = require('estraverse');
const NodeObfuscator_1 = require('./NodeObfuscator');
const NodeUtils_1 = require("../NodeUtils");
const Utils_1 = require('../Utils');
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
        this.replaceFunctionCalls(functionDeclarationNode);
    }
    replaceFunctionName(functionDeclarationNode) {
        estraverse.replace(functionDeclarationNode.id, {
            leave: (node) => {
                if (node.type !== 'Identifier') {
                    return estraverse.VisitorOption.Skip;
                }
                this.functionName.set(node.name, Utils_1.Utils.getRandomVariableName());
                node.name = this.functionName.get(node.name);
            }
        });
    }
    replaceFunctionCalls(functionDeclarationNode) {
        let scopeNode = NodeUtils_1.NodeUtils.getNodeScope(functionDeclarationNode);
        estraverse.replace(scopeNode, {
            enter: (node, parentNode) => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.functionName);
            }
        });
    }
}
exports.FunctionDeclarationObfuscator = FunctionDeclarationObfuscator;
