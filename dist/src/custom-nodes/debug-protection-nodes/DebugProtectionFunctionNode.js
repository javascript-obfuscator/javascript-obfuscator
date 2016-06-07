"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = require('esprima');
var Node_1 = require('../Node');
var NodeUtils_1 = require('../../NodeUtils');
var Utils_1 = require("../../Utils");

var DebugProtectionFunctionNode = function (_Node_1$Node) {
    _inherits(DebugProtectionFunctionNode, _Node_1$Node);

    function DebugProtectionFunctionNode(debugProtectionFunctionName) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, DebugProtectionFunctionNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DebugProtectionFunctionNode).call(this, options));

        _this.debugProtectionFunctionName = debugProtectionFunctionName;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(DebugProtectionFunctionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            var programBodyLength = blockScopeNode.body.length,
                randomIndex = Utils_1.Utils.getRandomInteger(0, programBodyLength);
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
        }
    }, {
        key: 'getNodeIdentifier',
        value: function getNodeIdentifier() {
            return this.debugProtectionFunctionName;
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(esprima.parse('\n                var ' + this.debugProtectionFunctionName + ' = function () {\n                    function debuggerProtection (counter) {\n                        if ((\'\' + counter / counter)[\'length\'] !== 1 || counter % 20 === 0) {\n                            (function () {}.constructor(\'debugger\')());\n                        } else {\n                            [].filter.constructor(' + Utils_1.Utils.stringToJSFuck('debugger') + ')();\n                        }\n                        \n                        debuggerProtection(++counter);\n                    }\n                    \n                    try {\n                        debuggerProtection(0);\n                    } catch (y) {}\n                };\n            '));
        }
    }]);

    return DebugProtectionFunctionNode;
}(Node_1.Node);

exports.DebugProtectionFunctionNode = DebugProtectionFunctionNode;
