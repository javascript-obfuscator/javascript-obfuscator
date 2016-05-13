"use strict";
const estraverse = require('estraverse');
const NodeObfuscator_1 = require('./NodeObfuscator');
const NodeUtils_1 = require("../NodeUtils");
class MethodDefinitionObfuscator extends NodeObfuscator_1.NodeObfuscator {
    constructor(...args) {
        super(...args);
        this.ignoredNames = ['constructor'];
    }
    obfuscateNode(methodDefinitionNode, parentNode) {
        this.replaceMethodName(methodDefinitionNode);
    }
    replaceMethodName(methodDefinitionNode) {
        estraverse.replace(methodDefinitionNode.key, {
            leave: (node) => {
                if (NodeUtils_1.NodeUtils.isIdentifierNode(node) &&
                    this.ignoredNames.indexOf(node.name) < 0 &&
                    methodDefinitionNode.computed === false) {
                    methodDefinitionNode.computed = true;
                    node.name = this.replaceLiteralStringByArrayElement(node.name);
                }
                return estraverse.VisitorOption.Skip;
            }
        });
    }
}
exports.MethodDefinitionObfuscator = MethodDefinitionObfuscator;
