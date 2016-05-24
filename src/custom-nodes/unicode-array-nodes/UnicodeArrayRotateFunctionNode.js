"use strict";
const AppendState_1 = require("../../enums/AppendState");
const NodeType_1 = require("../../enums/NodeType");
const Node_1 = require('../Node');
const NodeUtils_1 = require("../../NodeUtils");
const Utils_1 = require('../../Utils');
class UnicodeArrayRotateFunctionNode extends Node_1.Node {
    constructor(unicodeArrayName, unicodeArray, unicodeArrayRotateValue) {
        super();
        this.appendState = AppendState_1.AppendState.AfterObfuscation;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        this.node = this.getNodeStructure();
    }
    appendNode(blockScopeNode) {
        NodeUtils_1.NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }
    getNode() {
        if (!this.unicodeArray.length) {
            return;
        }
        return super.getNode();
    }
    getNodeStructure() {
        return {
            "type": NodeType_1.NodeType.ExpressionStatement,
            "expression": {
                "type": NodeType_1.NodeType.CallExpression,
                "callee": {
                    'type': NodeType_1.NodeType.FunctionExpression,
                    'id': null,
                    'params': [
                        {
                            'type': NodeType_1.NodeType.Identifier,
                            'name': 'array'
                        },
                        {
                            'type': NodeType_1.NodeType.Identifier,
                            'name': 'times'
                        },
                        {
                            'type': NodeType_1.NodeType.Identifier,
                            'name': 'reverse'
                        }
                    ],
                    'defaults': [],
                    'body': {
                        'type': NodeType_1.NodeType.BlockStatement,
                        'body': [
                            {
                                'type': NodeType_1.NodeType.IfStatement,
                                'test': {
                                    'type': NodeType_1.NodeType.BinaryExpression,
                                    'operator': '<',
                                    'left': {
                                        'type': NodeType_1.NodeType.Identifier,
                                        'name': 'times'
                                    },
                                    'right': {
                                        'type': NodeType_1.NodeType.Literal,
                                        'value': 0,
                                        'raw': '0'
                                    }
                                },
                                'consequent': {
                                    'type': NodeType_1.NodeType.BlockStatement,
                                    'body': [
                                        {
                                            'type': NodeType_1.NodeType.ReturnStatement,
                                            'argument': null
                                        }
                                    ]
                                },
                                'alternate': null
                            },
                            {
                                'type': NodeType_1.NodeType.ExpressionStatement,
                                'expression': {
                                    'type': NodeType_1.NodeType.AssignmentExpression,
                                    'operator': '=',
                                    'left': {
                                        'type': NodeType_1.NodeType.Identifier,
                                        'name': 'reverse'
                                    },
                                    'right': {
                                        'type': NodeType_1.NodeType.LogicalExpression,
                                        'operator': '||',
                                        'left': {
                                            'type': NodeType_1.NodeType.Identifier,
                                            'name': 'reverse'
                                        },
                                        'right': {
                                            'type': NodeType_1.NodeType.Literal,
                                            'value': false,
                                            'raw': 'false'
                                        }
                                    }
                                }
                            },
                            {
                                'type': NodeType_1.NodeType.VariableDeclaration,
                                'declarations': [
                                    {
                                        'type': NodeType_1.NodeType.VariableDeclarator,
                                        'id': {
                                            'type': NodeType_1.NodeType.Identifier,
                                            'name': 'temp'
                                        },
                                        'init': null
                                    }
                                ],
                                'kind': 'var'
                            },
                            {
                                'type': NodeType_1.NodeType.WhileStatement,
                                'test': {
                                    'type': NodeType_1.NodeType.UpdateExpression,
                                    'operator': '--',
                                    'argument': {
                                        'type': NodeType_1.NodeType.Identifier,
                                        'name': 'times'
                                    },
                                    'prefix': false
                                },
                                'body': {
                                    'type': NodeType_1.NodeType.BlockStatement,
                                    'body': [
                                        {
                                            'type': NodeType_1.NodeType.IfStatement,
                                            'test': {
                                                'type': NodeType_1.NodeType.UnaryExpression,
                                                'operator': '!',
                                                'argument': {
                                                    'type': NodeType_1.NodeType.Identifier,
                                                    'name': 'reverse'
                                                },
                                                'prefix': true
                                            },
                                            'consequent': {
                                                'type': NodeType_1.NodeType.BlockStatement,
                                                'body': [
                                                    {
                                                        'type': NodeType_1.NodeType.ExpressionStatement,
                                                        'expression': {
                                                            'type': NodeType_1.NodeType.AssignmentExpression,
                                                            'operator': '=',
                                                            'left': {
                                                                'type': NodeType_1.NodeType.Identifier,
                                                                'name': 'temp'
                                                            },
                                                            'right': {
                                                                'type': NodeType_1.NodeType.CallExpression,
                                                                'callee': {
                                                                    'type': NodeType_1.NodeType.MemberExpression,
                                                                    'computed': true,
                                                                    'object': {
                                                                        'type': NodeType_1.NodeType.Identifier,
                                                                        'name': 'array'
                                                                    },
                                                                    'property': {
                                                                        'type': NodeType_1.NodeType.Literal,
                                                                        'name': 'pop',
                                                                        'x-verbatim-property': Utils_1.Utils.stringToUnicode('pop')
                                                                    }
                                                                },
                                                                'arguments': []
                                                            }
                                                        }
                                                    },
                                                    {
                                                        'type': NodeType_1.NodeType.ExpressionStatement,
                                                        'expression': {
                                                            'type': NodeType_1.NodeType.CallExpression,
                                                            'callee': {
                                                                'type': NodeType_1.NodeType.MemberExpression,
                                                                'computed': true,
                                                                'object': {
                                                                    'type': NodeType_1.NodeType.Identifier,
                                                                    'name': 'array'
                                                                },
                                                                'property': {
                                                                    'type': NodeType_1.NodeType.Literal,
                                                                    'name': 'unshift',
                                                                    'x-verbatim-property': Utils_1.Utils.stringToUnicode('unshift')
                                                                }
                                                            },
                                                            'arguments': [
                                                                {
                                                                    'type': NodeType_1.NodeType.Identifier,
                                                                    'name': 'temp'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            'alternate': {
                                                'type': NodeType_1.NodeType.BlockStatement,
                                                'body': [
                                                    {
                                                        'type': NodeType_1.NodeType.ExpressionStatement,
                                                        'expression': {
                                                            'type': NodeType_1.NodeType.AssignmentExpression,
                                                            'operator': '=',
                                                            'left': {
                                                                'type': NodeType_1.NodeType.Identifier,
                                                                'name': 'temp'
                                                            },
                                                            'right': {
                                                                'type': NodeType_1.NodeType.CallExpression,
                                                                'callee': {
                                                                    'type': NodeType_1.NodeType.MemberExpression,
                                                                    'computed': true,
                                                                    'object': {
                                                                        'type': NodeType_1.NodeType.Identifier,
                                                                        'name': 'array'
                                                                    },
                                                                    'property': {
                                                                        'type': NodeType_1.NodeType.Literal,
                                                                        'name': 'shift',
                                                                        'x-verbatim-property': Utils_1.Utils.stringToUnicode('shift')
                                                                    }
                                                                },
                                                                'arguments': []
                                                            }
                                                        }
                                                    },
                                                    {
                                                        'type': NodeType_1.NodeType.ExpressionStatement,
                                                        'expression': {
                                                            'type': NodeType_1.NodeType.CallExpression,
                                                            'callee': {
                                                                'type': NodeType_1.NodeType.MemberExpression,
                                                                'computed': true,
                                                                'object': {
                                                                    'type': NodeType_1.NodeType.Identifier,
                                                                    'name': 'array'
                                                                },
                                                                'property': {
                                                                    'type': NodeType_1.NodeType.Literal,
                                                                    'name': 'push',
                                                                    'x-verbatim-property': Utils_1.Utils.stringToUnicode('push')
                                                                }
                                                            },
                                                            'arguments': [
                                                                {
                                                                    'type': NodeType_1.NodeType.Identifier,
                                                                    'name': 'temp'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    'generator': false,
                    'expression': false
                },
                "arguments": [
                    {
                        'type': NodeType_1.NodeType.Identifier,
                        'name': this.unicodeArrayName
                    },
                    {
                        'type': NodeType_1.NodeType.Literal,
                        'value': this.unicodeArrayRotateValue,
                        'raw': `'${this.unicodeArrayRotateValue}'`
                    },
                    {
                        'type': NodeType_1.NodeType.Literal,
                        'value': true,
                        'raw': 'true'
                    }
                ]
            }
        };
    }
}
exports.UnicodeArrayRotateFunctionNode = UnicodeArrayRotateFunctionNode;
