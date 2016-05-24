import { BlockScopeNode } from "../../types/BlockScopeNode";

import { NodeType } from "../../enums/NodeType";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from '../../Utils';

export class UnicodeArrayRotateFunctionNode extends Node {
    /**
     * @type {string}
     */
    private unicodeArrayName: string;

    /**
     * @param {number}
     */
    private unicodeArrayRotateValue: number;

    /**
     * @param unicodeArrayName
     * @param unicodeArrayRotateValue
     */
    constructor (
        unicodeArrayName: string,
        unicodeArrayRotateValue
    ) {
        super();

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;

        this.node = this.getNodeStructure();
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: BlockScopeNode): void {
        NodeUtils.prependNode(blockScopeNode.body, this.getNode());
    }

    /**
     * @returns any
     */
    protected getNodeStructure (): any {
        return {
            "type": "ExpressionStatement",
            "expression": {
                "type": "CallExpression",
                "callee": {
                    'type': NodeType.FunctionExpression,
                    'id': null,
                    'params': [
                        {
                            'type': NodeType.Identifier,
                            'name': 'array'
                        },
                        {
                            'type': NodeType.Identifier,
                            'name': 'times'
                        },
                        {
                            'type': NodeType.Identifier,
                            'name': 'reverse'
                        }
                    ],
                    'defaults': [],
                    'body': {
                        'type': NodeType.BlockStatement,
                        'body': [
                            {
                                'type': NodeType.IfStatement,
                                'test': {
                                    'type': NodeType.BinaryExpression,
                                    'operator': '<',
                                    'left': {
                                        'type': NodeType.Identifier,
                                        'name': 'times'
                                    },
                                    'right': {
                                        'type': NodeType.Literal,
                                        'value': 0,
                                        'raw': '0'
                                    }
                                },
                                'consequent': {
                                    'type': NodeType.BlockStatement,
                                    'body': [
                                        {
                                            'type': NodeType.ReturnStatement,
                                            'argument': null
                                        }
                                    ]
                                },
                                'alternate': null
                            },
                            {
                                'type': NodeType.ExpressionStatement,
                                'expression': {
                                    'type': NodeType.AssignmentExpression,
                                    'operator': '=',
                                    'left': {
                                        'type': NodeType.Identifier,
                                        'name': 'reverse'
                                    },
                                    'right': {
                                        'type': NodeType.LogicalExpression,
                                        'operator': '||',
                                        'left': {
                                            'type': NodeType.Identifier,
                                            'name': 'reverse'
                                        },
                                        'right': {
                                            'type': NodeType.Literal,
                                            'value': false,
                                            'raw': 'false'
                                        }
                                    }
                                }
                            },
                            {
                                'type': NodeType.VariableDeclaration,
                                'declarations': [
                                    {
                                        'type': NodeType.VariableDeclarator,
                                        'id': {
                                            'type': NodeType.Identifier,
                                            'name': 'temp'
                                        },
                                        'init': null
                                    }
                                ],
                                'kind': 'var'
                            },
                            {
                                'type': NodeType.WhileStatement,
                                'test': {
                                    'type': NodeType.UpdateExpression,
                                    'operator': '--',
                                    'argument': {
                                        'type': NodeType.Identifier,
                                        'name': 'times'
                                    },
                                    'prefix': false
                                },
                                'body': {
                                    'type': NodeType.BlockStatement,
                                    'body': [
                                        {
                                            'type': NodeType.IfStatement,
                                            'test': {
                                                'type': NodeType.UnaryExpression,
                                                'operator': '!',
                                                'argument': {
                                                    'type': NodeType.Identifier,
                                                    'name': 'reverse'
                                                },
                                                'prefix': true
                                            },
                                            'consequent': {
                                                'type': NodeType.BlockStatement,
                                                'body': [
                                                    {
                                                        'type': NodeType.ExpressionStatement,
                                                        'expression': {
                                                            'type': NodeType.AssignmentExpression,
                                                            'operator': '=',
                                                            'left': {
                                                                'type': NodeType.Identifier,
                                                                'name': 'temp'
                                                            },
                                                            'right': {
                                                                'type': NodeType.CallExpression,
                                                                'callee': {
                                                                    'type': NodeType.MemberExpression,
                                                                    'computed': true,
                                                                    'object': {
                                                                        'type': NodeType.Identifier,
                                                                        'name': 'array'
                                                                    },
                                                                    'property': {
                                                                        'type': NodeType.Literal,
                                                                        'name': 'pop',
                                                                        'x-verbatim-property': Utils.stringToUnicode('pop')
                                                                    }
                                                                },
                                                                'arguments': []
                                                            }
                                                        }
                                                    },
                                                    {
                                                        'type': NodeType.ExpressionStatement,
                                                        'expression': {
                                                            'type': NodeType.CallExpression,
                                                            'callee': {
                                                                'type': NodeType.MemberExpression,
                                                                'computed': true,
                                                                'object': {
                                                                    'type': NodeType.Identifier,
                                                                    'name': 'array'
                                                                },
                                                                'property': {
                                                                    'type': NodeType.Literal,
                                                                    'name': 'unshift',
                                                                    'x-verbatim-property': Utils.stringToUnicode('unshift')
                                                                }
                                                            },
                                                            'arguments': [
                                                                {
                                                                    'type': NodeType.Identifier,
                                                                    'name': 'temp'
                                                                }
                                                            ]
                                                        }
                                                    }
                                                ]
                                            },
                                            'alternate': {
                                                'type': NodeType.BlockStatement,
                                                'body': [
                                                    {
                                                        'type': NodeType.ExpressionStatement,
                                                        'expression': {
                                                            'type': NodeType.AssignmentExpression,
                                                            'operator': '=',
                                                            'left': {
                                                                'type': NodeType.Identifier,
                                                                'name': 'temp'
                                                            },
                                                            'right': {
                                                                'type': NodeType.CallExpression,
                                                                'callee': {
                                                                    'type': NodeType.MemberExpression,
                                                                    'computed': true,
                                                                    'object': {
                                                                        'type': NodeType.Identifier,
                                                                        'name': 'array'
                                                                    },
                                                                    'property': {
                                                                        'type': NodeType.Literal,
                                                                        'name': 'shift',
                                                                        'x-verbatim-property': Utils.stringToUnicode('shift')
                                                                    }
                                                                },
                                                                'arguments': []
                                                            }
                                                        }
                                                    },
                                                    {
                                                        'type': NodeType.ExpressionStatement,
                                                        'expression': {
                                                            'type': NodeType.CallExpression,
                                                            'callee': {
                                                                'type': NodeType.MemberExpression,
                                                                'computed': true,
                                                                'object': {
                                                                    'type': NodeType.Identifier,
                                                                    'name': 'array'
                                                                },
                                                                'property': {
                                                                    'type': NodeType.Literal,
                                                                    'name': 'push',
                                                                    'x-verbatim-property': Utils.stringToUnicode('push')
                                                                }
                                                            },
                                                            'arguments': [
                                                                {
                                                                    'type': NodeType.Identifier,
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
                        'type': 'Identifier',
                        'name': this.unicodeArrayName
                    },
                    {
                        'type': 'Literal',
                        'value': this.unicodeArrayRotateValue,
                        'raw': `'${this.unicodeArrayRotateValue}'`
                    },
                    {
                        'type': 'Literal',
                        'value': true,
                        'raw': 'true'
                    }
                ]
            }
        };
    }
}
