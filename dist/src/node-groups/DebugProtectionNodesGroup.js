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

var DebugProtectionFunctionCallNode_1 = require("../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode");
var DebugProtectionFunctionIntervalNode_1 = require("../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode");
var DebugProtectionFunctionNode_1 = require("../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode");
var NodesGroup_1 = require('./NodesGroup');
var Utils_1 = require('../Utils');

var DebugProtectionNodesGroup = function (_NodesGroup_1$NodesGr) {
    _inherits(DebugProtectionNodesGroup, _NodesGroup_1$NodesGr);

    function DebugProtectionNodesGroup() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, DebugProtectionNodesGroup);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DebugProtectionNodesGroup).call(this, options));

        _this.debugProtectionFunctionIdentifier = Utils_1.Utils.getRandomVariableName();
        _this.nodes.set('debugProtectionFunctionNode', new DebugProtectionFunctionNode_1.DebugProtectionFunctionNode(_this.debugProtectionFunctionIdentifier, _this.options));
        _this.nodes.set('debugProtectionFunctionCallNode', new DebugProtectionFunctionCallNode_1.DebugProtectionFunctionCallNode(_this.debugProtectionFunctionIdentifier, _this.options));
        if (_this.options['debugProtectionInterval']) {
            _this.nodes.set('debugProtectionFunctionIntervalNode', new DebugProtectionFunctionIntervalNode_1.DebugProtectionFunctionIntervalNode(_this.debugProtectionFunctionIdentifier, _this.options));
        }
        return _this;
    }

    return DebugProtectionNodesGroup;
}(NodesGroup_1.NodesGroup);

exports.DebugProtectionNodesGroup = DebugProtectionNodesGroup;
