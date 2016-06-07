"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

var NodesGroup_1 = require('./NodesGroup');
var UnicodeArrayCallsWrapper_1 = require("../custom-nodes/unicode-array-nodes/UnicodeArrayCallsWrapper");
var UnicodeArrayDecodeNode_1 = require("../custom-nodes/unicode-array-nodes/UnicodeArrayDecodeNode");
var UnicodeArrayNode_1 = require('../custom-nodes/unicode-array-nodes/UnicodeArrayNode');
var UnicodeArrayRotateFunctionNode_1 = require('../custom-nodes/unicode-array-nodes/UnicodeArrayRotateFunctionNode');
var Utils_1 = require('../Utils');

var UnicodeArrayNodesGroup = function (_NodesGroup_1$NodesGr) {
    _inherits(UnicodeArrayNodesGroup, _NodesGroup_1$NodesGr);

    function UnicodeArrayNodesGroup() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, UnicodeArrayNodesGroup);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(UnicodeArrayNodesGroup).call(this, options));

        _this.unicodeArrayName = Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);
        _this.unicodeArrayTranslatorName = Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);
        _this.unicodeArrayRotateValue = _this.options['rotateUnicodeArray'] ? Utils_1.Utils.getRandomInteger(100, 500) : 0;
        var unicodeArrayNode = new UnicodeArrayNode_1.UnicodeArrayNode(_this.unicodeArrayName, _this.unicodeArrayRotateValue, _this.options),
            unicodeArray = unicodeArrayNode.getNodeData();
        _this.nodes.set('unicodeArrayNode', unicodeArrayNode);
        if (_this.options['wrapUnicodeArrayCalls']) {
            _this.nodes.set('unicodeArrayCallsWrapper', new UnicodeArrayCallsWrapper_1.UnicodeArrayCallsWrapper(_this.unicodeArrayTranslatorName, _this.unicodeArrayName, unicodeArray, _this.options));
        }
        if (_this.options['encodeUnicodeLiterals']) {
            _this.nodes.set('unicodeArrayDecodeNode', new UnicodeArrayDecodeNode_1.UnicodeArrayDecodeNode(_this.unicodeArrayName, unicodeArray, _this.options));
        }
        if (_this.options['rotateUnicodeArray']) {
            _this.nodes.set('unicodeArrayRotateFunctionNode', new UnicodeArrayRotateFunctionNode_1.UnicodeArrayRotateFunctionNode(_this.unicodeArrayName, unicodeArray, _this.unicodeArrayRotateValue, _this.options));
        }
        return _this;
    }

    return UnicodeArrayNodesGroup;
}(NodesGroup_1.NodesGroup);

exports.UnicodeArrayNodesGroup = UnicodeArrayNodesGroup;
