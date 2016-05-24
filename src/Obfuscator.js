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
const ObjectExpressionObfuscator_1 = require('./node-obfuscators/ObjectExpressionObfuscator');
const UnicodeArrayNode_1 = require('./custom-nodes/unicode-array-nodes/UnicodeArrayNode');
const UnicodeArrayNodesGroup_1 = require('./node-groups/UnicodeArrayNodesGroup');
const Utils_1 = require('./Utils');
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
        this.setNewNodes(node);
        this.beforeObfuscation(node);
        estraverse.replace(node, {
            enter: (node, parent) => this.nodeControllerFirstPass(node, parent)
        });
        estraverse.replace(node, {
            leave: (node, parent) => this.nodeControllerSecondPass(node, parent)
        });
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
    afterObfuscation(node) {
        this.nodes.forEach((node) => {
            if (node.getAppendState() === AppendState_1.AppendState.AfterObfuscation) {
                node.appendNode();
            }
        });
    }
    beforeObfuscation(node) {
        this.nodes.forEach((node) => {
            if (node.getAppendState() === AppendState_1.AppendState.BeforeObfuscation) {
                node.appendNode();
            }
        });
    }
    ;
    setNewNodes(astTree) {
        if (this.options['disableConsoleOutput']) {
            this.setNode('consoleOutputDisableExpressionNode', new ConsoleOutputDisableExpressionNode_1.ConsoleOutputDisableExpressionNode(astTree));
        }
        if (this.options['debugProtection']) {
            this.setNodesGroup(new DebugProtectionNodesGroup_1.DebugProtectionNodesGroup(astTree, this.options));
        }
        if (this.options['rotateUnicodeArray']) {
            this.setNodesGroup(new UnicodeArrayNodesGroup_1.UnicodeArrayNodesGroup(astTree));
        }
        else {
            this.setNode('unicodeArrayNode', new UnicodeArrayNode_1.UnicodeArrayNode(astTree, Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH)));
        }
    }
    nodeControllerFirstPass(node, parent) {
        Object.defineProperty(node, 'parentNode', {
            configurable: true,
            enumerable: true,
            value: parent || node,
            writable: true
        });
    }
    nodeControllerSecondPass(node, parent) {
        switch (node.type) {
            default:
                this.initializeNodeObfuscators(node, parent);
        }
    }
    initializeNodeObfuscators(node, parent) {
        if (!this.nodeObfuscators.has(node.type)) {
            return;
        }
        this.nodeObfuscators.get(node.type).forEach((obfuscator) => {
            new obfuscator(this.nodes).obfuscateNode(node, parent);
        });
    }
}
exports.Obfuscator = Obfuscator;
