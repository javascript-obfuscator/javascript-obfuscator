"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var estraverse = require('estraverse');
var AppendState_1 = require('./enums/AppendState');
var NodeType_1 = require('./enums/NodeType');
var CatchClauseObfuscator_1 = require('./node-obfuscators/CatchClauseObfuscator');
var ConsoleOutputDisableExpressionNode_1 = require('./custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode');
var DebugProtectionNodesGroup_1 = require('./node-groups/DebugProtectionNodesGroup');
var FunctionDeclarationObfuscator_1 = require('./node-obfuscators/FunctionDeclarationObfuscator');
var FunctionObfuscator_1 = require('./node-obfuscators/FunctionObfuscator');
var LiteralObfuscator_1 = require('./node-obfuscators/LiteralObfuscator');
var MemberExpressionObfuscator_1 = require('./node-obfuscators/MemberExpressionObfuscator');
var MethodDefinitionObfuscator_1 = require('./node-obfuscators/MethodDefinitionObfuscator');
var NodeUtils_1 = require("./NodeUtils");
var ObjectExpressionObfuscator_1 = require('./node-obfuscators/ObjectExpressionObfuscator');
var SelfDefendingNodesGroup_1 = require("./node-groups/SelfDefendingNodesGroup");
var UnicodeArrayNodesGroup_1 = require('./node-groups/UnicodeArrayNodesGroup');
var VariableDeclarationObfuscator_1 = require('./node-obfuscators/VariableDeclarationObfuscator');

var Obfuscator = function () {
    function Obfuscator() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Obfuscator);

        this.nodes = new Map();
        this.nodeObfuscators = new Map([[NodeType_1.NodeType.ArrowFunctionExpression, [FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.ClassDeclaration, [FunctionDeclarationObfuscator_1.FunctionDeclarationObfuscator]], [NodeType_1.NodeType.CatchClause, [CatchClauseObfuscator_1.CatchClauseObfuscator]], [NodeType_1.NodeType.FunctionDeclaration, [FunctionDeclarationObfuscator_1.FunctionDeclarationObfuscator, FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.FunctionExpression, [FunctionObfuscator_1.FunctionObfuscator]], [NodeType_1.NodeType.MemberExpression, [MemberExpressionObfuscator_1.MemberExpressionObfuscator]], [NodeType_1.NodeType.MethodDefinition, [MethodDefinitionObfuscator_1.MethodDefinitionObfuscator]], [NodeType_1.NodeType.ObjectExpression, [ObjectExpressionObfuscator_1.ObjectExpressionObfuscator]], [NodeType_1.NodeType.VariableDeclaration, [VariableDeclarationObfuscator_1.VariableDeclarationObfuscator]], [NodeType_1.NodeType.Literal, [LiteralObfuscator_1.LiteralObfuscator]]]);
        this.options = options;
    }

    _createClass(Obfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(node) {
            this.setNewNodes();
            NodeUtils_1.NodeUtils.parentize(node);
            this.beforeObfuscation(node);
            this.obfuscate(node);
            this.afterObfuscation(node);
            return node;
        }
    }, {
        key: 'setNode',
        value: function setNode(nodeName, node) {
            this.nodes.set(nodeName, node);
        }
    }, {
        key: 'setNodesGroup',
        value: function setNodesGroup(nodesGroup) {
            var _this = this;

            var nodes = nodesGroup.getNodes();
            nodes.forEach(function (node, key) {
                _this.nodes.set(key, node);
            });
        }
    }, {
        key: 'afterObfuscation',
        value: function afterObfuscation(astTree) {
            this.nodes.forEach(function (node) {
                if (node.getAppendState() === AppendState_1.AppendState.AfterObfuscation) {
                    node.appendNode(astTree);
                }
            });
        }
    }, {
        key: 'beforeObfuscation',
        value: function beforeObfuscation(astTree) {
            this.nodes.forEach(function (node) {
                if (node.getAppendState() === AppendState_1.AppendState.BeforeObfuscation) {
                    node.appendNode(astTree);
                }
            });
        }
    }, {
        key: 'initializeNodeObfuscators',
        value: function initializeNodeObfuscators(node, parentNode) {
            var _this2 = this;

            if (!this.nodeObfuscators.has(node.type)) {
                return;
            }
            this.nodeObfuscators.get(node.type).forEach(function (obfuscator) {
                new obfuscator(_this2.nodes, _this2.options).obfuscateNode(node, parentNode);
            });
        }
    }, {
        key: 'obfuscate',
        value: function obfuscate(node) {
            var _this3 = this;

            estraverse.replace(node, {
                leave: function leave(node, parentNode) {
                    _this3.initializeNodeObfuscators(node, parentNode);
                }
            });
        }
    }, {
        key: 'setNewNodes',
        value: function setNewNodes() {
            if (this.options['selfDefending']) {
                this.setNodesGroup(new SelfDefendingNodesGroup_1.SelfDefendingNodesGroup(this.options));
            }
            if (this.options['disableConsoleOutput']) {
                this.setNode('consoleOutputDisableExpressionNode', new ConsoleOutputDisableExpressionNode_1.ConsoleOutputDisableExpressionNode());
            }
            if (this.options['debugProtection']) {
                this.setNodesGroup(new DebugProtectionNodesGroup_1.DebugProtectionNodesGroup(this.options));
            }
            if (this.options['unicodeArray']) {
                this.setNodesGroup(new UnicodeArrayNodesGroup_1.UnicodeArrayNodesGroup(this.options));
            }
        }
    }]);

    return Obfuscator;
}();

exports.Obfuscator = Obfuscator;
