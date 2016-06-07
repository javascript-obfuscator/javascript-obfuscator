"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var esprima = require('esprima');
var JavaScriptObfuscator_1 = require('../../JavaScriptObfuscator');
var AppendState_1 = require("../../enums/AppendState");
var JSFuck_1 = require("../../enums/JSFuck");
var NoCustomNodesPreset_1 = require("../../preset-options/NoCustomNodesPreset");
var Node_1 = require('../Node');
var NodeUtils_1 = require("../../NodeUtils");
var Utils_1 = require("../../Utils");

var UnicodeArrayDecodeNode = function (_Node_1$Node) {
    _inherits(UnicodeArrayDecodeNode, _Node_1$Node);

    function UnicodeArrayDecodeNode(unicodeArrayName, unicodeArray) {
        var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        _classCallCheck(this, UnicodeArrayDecodeNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnicodeArrayDecodeNode).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.unicodeArrayName = unicodeArrayName;
        _this.unicodeArray = unicodeArray;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(UnicodeArrayDecodeNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
        }
    }, {
        key: 'getNode',
        value: function getNode() {
            if (!this.unicodeArray.length) {
                return;
            }
            this.updateNode();
            return _get(Object.getPrototypeOf(UnicodeArrayDecodeNode.prototype), 'getNode', this).call(this);
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            var environmentName = Utils_1.Utils.getRandomVariableName(),
                forLoopFunctionName = Utils_1.Utils.getRandomVariableName(),
                indexVariableName = Utils_1.Utils.getRandomVariableName(),
                tempArrayName = Utils_1.Utils.getRandomVariableName();
            var code = '',
                node = void 0;
            if (this.options['selfDefending']) {
                code = '\n                var ' + environmentName + ' = function(){return ' + Utils_1.Utils.stringToUnicode('dev') + ';};\n                   \n                Function(' + Utils_1.Utils.stringToUnicode('return/\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}/') + ')()[' + Utils_1.Utils.stringToUnicode('test') + '](' + environmentName + '[' + Utils_1.Utils.stringToUnicode('toString') + ']()) !== ' + JSFuck_1.JSFuck.True + ' && !' + this.unicodeArrayName + '++ ? [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(' + JSFuck_1.JSFuck.True + '){}\')() : Function(' + Utils_1.Utils.stringToUnicode('a') + ', atob(' + Utils_1.Utils.stringToUnicode(Utils_1.Utils.btoa('a.call()')) + '))(' + forLoopFunctionName + ') ? [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(' + JSFuck_1.JSFuck.False + '){}\')() : [][\'filter\'][\'constructor\'](' + Utils_1.Utils.stringToJSFuck('while') + ' + \'(' + JSFuck_1.JSFuck.False + '){}\')();\n            ';
            } else {
                code = forLoopFunctionName + '();';
            }
            node = esprima.parse('\n            (function () {\n                ' + JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate('\n                    (function () {\n                        var object = [][\'filter\'][\'constructor\'](\'return this\')();\n                        var chars = \'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\';\n            \n                        object.atob || (\n                            object.atob = function(input) {\n                                var str = String(input).replace(/=+$/, \'\');\n                                for (\n                                    var bc = 0, bs, buffer, idx = 0, output = \'\';\n                                    buffer = str.charAt(idx++);\n                                    ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,\n                                        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0\n                                ) {\n                                    buffer = chars.indexOf(buffer);\n                                }\n                            return output;\n                        });\n                    })();\n                ', NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET) + '\n              \n                var ' + forLoopFunctionName + ' = function () {\n                    var ' + tempArrayName + ' = [];\n                    \n                    for (var ' + indexVariableName + ' in ' + this.unicodeArrayName + ') {\n                        ' + tempArrayName + '[' + Utils_1.Utils.stringToUnicode('push') + '](decodeURI(atob(' + this.unicodeArrayName + '[' + indexVariableName + '])));\n                    }\n                    \n                    ' + this.unicodeArrayName + ' = ' + tempArrayName + ';\n                };\n                \n                ' + code + '\n            })();\n        ');
            NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
            return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
        }
    }]);

    return UnicodeArrayDecodeNode;
}(Node_1.Node);

exports.UnicodeArrayDecodeNode = UnicodeArrayDecodeNode;
