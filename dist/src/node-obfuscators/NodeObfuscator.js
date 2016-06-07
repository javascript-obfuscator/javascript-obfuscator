"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSFuck_1 = require("../enums/JSFuck");
var NodeUtils_1 = require("../NodeUtils");
var Utils_1 = require('../Utils');

var NodeObfuscator = function () {
    function NodeObfuscator(nodes) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, NodeObfuscator);

        this.nodes = nodes;
        this.options = options;
    }

    _createClass(NodeObfuscator, [{
        key: "isReservedName",
        value: function isReservedName(name) {
            return this.options['reservedNames'].some(function (reservedName) {
                return new RegExp(reservedName, 'g').test(name);
            });
        }
    }, {
        key: "replaceNodeIdentifierByNewValue",
        value: function replaceNodeIdentifierByNewValue(node, parentNode, namesMap) {
            if (NodeUtils_1.NodeUtils.isIdentifierNode(node) && namesMap.has(node.name)) {
                var parentNodeIsAPropertyNode = NodeUtils_1.NodeUtils.isPropertyNode(parentNode) && parentNode.key === node,
                    parentNodeIsAMemberExpressionNode = NodeUtils_1.NodeUtils.isMemberExpressionNode(parentNode) && parentNode.computed === false && parentNode.property === node;
                if (parentNodeIsAPropertyNode || parentNodeIsAMemberExpressionNode) {
                    return;
                }
                node.name = namesMap.get(node.name);
            }
        }
    }, {
        key: "replaceLiteralBooleanByJSFuck",
        value: function replaceLiteralBooleanByJSFuck(nodeValue) {
            return nodeValue ? JSFuck_1.JSFuck.True : JSFuck_1.JSFuck.False;
        }
    }, {
        key: "replaceLiteralNumberByHexadecimalValue",
        value: function replaceLiteralNumberByHexadecimalValue(nodeValue) {
            var prefix = '0x';
            if (!Utils_1.Utils.isInteger(nodeValue)) {
                return String(nodeValue);
            }
            return "" + prefix + Utils_1.Utils.decToHex(nodeValue);
        }
    }, {
        key: "replaceLiteralValueByUnicodeValue",
        value: function replaceLiteralValueByUnicodeValue(nodeValue) {
            var value = nodeValue,
                replaceByUnicodeArrayFlag = Math.random() <= this.options['unicodeArrayThreshold'];
            if (this.options['encodeUnicodeLiterals'] && replaceByUnicodeArrayFlag) {
                value = Utils_1.Utils.btoa(value);
            }
            value = Utils_1.Utils.stringToUnicode(value);
            if (!this.options['unicodeArray'] || !replaceByUnicodeArrayFlag) {
                return value;
            }
            return this.replaceLiteralValueByUnicodeArrayCall(value);
        }
    }, {
        key: "replaceLiteralValueByUnicodeArrayCall",
        value: function replaceLiteralValueByUnicodeArrayCall(value) {
            var unicodeArrayNode = this.nodes.get('unicodeArrayNode'),
                unicodeArray = unicodeArrayNode.getNodeData(),
                sameIndex = unicodeArray.indexOf(value),
                index = void 0,
                hexadecimalIndex = void 0;
            if (sameIndex >= 0) {
                index = sameIndex;
            } else {
                index = unicodeArray.length;
                unicodeArrayNode.updateNodeData(value);
            }
            hexadecimalIndex = this.replaceLiteralNumberByHexadecimalValue(index);
            if (this.options['wrapUnicodeArrayCalls']) {
                return this.nodes.get('unicodeArrayCallsWrapper').getNodeIdentifier() + "('" + hexadecimalIndex + "')";
            }
            return unicodeArrayNode.getNodeIdentifier() + "[" + hexadecimalIndex + "]";
        }
    }]);

    return NodeObfuscator;
}();

exports.NodeObfuscator = NodeObfuscator;
