"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var esprima = require('esprima');
var Node_1 = require('../Node');
var NodeUtils_1 = require("../../NodeUtils");

var ConsoleOutputDisableExpressionNode = function (_Node_1$Node) {
    _inherits(ConsoleOutputDisableExpressionNode, _Node_1$Node);

    function ConsoleOutputDisableExpressionNode() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, ConsoleOutputDisableExpressionNode);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConsoleOutputDisableExpressionNode).call(this, options));

        _this.node = _this.getNodeStructure();
        return _this;
    }

    _createClass(ConsoleOutputDisableExpressionNode, [{
        key: 'appendNode',
        value: function appendNode(blockScopeNode) {
            NodeUtils_1.NodeUtils.prependNode(blockScopeNode.body, this.getNode());
        }
    }, {
        key: 'getNodeStructure',
        value: function getNodeStructure() {
            return NodeUtils_1.NodeUtils.getBlockScopeNodeByIndex(esprima.parse("\n                (function () {\n                    var _ = '(\u0004\u0006\u0003\u0005[]' + '[\"filter\"][\"\u0007tructor\"]' + '(\"return this\")()' + '.' + '\u0003;\u0006\u0002\u0005\u0004};' + '_\u0003.log\u0001.in' + 'fo\u0001.' + 'war' + 'n\u0001.er' + 'r' + 'or\u0001})();' + '\u0001\u0005_\u0002;' + '_\u0003\u0002function' + '\u0003\u0007ole\u0004\u0002 ()' + '{\u0005 = \u0006var ' + '_\u0007cons', \n                        Y, \n                        $;\n                    \n                    for (Y in $ = \"\u0007\u0006\u0005\u0004\u0003\u0002\u0001\") {\n                      var arr = _.split($[Y]);\n                      _ = arr.join(arr.pop());\n                    }\n                    \n                    [][\"filter\"][\"constructor\"](_)();\n                })()\n            "));
        }
    }]);

    return ConsoleOutputDisableExpressionNode;
}(Node_1.Node);

exports.ConsoleOutputDisableExpressionNode = ConsoleOutputDisableExpressionNode;
