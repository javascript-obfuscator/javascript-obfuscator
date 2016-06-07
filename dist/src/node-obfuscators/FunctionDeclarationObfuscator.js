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

var FunctionDeclarationObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(FunctionDeclarationObfuscator, _NodeObfuscator_1$Nod);

    function FunctionDeclarationObfuscator() {
        var _Object$getPrototypeO;

        _classCallCheck(this, FunctionDeclarationObfuscator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FunctionDeclarationObfuscator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.functionName = new Map();
        return _this;
    }

    _createClass(FunctionDeclarationObfuscator, [{
        key: "obfuscateNode",
        value: function obfuscateNode(functionDeclarationNode, parentNode) {
            if (parentNode.type === NodeType_1.NodeType.Program) {
                return;
            }
            this.replaceFunctionName(functionDeclarationNode);
            this.replaceFunctionCalls(functionDeclarationNode);
        }
    }, {
        key: "replaceFunctionName",
        value: function replaceFunctionName(functionDeclarationNode) {
            var _this2 = this;

            estraverse.replace(functionDeclarationNode.id, {
                leave: function leave(node) {
                    if (NodeUtils_1.NodeUtils.isIdentifierNode(node) && !_this2.isReservedName(node.name)) {
                        _this2.functionName.set(node.name, Utils_1.Utils.getRandomVariableName());
                        node.name = _this2.functionName.get(node.name);
                        return;
                    }
                    return estraverse.VisitorOption.Skip;
                }
            });
        }
    }, {
        key: "replaceFunctionCalls",
        value: function replaceFunctionCalls(functionDeclarationNode) {
            var _this3 = this;

            var scopeNode = NodeUtils_1.NodeUtils.getBlockScopeOfNode(functionDeclarationNode);
            estraverse.replace(scopeNode, {
                enter: function enter(node, parentNode) {
                    _this3.replaceNodeIdentifierByNewValue(node, parentNode, _this3.functionName);
                }
            });
        }
    }]);

    return FunctionDeclarationObfuscator;
}(NodeObfuscator_1.NodeObfuscator);

exports.FunctionDeclarationObfuscator = FunctionDeclarationObfuscator;
