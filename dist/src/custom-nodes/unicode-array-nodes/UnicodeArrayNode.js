"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = require('escodegen');
var AppendState_1 = require('../../enums/AppendState');
var NodeType_1 = require("../../enums/NodeType");
var Node_1 = require('../Node');
var NodeUtils_1 = require("../../NodeUtils");
var Utils_1 = require('../../Utils');

var UnicodeArrayNode = function (_Node_1$Node) {
    _inherits(UnicodeArrayNode, _Node_1$Node);

    function UnicodeArrayNode(unicodeArrayName) {
        var unicodeArrayRotateValue = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, UnicodeArrayNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnicodeArrayNode).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArray = [];
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(UnicodeArrayNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.prependNode(blockScopeNode.body, this.getNode());
        }
    }, {
        key: 'getNodeIdentifier',
        value: function getNodeIdentifier() {
            return this.unicodeArrayName;
        }
    }, {
        key: 'getNodeData',
        value: function getNodeData() {
            return this.unicodeArray;
        }
    }, {
        key: 'getNode',
        value: function getNode() {
            if (!this.unicodeArray.length) {
                return;
            }
            Utils_1.Utils.arrayRotate(this.unicodeArray, this.unicodeArrayRotateValue);
            this.updateNode();
            return _get(Object.getPrototypeOf(UnicodeArrayNode.prototype), 'getNode', this).call(this);
        }
    }, {
        key: 'updateNodeData',
        value: function updateNodeData(data) {
            this.unicodeArray.push(data);
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return {
                'type': NodeType_1.NodeType.VariableDeclaration,
                'declarations': [{
                    'type': NodeType_1.NodeType.VariableDeclarator,
                    'id': {
                        'type': NodeType_1.NodeType.Identifier,
                        'name': this.unicodeArrayName
                    },
                    'init': {
                        'type': NodeType_1.NodeType.ArrayExpression,
                        'elements': this.unicodeArray.map(function (value) {
                            return {
                                'type': NodeType_1.NodeType.Literal,
                                'value': value,
                                'raw': '\'' + value + '\'',
                                'x-verbatim-property': {
                                    'content': value,
                                    precedence: escodegen.Precedence.Primary
                                }
                            };
                        })
                    }
                }],
                'kind': 'var'
            };
        }
    }]);

    return UnicodeArrayNode;
}(Node_1.Node);

UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH = 4;
exports.UnicodeArrayNode = UnicodeArrayNode;
