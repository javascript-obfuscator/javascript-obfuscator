"use strict";
const Node_1 = require('./Node');
const Utils_1 = require('../Utils');
let estraverse = require('estraverse');
class UnicodeArrayRotateFunctionNode extends Node_1.Node {
    constructor(astTree, unicodeArrayRotateFunctionName, unicodeArrayName) {
        super();
        this.astTree = astTree;
        this.unicodeArrayRotateFunctionName = unicodeArrayRotateFunctionName;
        this.unicodeArrayName = unicodeArrayName;
        this.node = this.getNodeStructure();
    }
    appendNode() {
        estraverse.replace(this.astTree, {
            leave: (node, parent) => {
                switch (node.type) {
                    case 'Program':
                        node.body.push(this.getNode());
                        break;
                }
            }
        });
    }
    getNodeIdentifier() {
        return this.unicodeArrayRotateFunctionName;
    }
    getNodeStructure() {
        return {
            'type': 'FunctionExpression',
            'id': {
                'type': 'Identifier',
                'name': this.unicodeArrayRotateFunctionName
            },
            'params': [
                {
                    'type': 'Identifier',
                    'name': 'array'
                },
                {
                    'type': 'Identifier',
                    'name': 'times'
                },
                {
                    'type': 'Identifier',
                    'name': 'reverse'
                }
            ],
            'defaults': [],
            'body': {
                'type': 'BlockStatement',
                'body': [
                    {
                        'type': 'IfStatement',
                        'test': {
                            'type': 'BinaryExpression',
                            'operator': '<',
                            'left': {
                                'type': 'Identifier',
                                'name': 'times'
                            },
                            'right': {
                                'type': 'Literal',
                                'value': 0,
                                'raw': '0'
                            }
                        },
                        'consequent': {
                            'type': 'BlockStatement',
                            'body': [
                                {
                                    'type': 'ReturnStatement',
                                    'argument': null
                                }
                            ]
                        },
                        'alternate': null
                    },
                    {
                        'type': 'ExpressionStatement',
                        'expression': {
                            'type': 'AssignmentExpression',
                            'operator': '=',
                            'left': {
                                'type': 'Identifier',
                                'name': 'reverse'
                            },
                            'right': {
                                'type': 'LogicalExpression',
                                'operator': '||',
                                'left': {
                                    'type': 'Identifier',
                                    'name': 'reverse'
                                },
                                'right': {
                                    'type': 'Literal',
                                    'value': false,
                                    'raw': 'false'
                                }
                            }
                        }
                    },
                    {
                        'type': 'VariableDeclaration',
                        'declarations': [
                            {
                                'type': 'VariableDeclarator',
                                'id': {
                                    'type': 'Identifier',
                                    'name': 'temp'
                                },
                                'init': null
                            }
                        ],
                        'kind': 'var'
                    },
                    {
                        'type': 'WhileStatement',
                        'test': {
                            'type': 'UpdateExpression',
                            'operator': '--',
                            'argument': {
                                'type': 'Identifier',
                                'name': 'times'
                            },
                            'prefix': false
                        },
                        'body': {
                            'type': 'BlockStatement',
                            'body': [
                                {
                                    'type': 'IfStatement',
                                    'test': {
                                        'type': 'UnaryExpression',
                                        'operator': '!',
                                        'argument': {
                                            'type': 'Identifier',
                                            'name': 'reverse'
                                        },
                                        'prefix': true
                                    },
                                    'consequent': {
                                        'type': 'BlockStatement',
                                        'body': [
                                            {
                                                'type': 'ExpressionStatement',
                                                'expression': {
                                                    'type': 'AssignmentExpression',
                                                    'operator': '=',
                                                    'left': {
                                                        'type': 'Identifier',
                                                        'name': 'temp'
                                                    },
                                                    'right': {
                                                        'type': 'CallExpression',
                                                        'callee': {
                                                            'type': 'MemberExpression',
                                                            'computed': true,
                                                            'object': {
                                                                'type': 'Identifier',
                                                                'name': 'array'
                                                            },
                                                            'property': {
                                                                'type': 'Literal',
                                                                'name': 'pop',
                                                                'x-verbatim-property': Utils_1.Utils.stringToUnicode('pop')
                                                            }
                                                        },
                                                        'arguments': []
                                                    }
                                                }
                                            },
                                            {
                                                'type': 'ExpressionStatement',
                                                'expression': {
                                                    'type': 'CallExpression',
                                                    'callee': {
                                                        'type': 'MemberExpression',
                                                        'computed': true,
                                                        'object': {
                                                            'type': 'Identifier',
                                                            'name': 'array'
                                                        },
                                                        'property': {
                                                            'type': 'Literal',
                                                            'name': 'unshift',
                                                            'x-verbatim-property': Utils_1.Utils.stringToUnicode('unshift')
                                                        }
                                                    },
                                                    'arguments': [
                                                        {
                                                            'type': 'Identifier',
                                                            'name': 'temp'
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    'alternate': {
                                        'type': 'BlockStatement',
                                        'body': [
                                            {
                                                'type': 'ExpressionStatement',
                                                'expression': {
                                                    'type': 'AssignmentExpression',
                                                    'operator': '=',
                                                    'left': {
                                                        'type': 'Identifier',
                                                        'name': 'temp'
                                                    },
                                                    'right': {
                                                        'type': 'CallExpression',
                                                        'callee': {
                                                            'type': 'MemberExpression',
                                                            'computed': true,
                                                            'object': {
                                                                'type': 'Identifier',
                                                                'name': 'array'
                                                            },
                                                            'property': {
                                                                'type': 'Literal',
                                                                'name': 'shift',
                                                                'x-verbatim-property': Utils_1.Utils.stringToUnicode('shift')
                                                            }
                                                        },
                                                        'arguments': []
                                                    }
                                                }
                                            },
                                            {
                                                'type': 'ExpressionStatement',
                                                'expression': {
                                                    'type': 'CallExpression',
                                                    'callee': {
                                                        'type': 'MemberExpression',
                                                        'computed': true,
                                                        'object': {
                                                            'type': 'Identifier',
                                                            'name': 'array'
                                                        },
                                                        'property': {
                                                            'type': 'Literal',
                                                            'name': 'push',
                                                            'x-verbatim-property': Utils_1.Utils.stringToUnicode('push')
                                                        }
                                                    },
                                                    'arguments': [
                                                        {
                                                            'type': 'Identifier',
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
        };
    }
}
exports.UnicodeArrayRotateFunctionNode = UnicodeArrayRotateFunctionNode;
//# sourceMappingURL=UnicodeArrayRotateFunctionNode.js.map