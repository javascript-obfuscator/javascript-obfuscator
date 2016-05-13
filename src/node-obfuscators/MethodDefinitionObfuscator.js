"use strict";
const estraverse = require('estraverse');
const NodeObfuscator_1 = require('./NodeObfuscator');
class MethodDefinitionObfuscator extends NodeObfuscator_1.NodeObfuscator {
    constructor(...args) {
        super(...args);
        this.methodName = new Map();
        this.ignoredNames = ['constructor'];
    }
    obfuscateNode(methodDefinitionNode, parentNode) {
        this.replaceMethodName(methodDefinitionNode);
    }
    replaceMethodName(methodDefinitionNode) {
        estraverse.replace(methodDefinitionNode.key, {
            leave: (node) => {
                if (node.type !== 'Identifier' ||
                    this.ignoredNames.indexOf(node.name) >= 0 ||
                    methodDefinitionNode.computed === true) {
                    return estraverse.VisitorOption.Skip;
                }
                methodDefinitionNode.computed = true;
                node.name = this.replaceLiteralStringByArrayElement(node.name);
            }
        });
    }
}
exports.MethodDefinitionObfuscator = MethodDefinitionObfuscator;
