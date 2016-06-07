"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = require('esprima');
var AppendState_1 = require("../../enums/AppendState");
var JSFuck_1 = require("../../enums/JSFuck");
var NoCustomNodesPreset_1 = require("../../preset-options/NoCustomNodesPreset");
var JavaScriptObfuscator_1 = require("../../JavaScriptObfuscator");
var Node_1 = require('../Node');
var NodeUtils_1 = require("../../NodeUtils");
var Utils_1 = require("../../Utils");

var UnicodeArrayRotateFunctionNode = function (_Node_1$Node) {
    _inherits(UnicodeArrayRotateFunctionNode, _Node_1$Node);

    function UnicodeArrayRotateFunctionNode(unicodeArrayName, unicodeArray, unicodeArrayRotateValue) {
        var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

        _classCallCheck(this, UnicodeArrayRotateFunctionNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnicodeArrayRotateFunctionNode).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArray = unicodeArray;
        _this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(UnicodeArrayRotateFunctionNode, [{
        key: "appendNode",
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
        }
    }, {
        key: "getNode",
        value: function getNode() {
            if (!this.unicodeArray.length) {
                return;
            }
            return _get(Object.getPrototypeOf(UnicodeArrayRotateFunctionNode.prototype), "getNode", this).call(this);
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var arrayName = Utils_1.Utils.getRandomVariableName(),
                code = '',
                timesName = Utils_1.Utils.getRandomVariableName(),
                timesArgumentName = Utils_1.Utils.getRandomVariableName(),
                whileFunctionName = Utils_1.Utils.getRandomVariableName(),
                node = void 0;
            if (this.options['selfDefending']) {
                code = JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate("\n                (function () {\n                    var func = function(){return " + Utils_1.Utils.stringToUnicode('dev') + ";};\n                                        \n                    !Function(" + Utils_1.Utils.stringToUnicode("return/\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}/") + ")().test(func.toString()) ? []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.True + "){}')() : Function(" + Utils_1.Utils.stringToUnicode('a') + ", " + Utils_1.Utils.stringToUnicode('b') + ", " + Utils_1.Utils.stringToUnicode('a(++b)') + ")(" + whileFunctionName + ", " + timesName + ") ? []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.False + "){}')() : []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.False + "){}')();\n                })();\n            ", NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET);
            } else {
                code = whileFunctionName + "(++" + timesName + ")";
            }
            node = esprima.parse("\n            (function (" + arrayName + ", " + timesName + ") {\n                var " + whileFunctionName + " = function (" + timesArgumentName + ") {\n                    while (--" + timesArgumentName + ") {\n                        " + arrayName + "[" + Utils_1.Utils.stringToUnicode('push') + "](" + arrayName + "[" + Utils_1.Utils.stringToUnicode('shift') + "]());\n                    }\n                };\n                \n                " + code + "\n            })(" + this.unicodeArrayName + ", 0x" + Utils_1.Utils.decToHex(this.unicodeArrayRotateValue) + ");\n        ");
            NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
            return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
        }
    }]);

    return UnicodeArrayRotateFunctionNode;
}(Node_1.Node);

exports.UnicodeArrayRotateFunctionNode = UnicodeArrayRotateFunctionNode;
