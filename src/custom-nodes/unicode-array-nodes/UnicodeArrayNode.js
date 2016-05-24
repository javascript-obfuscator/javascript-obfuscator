"use strict";
const escodegen = require('escodegen');
const estraverse = require('estraverse');
const AppendState_1 = require('../../enums/AppendState');
const NodeType_1 = require("../../enums/NodeType");
const Node_1 = require('../Node');
const NodeUtils_1 = require("../../NodeUtils");
const Utils_1 = require('../../Utils');
class UnicodeArrayNode extends Node_1.Node {
    constructor(astTree, unicodeArrayName, unicodeArrayRotateValue = 0) {
        super();
        this.appendState = AppendState_1.AppendState.AfterObfuscation;
        this.unicodeArray = [];
        this.astTree = astTree;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        this.node = this.getNodeStructure();
    }
    appendNode() {
        estraverse.replace(this.astTree, {
            leave: (node, parent) => {
                if (NodeUtils_1.NodeUtils.isProgramNode(node)) {
                    NodeUtils_1.NodeUtils.prependNode(node.body, this.getNode());
                    return estraverse.VisitorOption.Break;
                }
                return estraverse.VisitorOption.Skip;
            }
        });
    }
    getNodeIdentifier() {
        return this.unicodeArrayName;
    }
    getNodeData() {
        return this.unicodeArray;
    }
    getNode() {
        Utils_1.Utils.arrayRotate(this.unicodeArray, this.unicodeArrayRotateValue);
        this.updateNode();
        return super.getNode();
    }
    getNodeStructure() {
        return {
            'type': NodeType_1.NodeType.VariableDeclaration,
            'declarations': [
                {
                    'type': NodeType_1.NodeType.VariableDeclarator,
                    'id': {
                        'type': NodeType_1.NodeType.Identifier,
                        'name': this.unicodeArrayName
                    },
                    'init': {
                        'type': NodeType_1.NodeType.ArrayExpression,
                        'elements': this.unicodeArray.map((value) => {
                            return {
                                'type': NodeType_1.NodeType.Literal,
                                'value': value,
                                'raw': `'${value}'`,
                                'x-verbatim-property': {
                                    'content': value,
                                    precedence: escodegen.Precedence.Primary
                                }
                            };
                        })
                    }
                }
            ],
            'kind': 'var'
        };
    }
}
UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH = 4;
exports.UnicodeArrayNode = UnicodeArrayNode;
