"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeType_1 = require('../../enums/NodeType');
var Node_1 = require('../Node');
var NodeUtils_1 = require('../../NodeUtils');

var DebugProtectionFunctionIntervalNode = function (_Node_1$Node) {
    _inherits(DebugProtectionFunctionIntervalNode, _Node_1$Node);

    function DebugProtectionFunctionIntervalNode(debugProtectionFunctionName) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, DebugProtectionFunctionIntervalNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DebugProtectionFunctionIntervalNode).call(this, options));

        _this.debugProtectionFunctionName = debugProtectionFunctionName;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(DebugProtectionFunctionIntervalNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.appendNode(blockScopeNode.body, this.getNode());
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return {
                'type': NodeType_1.NodeType.ExpressionStatement,
                'expression': {
                    'type': NodeType_1.NodeType.CallExpression,
                    'callee': {
                        'type': NodeType_1.NodeType.Identifier,
                        'name': 'setInterval'
                    },
                    'arguments': [{
                        'type': NodeType_1.NodeType.FunctionExpression,
                        'id': null,
                        'params': [],
                        'defaults': [],
                        'body': {
                            'type': NodeType_1.NodeType.BlockStatement,
                            'body': [{
                                'type': NodeType_1.NodeType.ExpressionStatement,
                                'expression': {
                                    'type': NodeType_1.NodeType.CallExpression,
                                    'callee': {
                                        'type': NodeType_1.NodeType.Identifier,
                                        'name': this.debugProtectionFunctionName
                                    },
                                    'arguments': []
                                }
                            }]
                        },
                        'generator': false,
                        'expression': false
                    }, {
                        'type': NodeType_1.NodeType.Literal,
                        'value': 4000,
                        'raw': '4000'
                    }]
                }
            };
        }
    }]);

    return DebugProtectionFunctionIntervalNode;
}(Node_1.Node);

exports.DebugProtectionFunctionIntervalNode = DebugProtectionFunctionIntervalNode;
