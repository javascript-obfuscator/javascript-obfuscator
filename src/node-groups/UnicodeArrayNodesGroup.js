"use strict";
const NodesGroup_1 = require('./NodesGroup');
const UnicodeArrayNode_1 = require('../nodes/UnicodeArrayNode');
const UnicodeArrayRotateFunctionCallNode_1 = require('../nodes/UnicodeArrayRotateFunctionCallNode');
const UnicodeArrayRotateFunctionNode_1 = require('../nodes/UnicodeArrayRotateFunctionNode');
const Utils_1 = require('../Utils');
class UnicodeArrayNodesGroup extends NodesGroup_1.NodesGroup {
    constructor(astTree) {
        super();
        this.unicodeArrayRotateFunctionIdentifier = Utils_1.Utils.getRandomVariableName();
        let unicodeArrayName = Utils_1.Utils.getRandomVariableName(UnicodeArrayNode_1.UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH), unicodeArrayRotateValue = Utils_1.Utils.getRandomInteger(100, 500);
        this.nodes = new Map([
            [
                'unicodeArrayNode',
                new UnicodeArrayNode_1.UnicodeArrayNode(astTree, unicodeArrayName, unicodeArrayRotateValue)
            ],
            [
                'unicodeArrayRotateFunctionNode',
                new UnicodeArrayRotateFunctionNode_1.UnicodeArrayRotateFunctionNode(astTree, this.unicodeArrayRotateFunctionIdentifier, unicodeArrayName)
            ],
            [
                'unicodeArrayRotateFunctionCallNode',
                new UnicodeArrayRotateFunctionCallNode_1.UnicodeArrayRotateFunctionCallNode(astTree, this.unicodeArrayRotateFunctionIdentifier, unicodeArrayName, unicodeArrayRotateValue)
            ]
        ]);
    }
}
exports.UnicodeArrayNodesGroup = UnicodeArrayNodesGroup;
//# sourceMappingURL=UnicodeArrayNodesGroup.js.map