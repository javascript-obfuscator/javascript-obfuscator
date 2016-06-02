"use strict";
const estraverse = require('estraverse');
const NodeType_1 = require("../enums/NodeType");
const NodeObfuscator_1 = require('./NodeObfuscator');
const NodeUtils_1 = require("../NodeUtils");
const Utils_1 = require('../Utils');
class VariableDeclarationObfuscator extends NodeObfuscator_1.NodeObfuscator {
    constructor(...args) {
        super(...args);
        this.variableNames = new Map();
    }
    obfuscateNode(variableDeclarationNode, parentNode) {
        if (parentNode.type === NodeType_1.NodeType.Program) {
            return;
        }
        this.replaceVariableName(variableDeclarationNode);
        this.replaceVariableCalls(variableDeclarationNode, parentNode);
    }
    replaceVariableName(variableDeclarationNode) {
        variableDeclarationNode.declarations.forEach((declarationNode) => {
            estraverse.replace(declarationNode.id, {
                enter: (node) => {
                    if (NodeUtils_1.NodeUtils.isIdentifierNode(node) && !this.isReservedName(node.name)) {
                        this.variableNames.set(node.name, Utils_1.Utils.getRandomVariableName());
                        node.name = this.variableNames.get(node.name);
                        return;
                    }
                    return estraverse.VisitorOption.Skip;
                }
            });
        });
    }
    replaceVariableCalls(variableDeclarationNode, variableParentNode) {
        let scopeNode;
        scopeNode = variableDeclarationNode.kind === 'var' ? NodeUtils_1.NodeUtils.getBlockScopeOfNode(variableDeclarationNode) : variableParentNode;
        let isNodeAfterVariableDeclaratorFlag = false;
        estraverse.replace(scopeNode, {
            enter: (node, parentNode) => {
                const functionNodes = [
                    NodeType_1.NodeType.ArrowFunctionExpression,
                    NodeType_1.NodeType.FunctionDeclaration,
                    NodeType_1.NodeType.FunctionExpression
                ];
                if (Utils_1.Utils.arrayContains(functionNodes, node.type)) {
                    estraverse.replace(node, {
                        enter: (node, parentNode) => {
                            this.replaceNodeIdentifierByNewValue(node, parentNode, this.variableNames);
                        }
                    });
                }
                if (node === variableDeclarationNode) {
                    isNodeAfterVariableDeclaratorFlag = true;
                }
                if (isNodeAfterVariableDeclaratorFlag) {
                    this.replaceNodeIdentifierByNewValue(node, parentNode, this.variableNames);
                }
            }
        });
    }
}
exports.VariableDeclarationObfuscator = VariableDeclarationObfuscator;
