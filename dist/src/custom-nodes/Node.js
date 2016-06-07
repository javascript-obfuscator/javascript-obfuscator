"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppendState_1 = require('../enums/AppendState');
var NodeUtils_1 = require("../NodeUtils");

var Node = function () {
    function Node() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, Node);

        this.appendState = AppendState_1.AppendState.BeforeObfuscation;
        this.options = options;
    }

    _createClass(Node, [{
        key: "getAppendState",
        value: function getAppendState() {
            return this.appendState;
        }
    }, {
        key: "getNode",
        value: function getNode() {
            NodeUtils_1.NodeUtils.parentize(this.node);
            return this.node;
        }
    }, {
        key: "setNode",
        value: function setNode(node) {
            this.node = node;
        }
    }, {
        key: "updateNode",
        value: function updateNode() {
            this.node = this.getNodeStructure();
        }
    }]);

    return Node;
}();

exports.Node = Node;
