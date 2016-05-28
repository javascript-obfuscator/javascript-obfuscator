"use strict";
const estraverse = require('estraverse');
const AppendState_1 = require('./enums/AppendState');
const NodeType_1 = require('./enums/NodeType');
const CatchClauseObfuscator_1 = require('./node-obfuscators/CatchClauseObfuscator');
const ConsoleOutputDisableExpressionNode_1 = require('./custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode');
const DebugProtectionNodesGroup_1 = require('./node-groups/DebugProtectionNodesGroup');
const FunctionDeclarationObfuscator_1 = require('./node-obfuscators/FunctionDeclarationObfuscator');
const FunctionObfuscator_1 = require('./node-obfuscators/FunctionObfuscator');
const LiteralObfuscator_1 = require('./node-obfuscators/LiteralObfuscator');
const MemberExpressionObfuscator_1 = require('./node-obfuscators/MemberExpressionObfuscator');
const MethodDefinitionObfuscator_1 = require('./node-obfuscators/MethodDefinitionObfuscator');
const NodeUtils_1 = require("./NodeUtils");
const ObjectExpressionObfuscator_1 = require('./node-obfuscators/ObjectExpressionObfuscator');
const UnicodeArrayNodesGroup_1 = require('./node-groups/UnicodeArrayNodesGroup');
const VariableDeclarationObfuscator_1 = require('./node-obfuscators/VariableDeclarationObfuscator');
class Obfuscator {
    constructor(options = {}) {
        this.nodes = new Map();
        this.nodeObfuscators = new Map([
            [NodeType_1.NodeType.ArrowFunctionExpression, [FunctionObfuscator_1.FunctionObfuscator]],
            [NodeType_1.NodeType.ClassDeclaration, [FunctionDeclarationObfuscator_1.FunctionDeclarationObfuscator]],
            [NodeType_1.NodeType.CatchClause, [CatchClauseObfuscator_1.CatchClauseObfuscator]],
            [NodeType_1.NodeType.FunctionDeclaration, [
                    FunctionDeclarationObfuscator_1.FunctionDeclarationObfuscator,
                    FunctionObfuscator_1.FunctionObfuscator
                ]],
            [NodeType_1.NodeType.FunctionExpression, [FunctionObfuscator_1.FunctionObfuscator]],
            [NodeType_1.NodeType.MemberExpression, [MemberExpressionObfuscator_1.MemberExpressionObfuscator]],
            [NodeType_1.NodeType.MethodDefinition, [MethodDefinitionObfuscator_1.MethodDefinitionObfuscator]],
            [NodeType_1.NodeType.ObjectExpression, [ObjectExpressionObfuscator_1.ObjectExpressionObfuscator]],
            [NodeType_1.NodeType.VariableDeclaration, [VariableDeclarationObfuscator_1.VariableDeclarationObfuscator]],
            [NodeType_1.NodeType.Literal, [LiteralObfuscator_1.LiteralObfuscator]]
        ]);
        this.options = options;
    }
    obfuscateNode(node) {
        this.setNewNodes();
        NodeUtils_1.NodeUtils.parentize(node);
        this.beforeObfuscation(node);
        this.obfuscate(node);
        this.afterObfuscation(node);
    }
    setNode(nodeName, node) {
        this.nodes.set(nodeName, node);
    }
    setNodesGroup(nodesGroup) {
        let nodes = nodesGroup.getNodes();
        nodes.forEach((node, key) => {
            this.nodes.set(key, node);
        });
    }
    afterObfuscation(astTree) {
        this.nodes.forEach((node) => {
            if (node.getAppendState() === AppendState_1.AppendState.AfterObfuscation) {
                node.appendNode(NodeUtils_1.NodeUtils.getBlockScopeOfNode(astTree));
            }
        });
    }
    beforeObfuscation(astTree) {
        this.nodes.forEach((node) => {
            if (node.getAppendState() === AppendState_1.AppendState.BeforeObfuscation) {
                node.appendNode(NodeUtils_1.NodeUtils.getBlockScopeOfNode(astTree));
            }
        });
    }
    ;
    initializeNodeObfuscators(node, parentNode) {
        if (!this.nodeObfuscators.has(node.type)) {
            return;
        }
        this.nodeObfuscators.get(node.type).forEach((obfuscator) => {
            new obfuscator(this.nodes, this.options).obfuscateNode(node, parentNode);
        });
    }
    obfuscate(node) {
        estraverse.replace(node, {
            leave: (node, parentNode) => {
                this.initializeNodeObfuscators(node, parentNode);
            }
        });
    }
    setNewNodes() {
        if (this.options['disableConsoleOutput']) {
            this.setNode('consoleOutputDisableExpressionNode', new ConsoleOutputDisableExpressionNode_1.ConsoleOutputDisableExpressionNode());
        }
        if (this.options['debugProtection']) {
            this.setNodesGroup(new DebugProtectionNodesGroup_1.DebugProtectionNodesGroup(this.options));
        }
        this.setNodesGroup(new UnicodeArrayNodesGroup_1.UnicodeArrayNodesGroup(this.options));
    }
}
exports.Obfuscator = Obfuscator;
