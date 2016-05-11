"use strict";
const NodeObfuscator_1 = require('./NodeObfuscator');
const Utils_1 = require('../Utils');
const NodeUtils_1 = require("../NodeUtils");
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
        this.replaceVariableCalls(variableDeclarationNode, parentNode);
    }
    replaceVariableName(variableDeclarationNode) {
        variableDeclarationNode.declarations.forEach((declarationNode) => {
            estraverse.replace(declarationNode, {
                enter: (node) => {
                    if (node.type !== 'VariableDeclarator') {
                        return;
                    }
                    estraverse.replace(node.id, {
                        enter: (node) => {
                            this.variableName.set(node.name, Utils_1.Utils.getRandomVariableName());
                            node.name = this.variableName.get(node.name);
                        }
                    });
                }
            });
        });
    }
    replaceVariableCalls(variableDeclarationNode, variableParentNode) {
        let scopeNode, statementNode;
        if (variableDeclarationNode.kind === 'var') {
            scopeNode = NodeUtils_1.NodeUtils.getParentNodeWithType(variableDeclarationNode, ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression', 'MethodDefinition']);
        }
        else {
            scopeNode = variableParentNode;
        }
        estraverse.replace(scopeNode, {
            enter: (node, parentNode) => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.variableName);
            }
        });
    }
}
exports.VariableDeclarationObfuscator = VariableDeclarationObfuscator;
