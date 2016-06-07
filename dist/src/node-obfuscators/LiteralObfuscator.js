"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var escodegen = require('escodegen');
var NodeObfuscator_1 = require('./NodeObfuscator');
var NodeUtils_1 = require("../NodeUtils");

var LiteralObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(LiteralObfuscator, _NodeObfuscator_1$Nod);

    function LiteralObfuscator() {
        _classCallCheck(this, LiteralObfuscator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LiteralObfuscator).apply(this, arguments));
    }

    _createClass(LiteralObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(literalNode, parentNode) {
            if (NodeUtils_1.NodeUtils.isPropertyNode(parentNode) && parentNode.key === literalNode) {
                return;
            }
            if (literalNode['x-verbatim-property']) {
                return;
            }
            var content = void 0;
            switch (_typeof(literalNode.value)) {
                case 'boolean':
                    content = this.replaceLiteralBooleanByJSFuck(literalNode.value);
                    break;
                case 'number':
                    content = this.replaceLiteralNumberByHexadecimalValue(literalNode.value);
                    break;
                case 'string':
                    content = this.replaceLiteralValueByUnicodeValue(literalNode.value);
                    break;
                default:
                    return;
            }
            literalNode['x-verbatim-property'] = {
                content: content,
                precedence: escodegen.Precedence.Primary
            };
        }
    }]);

    return LiteralObfuscator;
}(NodeObfuscator_1.NodeObfuscator);

exports.LiteralObfuscator = LiteralObfuscator;
