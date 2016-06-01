"use strict";
const estraverse = require('estraverse');
const NodeObfuscator_1 = require('./NodeObfuscator');
const NodeUtils_1 = require("../NodeUtils");
const Utils_1 = require("../Utils");
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
                    !Utils_1.Utils.arrayContains(this.ignoredNames, node.name) &&
                    methodDefinitionNode.computed === false) {
                    methodDefinitionNode.computed = true;
                    node.name = this.replaceLiteralValueByUnicodeValue(node.name);
                    return;
                }
                return estraverse.VisitorOption.Skip;
            }
        });
    }
}
exports.MethodDefinitionObfuscator = MethodDefinitionObfuscator;
