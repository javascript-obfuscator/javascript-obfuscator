"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodesGroup_1 = require('./NodesGroup');
var SelfDefendingUnicodeNode_1 = require("../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode");

var SelfDefendingNodesGroup = function (_NodesGroup_1$NodesGr) {
    _inherits(SelfDefendingNodesGroup, _NodesGroup_1$NodesGr);

    function SelfDefendingNodesGroup() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _classCallCheck(this, SelfDefendingNodesGroup);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SelfDefendingNodesGroup).call(this, options));

        _this.nodes.set('selfDefendingUnicodeNode', new SelfDefendingUnicodeNode_1.SelfDefendingUnicodeNode(_this.options));
        return _this;
    }

    return SelfDefendingNodesGroup;
}(NodesGroup_1.NodesGroup);

exports.SelfDefendingNodesGroup = SelfDefendingNodesGroup;
