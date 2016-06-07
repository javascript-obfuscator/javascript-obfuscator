"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = require('estraverse');
var NodeType_1 = require("../enums/NodeType");
var NodeObfuscator_1 = require('./NodeObfuscator');
var NodeUtils_1 = require("../NodeUtils");
var Utils_1 = require('../Utils');

var VariableDeclarationObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(VariableDeclarationObfuscator, _NodeObfuscator_1$Nod);

    function VariableDeclarationObfuscator() {
        var _Object$getPrototypeO;

        _classCallCheck(this, VariableDeclarationObfuscator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(VariableDeclarationObfuscator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.variableNames = new Map();
        return _this;
    }

    _createClass(VariableDeclarationObfuscator, [{
        key: "obfuscateNode",
        value: function obfuscateNode(variableDeclarationNode, parentNode) {
            if (parentNode.type === NodeType_1.NodeType.Program) {
                return;
            }
            this.replaceVariableName(variableDeclarationNode);
            this.replaceVariableCalls(variableDeclarationNode, parentNode);
        }
    }, {
        key: "replaceVariableName",
        value: function replaceVariableName(variableDeclarationNode) {
            var _this2 = this;

            variableDeclarationNode.declarations.forEach(function (declarationNode) {
                estraverse.replace(declarationNode.id, {
                    enter: function enter(node) {
                        if (NodeUtils_1.NodeUtils.isIdentifierNode(node) && !_this2.isReservedName(node.name)) {
                            _this2.variableNames.set(node.name, Utils_1.Utils.getRandomVariableName());
                            node.name = _this2.variableNames.get(node.name);
                            return;
                        }
                        return estraverse.VisitorOption.Skip;
                    }
                });
            });
        }
    }, {
        key: "replaceVariableCalls",
        value: function replaceVariableCalls(variableDeclarationNode, variableParentNode) {
            var _this3 = this;

            var scopeNode = void 0;
            scopeNode = variableDeclarationNode.kind === 'var' ? NodeUtils_1.NodeUtils.getBlockScopeOfNode(variableDeclarationNode) : variableParentNode;
            var isNodeAfterVariableDeclaratorFlag = false;
            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    var functionNodes = [NodeType_1.NodeType.ArrowFunctionExpression, NodeType_1.NodeType.FunctionDeclaration, NodeType_1.NodeType.FunctionExpression];
                    if (Utils_1.Utils.arrayContains(functionNodes, node.type)) {
                        estraverse.replace(node, {
                            enter: function enter(node, parentNode) {
                                _this3.replaceNodeIdentifierByNewValue(node, parentNode, _this3.variableNames);
                            }
                        });
                    }
                    if (node === variableDeclarationNode) {
                        isNodeAfterVariableDeclaratorFlag = true;
                    }
                    if (isNodeAfterVariableDeclaratorFlag) {
                        _this3.replaceNodeIdentifierByNewValue(node, parentNode, _this3.variableNames);
                    }
                }
            });
        }
    }]);

    return VariableDeclarationObfuscator;
}(NodeObfuscator_1.NodeObfuscator);

exports.VariableDeclarationObfuscator = VariableDeclarationObfuscator;
