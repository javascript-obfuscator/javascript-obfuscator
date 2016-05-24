import { INode } from "../../interfaces/nodes/INode";

import { BlockScopeNode } from "../../types/BlockScopeNode";

import { AppendState } from "../../enums/AppendState";
import { NodeType } from "../../enums/NodeType";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from '../../Utils';

export class UnicodeArrayRotateFunctionNode extends Node {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string[]}
     */
    private unicodeArray: string[];

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
     * @param unicodeArray
     * @param unicodeArrayRotateValue
     */
    constructor (
        unicodeArrayName: string,
        unicodeArray: string[],
        unicodeArrayRotateValue
    ) {
        super();

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;

        this.node = this.getNodeStructure();
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: BlockScopeNode): void {
        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }

    /**
     * @returns {INode}
     */
    public getNode (): INode {
        if (!this.unicodeArray.length) {
            return;
        }

        return super.getNode();
    }

    /**
     * @returns any
     */
    protected getNodeStructure (): any {
        return {
            "type": NodeType.ExpressionStatement,
            "expression": {
                "type": NodeType.CallExpression,
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
                        'type': NodeType.Identifier,
                        'name': this.unicodeArrayName
                    },
                    {
                        'type': NodeType.Literal,
                        'value': this.unicodeArrayRotateValue,
                        'raw': `'${this.unicodeArrayRotateValue}'`
                    },
                    {
                        'type': NodeType.Literal,
                        'value': true,
                        'raw': 'true'
                    }
                ]
            }
        };
    }
}
