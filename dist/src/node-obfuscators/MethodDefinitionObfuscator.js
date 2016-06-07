"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var estraverse = require('estraverse');
var NodeObfuscator_1 = require('./NodeObfuscator');
var NodeUtils_1 = require("../NodeUtils");
var Utils_1 = require("../Utils");

var MethodDefinitionObfuscator = function (_NodeObfuscator_1$Nod) {
    _inherits(MethodDefinitionObfuscator, _NodeObfuscator_1$Nod);

    function MethodDefinitionObfuscator() {
        var _Object$getPrototypeO;

        _classCallCheck(this, MethodDefinitionObfuscator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(MethodDefinitionObfuscator)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.ignoredNames = ['constructor'];
        return _this;
    }

    _createClass(MethodDefinitionObfuscator, [{
        key: 'obfuscateNode',
        value: function obfuscateNode(methodDefinitionNode, parentNode) {
            this.replaceMethodName(methodDefinitionNode);
        }
    }, {
        key: 'replaceMethodName',
        value: function replaceMethodName(methodDefinitionNode) {
            var _this2 = this;

            estraverse.replace(methodDefinitionNode.key, {
                leave: function leave(node) {
                    if (NodeUtils_1.NodeUtils.isIdentifierNode(node) && !Utils_1.Utils.arrayContains(_this2.ignoredNames, node.name) && methodDefinitionNode.computed === false) {
                        methodDefinitionNode.computed = true;
                        node.name = _this2.replaceLiteralValueByUnicodeValue(node.name);
                        return;
                    }
                    return estraverse.VisitorOption.Skip;
                }
            });
        }
    }]);

    return MethodDefinitionObfuscator;
}(NodeObfuscator_1.NodeObfuscator);

exports.MethodDefinitionObfuscator = MethodDefinitionObfuscator;
