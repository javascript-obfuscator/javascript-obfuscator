"use strict";
const NodesGroup_1 = require('./NodesGroup');
const UnicodeArrayCallsWrapper_1 = require("../custom-nodes/unicode-array-nodes/UnicodeArrayCallsWrapper");
const UnicodeArrayNode_1 = require('../custom-nodes/unicode-array-nodes/UnicodeArrayNode');
const UnicodeArrayRotateFunctionNode_1 = require('../custom-nodes/unicode-array-nodes/UnicodeArrayRotateFunctionNode');
const Utils_1 = require('../Utils');
class UnicodeArrayNodesGroup extends NodesGroup_1.NodesGroup {
    constructor(options) {
        super();
        this.unicodeArrayName = Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);
        this.unicodeArrayRotateValue = Utils_1.Utils.getRandomInteger(100, 500);
        this.unicodeArrayTranslatorName = Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);
        this.options = options;
        let unicodeArrayNode = new UnicodeArrayNode_1.UnicodeArrayNode(this.unicodeArrayName, this.unicodeArrayRotateValue), unicodeArray = unicodeArrayNode.getNodeData();
        this.nodes = new Map([
            [
                'unicodeArrayNode',
                unicodeArrayNode
            ]
        ]);
        if (this.options['wrapUnicodeArrayCalls']) {
            this.nodes.set('unicodeArrayCallsWrapper', new UnicodeArrayCallsWrapper_1.UnicodeArrayCallsWrapper(this.unicodeArrayTranslatorName, this.unicodeArrayName, unicodeArray));
        }
        if (this.options['rotateUnicodeArray']) {
            this.nodes.set('unicodeArrayRotateFunctionNode', new UnicodeArrayRotateFunctionNode_1.UnicodeArrayRotateFunctionNode(this.unicodeArrayName, unicodeArray, this.unicodeArrayRotateValue));
        }
    }
}
exports.UnicodeArrayNodesGroup = UnicodeArrayNodesGroup;
