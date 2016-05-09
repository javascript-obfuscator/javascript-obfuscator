"use strict";
const NodeObfuscator_1 = require('./NodeObfuscator');
const Utils_1 = require('../Utils');
let estraverse = require('estraverse');
class VariableDeclarationObfuscator extends NodeObfuscator_1.NodeObfuscator {
    constructor(...args) {
        super(...args);
        this.variableName = new Map();
    }
    obfuscateNode(variableDeclarationNode, parentNode) {
        if (parentNode.type === 'Program') {
            return;
        }
        this.replaceVariableName(variableDeclarationNode);
        this.replaceVariableCalls(parentNode);
    }
    replaceVariableName(variableDeclarationNode) {
        variableDeclarationNode.declarations.forEach((declarationNode) => {
            estraverse.replace(declarationNode, {
                leave: (node) => {
                    if (node.type !== 'VariableDeclarator') {
                        return;
                    }
                    estraverse.replace(node.id, {
                        leave: (node) => {
                            this.variableName.set(node.name, Utils_1.Utils.getRandomVariableName());
                            node.name = this.variableName.get(node.name);
                        }
                    });
                }
            });
        });
    }
    replaceVariableCalls(variableParentNode) {
        estraverse.replace(variableParentNode, {
            leave: (node, parentNode) => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.variableName);
            }
        });
    }
}
exports.VariableDeclarationObfuscator = VariableDeclarationObfuscator;
