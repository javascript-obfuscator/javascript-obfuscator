"use strict";
const estraverse = require('estraverse');
const NodeObfuscator_1 = require('./NodeObfuscator');
const NodeUtils_1 = require("../NodeUtils");
const Utils_1 = require('../Utils');
class VariableDeclarationObfuscator extends NodeObfuscator_1.NodeObfuscator {
    constructor(...args) {
        super(...args);
        this.variableNames = new Map();
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
                    if (NodeUtils_1.NodeUtils.isVariableDeclaratorNode(node)) {
                        estraverse.replace(node.id, {
                            enter: (node) => {
                                this.variableNames.set(node.name, Utils_1.Utils.getRandomVariableName());
                                node.name = this.variableNames.get(node.name);
                            }
                        });
                        return;
                    }
                    return estraverse.VisitorOption.Skip;
                }
            });
        });
    }
    replaceVariableCalls(variableDeclarationNode, variableParentNode) {
        let scopeNode;
        if (variableDeclarationNode.kind === 'var') {
            scopeNode = NodeUtils_1.NodeUtils.getNodeScope(variableDeclarationNode);
        }
        else {
            scopeNode = variableParentNode;
        }
        let isNodeAfterVariableDeclaratorFlag = false, isNodeBeforeVariableDeclaratorFlag = true, functionParentScope, functionNextNode, functionIndex = -1;
        estraverse.replace(scopeNode, {
            enter: (node, parentNode) => {
                if (node.type === 'FunctionDeclaration' ||
                    node.type === 'FunctionExpression' ||
                    node.type === 'ArrowFunctionExpression') {
                    functionParentScope = NodeUtils_1.NodeUtils.getNodeScope(node);
                    if (NodeUtils_1.NodeUtils.isBlockStatementNode(functionParentScope)) {
                        functionIndex = functionParentScope.body.indexOf(node);
                        if (functionIndex >= 0) {
                            functionNextNode = functionParentScope.body[functionIndex + 1];
                        }
                    }
                    isNodeAfterVariableDeclaratorFlag = true;
                }
                if (functionNextNode && isNodeBeforeVariableDeclaratorFlag && node === functionNextNode) {
                    isNodeAfterVariableDeclaratorFlag = false;
                    functionNextNode = undefined;
                    functionIndex = -1;
                }
                if (node === variableDeclarationNode) {
                    isNodeAfterVariableDeclaratorFlag = true;
                    isNodeBeforeVariableDeclaratorFlag = false;
                }
                if (isNodeAfterVariableDeclaratorFlag) {
                    this.replaceNodeIdentifierByNewValue(node, parentNode, this.variableNames);
                }
            }
        });
    }
}
exports.VariableDeclarationObfuscator = VariableDeclarationObfuscator;
