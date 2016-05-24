"use strict";
const NodesGroup_1 = require('./NodesGroup');
const UnicodeArrayNode_1 = require('../custom-nodes/unicode-array-nodes/UnicodeArrayNode');
const UnicodeArrayRotateFunctionNode_1 = require('../custom-nodes/unicode-array-nodes/UnicodeArrayRotateFunctionNode');
const Utils_1 = require('../Utils');
class UnicodeArrayNodesGroup extends NodesGroup_1.NodesGroup {
    constructor() {
        super();
        this.unicodeArrayName = Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);
        this.unicodeArrayRotateValue = Utils_1.Utils.getRandomInteger(100, 500);
        let unicodeArrayNode = new UnicodeArrayNode_1.UnicodeArrayNode(this.unicodeArrayName, this.unicodeArrayRotateValue), unicodeArray = unicodeArrayNode.getNodeData();
        this.nodes = new Map([
            [
                'unicodeArrayNode',
                unicodeArrayNode
            ],
            [
                'unicodeArrayRotateFunctionNode',
                new UnicodeArrayRotateFunctionNode_1.UnicodeArrayRotateFunctionNode(this.unicodeArrayName, unicodeArray, this.unicodeArrayRotateValue)
            ]
        ]);
    }
}
exports.UnicodeArrayNodesGroup = UnicodeArrayNodesGroup;
