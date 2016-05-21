import * as estraverse from 'estraverse';

import { IProgramNode } from '../interfaces/nodes/IProgramNode';
import { ITreeNode } from '../interfaces/nodes/ITreeNode';

import { NodeType } from "../enums/NodeType";

import { Node } from './Node';
import { Utils } from '../Utils';

export class UnicodeArrayRotateFunctionNode extends Node {
    /**
     * @type {ITreeNode}
     */
    protected node: ITreeNode;

    /**
     * @type {ITreeNode}
     */
    private astTree: ITreeNode;

    /**
     * @type {string}
     */
    private unicodeArrayName: string;

    /**
     * @param {string}
     */
    private unicodeArrayRotateFunctionName: string;

    /**
     * @param astTree
     * @param unicodeArrayRotateFunctionName
     * @param unicodeArrayName
     */
    constructor (
        astTree: ITreeNode,
        unicodeArrayRotateFunctionName: string,
        unicodeArrayName: string
    ) {
        super();

        this.astTree = astTree;
        this.unicodeArrayRotateFunctionName = unicodeArrayRotateFunctionName;
        this.unicodeArrayName = unicodeArrayName;
        this.node = this.getNodeStructure();
    }

    public appendNode (): void {
        estraverse.replace(this.astTree, {
            leave: (node: ITreeNode, parent: ITreeNode): any => {
                switch (node.type) {
                    case NodeType.Program:
                        (<IProgramNode>node).body.push(this.getNode());

                        break;

                    default:
                        break;
                }
            }
        });
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.unicodeArrayRotateFunctionName;
    }

    /**
     * @returns any
     */
    protected getNodeStructure (): any {
        return {
            'type': NodeType.FunctionExpression,
            'id': {
                'type': NodeType.Identifier,
                'name': this.unicodeArrayRotateFunctionName
            },
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
        };
    }
}
