"use strict";
const Node_1 = require('./Node');
const Utils_1 = require('../Utils');
const AppendState_1 = require('../enums/AppendState');
let escodegen = require('escodegen'), estraverse = require('estraverse');
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
                switch (node.type) {
                    case 'Program':
                        node.body.unshift(this.getNode());
                        break;
                }
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
        return this.node;
    }
    getNodeStructure() {
        return {
            'type': 'VariableDeclaration',
            'declarations': [
                {
                    'type': 'VariableDeclarator',
                    'id': {
                        'type': 'Identifier',
                        'name': this.unicodeArrayName
                    },
                    'init': {
                        'type': 'ArrayExpression',
                        'elements': this.unicodeArray.map((value) => {
                            return {
                                'type': 'Literal',
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
