"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var SelfDefendingUnicodeNode = function (_Node_1$Node) {
    _inherits(SelfDefendingUnicodeNode, _Node_1$Node);

    function SelfDefendingUnicodeNode() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, SelfDefendingUnicodeNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelfDefendingUnicodeNode).call(this, options));

        _this.appendState = AppendState_1.AppendState.AfterObfuscation;
        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(SelfDefendingUnicodeNode, [{
        key: "appendNode",
        value: function appendNode(blockScopeNode) {
            var programBodyLength = blockScopeNode.body.length,
                randomIndex = 0;
            if (programBodyLength > 2) {
                randomIndex = Utils_1.Utils.getRandomInteger(programBodyLength / 2, programBodyLength - 1);
            }
            NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
        }
    }, {
        key: "getNodeStructure",
        value: function getNodeStructure() {
            var node = esprima.parse(JavaScriptObfuscator_1.JavaScriptObfuscator.obfuscate("\n                (function () {                                \n                    var func = function(){return " + Utils_1.Utils.stringToUnicode('dev') + ";},\n                        func2 = function () {\n                            return 'window';\n                        };\n                \n                    !Function(" + Utils_1.Utils.stringToUnicode("return/\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}/") + ")().test(func.toString()) ? Function(" + Utils_1.Utils.stringToUnicode("return/(\\\\[x|u](\\w){2,4})+/") + ")().test(func2.toString()) ? []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.False + "){}')() : []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.True + "){}')() : []['filter']['constructor'](" + Utils_1.Utils.stringToJSFuck('while') + " + '(" + JSFuck_1.JSFuck.False + "){}')();\n                })();\n            ", NoCustomNodesPreset_1.NO_CUSTOM_NODES_PRESET));
            NodeUtils_1.NodeUtils.addXVerbatimPropertyToLiterals(node);
            return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(node);
        }
    }]);

    return SelfDefendingUnicodeNode;
}(Node_1.Node);

exports.SelfDefendingUnicodeNode = SelfDefendingUnicodeNode;
