/* tslint:disable:max-line-length */

import * as estraverse from 'estraverse';

import { ITreeNode } from '../interfaces/nodes/ITreeNode';

import { NodeType } from '../enums/NodeType';

import { Node } from './Node';
import { NodeUtils } from '../NodeUtils';

export class DebugProtectionFunctionNode extends Node {
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
    private debugProtectionFunctionName: string;

    /**
     * @type {number}
     */
    private debugProtectionFunctionIndex: number;

    /**
     * @param astTree
     * @param debugProtectionFunctionName
     * @param debugProtectionFunctionIndex
     */
    constructor (
        astTree: ITreeNode,
        debugProtectionFunctionName: string,
        debugProtectionFunctionIndex: number
    ) {
        super();

        this.astTree = astTree;
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.debugProtectionFunctionIndex = debugProtectionFunctionIndex;
        this.node = this.getNodeStructure();
    }

    public appendNode (): void {
        estraverse.replace(this.astTree, {
            leave: (node: ITreeNode, parent: ITreeNode): any => {
                if (NodeUtils.isProgramNode(node)) {
                    node.body.splice(this.debugProtectionFunctionIndex, 0, this.getNode());

                    return estraverse.VisitorOption.Break;
                }

                return estraverse.VisitorOption.Skip;
            }
        });
    }

    /**
     * @returns any
     */
    protected getNodeStructure (): any {
        return {
            'type': NodeType.VariableDeclaration,
            'declarations': [
                {
                    'type': NodeType.VariableDeclarator,
                    'id': {
                        'type': NodeType.Identifier,
                        'name': this.debugProtectionFunctionName
                    },
                    'init': {
                        'type': NodeType.FunctionExpression,
                        'id': null,
                        'params': [],
                        'defaults': [],
                        'body': {
                            'type': NodeType.BlockStatement,
                            'body': [
                                {
                                    'type': NodeType.FunctionDeclaration,
                                    'id': {
                                        'type': NodeType.Identifier,
                                        'name': 'debuggerProtection'
                                    },
                                    'params': [
                                        {
                                            'type': NodeType.Identifier,
                                            'name': 'counter'
                                        }
                                    ],
                                    'defaults': [],
                                    'body': {
                                        'type': NodeType.BlockStatement,
                                        'body': [
                                            {
                                                'type': NodeType.IfStatement,
                                                'test': {
                                                    'type': NodeType.LogicalExpression,
                                                    'operator': '||',
                                                    'left': {
                                                        'type': NodeType.BinaryExpression,
                                                        'operator': '!==',
                                                        'left': {
                                                            'type': NodeType.MemberExpression,
                                                            'computed': true,
                                                            'object': {
                                                                'type': NodeType.BinaryExpression,
                                                                'operator': '+',
                                                                'left': {
                                                                    'type': NodeType.Literal,
                                                                    'value': '',
                                                                    'raw': "''"
                                                                },
                                                                'right': {
                                                                    'type': NodeType.BinaryExpression,
                                                                    'operator': '/',
                                                                    'left': {
                                                                        'type': NodeType.Identifier,
                                                                        'name': 'counter'
                                                                    },
                                                                    'right': {
                                                                        'type': NodeType.Identifier,
                                                                        'name': 'counter'
                                                                    }
                                                                }
                                                            },
                                                            'property': {
                                                                'type': NodeType.Literal,
                                                                'value': 'length',
                                                                'raw': "'length'"
                                                            }
                                                        },
                                                        'right': {
                                                            'type': NodeType.Literal,
                                                            'value': 1,
                                                            'raw': "1"
                                                        }
                                                    },
                                                    'right': {
                                                        'type': NodeType.BinaryExpression,
                                                        'operator': '===',
                                                        'left': {
                                                            'type': NodeType.BinaryExpression,
                                                            'operator': '%',
                                                            'left': {
                                                                'type': NodeType.Identifier,
                                                                'name': 'counter'
                                                            },
                                                            'right': {
                                                                'type': NodeType.Literal,
                                                                'value': 20,
                                                                'raw': "20"
                                                            }
                                                        },
                                                        'right': {
                                                            'type': NodeType.Literal,
                                                            'value': 0,
                                                            'raw': "0"
                                                        }
                                                    }
                                                },
                                                'consequent': {
                                                    'type': NodeType.BlockStatement,
                                                    'body': [
                                                        {
                                                            'type': NodeType.ExpressionStatement,
                                                            'expression': {
                                                                'type': NodeType.CallExpression,
                                                                'callee': {
                                                                    'type': NodeType.CallExpression,
                                                                    'callee': {
                                                                        'type': NodeType.MemberExpression,
                                                                        'computed': false,
                                                                        'object': {
                                                                            'type': NodeType.FunctionExpression,
                                                                            'id': null,
                                                                            'params': [],
                                                                            'defaults': [],
                                                                            'body': {
                                                                                'type': NodeType.BlockStatement,
                                                                                'body': []
                                                                            },
                                                                            'generator': false,
                                                                            'expression': false
                                                                        },
                                                                        'property': {
                                                                            'type': NodeType.Identifier,
                                                                            'name': 'constructor'
                                                                        }
                                                                    },
                                                                    'arguments': [
                                                                        {
                                                                            'type': NodeType.Literal,
                                                                            'value': 'debugger',
                                                                            'raw': "'debugger'"
                                                                        }
                                                                    ]
                                                                },
                                                                'arguments': []
                                                            }
                                                        }
                                                    ]
                                                },
                                                'alternate': {
                                                    'type': NodeType.BlockStatement,
                                                    'body': [
                                                        {
                                                            'type': NodeType.VariableDeclaration,
                                                            'declarations': [
                                                                {
                                                                    'type': NodeType.VariableDeclarator,
                                                                    'id': {
                                                                        'type': NodeType.Identifier,
                                                                        'name': '_0x793b'
                                                                    },
                                                                    'init': {
                                                                        'type': NodeType.ArrayExpression,
                                                                        'elements': [
                                                                            {
                                                                                'type': NodeType.Literal,
                                                                                'value': 'filter',
                                                                                'raw': "'\\u0066\\u0069\\u006c\\u0074\\u0065\\u0072'"
                                                                            },
                                                                            {
                                                                                'type': NodeType.Literal,
                                                                                'value': 'constructor',
                                                                                'raw': "'\\u0063\\u006f\\u006e\\u0073\\u0074\\u0072\\u0075\\u0063\\u0074\\u006f\\u0072'"
                                                                            },
                                                                            {
                                                                                'type': NodeType.Literal,
                                                                                'value': '',
                                                                                'raw': "''"
                                                                            },
                                                                            {
                                                                                'type': NodeType.Literal,
                                                                                'value': 'return{}',
                                                                                'raw': "'\\u0072\\u0065\\u0074\\u0075\\u0072\\u006e\\u007b\\u007d'"
                                                                            }
                                                                        ]
                                                                    }
                                                                }
                                                            ],
                                                            'kind': 'var'
                                                        },
                                                        {
                                                            'type': NodeType.ExpressionStatement,
                                                            'expression': {
                                                                'type': NodeType.CallExpression,
                                                                'callee': {
                                                                    'type': NodeType.CallExpression,
                                                                    'callee': {
                                                                        'type': NodeType.MemberExpression,
                                                                        'computed': true,
                                                                        'object': {
                                                                            'type': NodeType.MemberExpression,
                                                                            'computed': true,
                                                                            'object': {
                                                                                'type': NodeType.ArrayExpression,
                                                                                'elements': []
                                                                            },
                                                                            'property': {
                                                                                'type': NodeType.MemberExpression,
                                                                                'computed': true,
                                                                                'object': {
                                                                                    'type': NodeType.Identifier,
                                                                                    'name': '_0x793b'
                                                                                },
                                                                                'property': {
                                                                                    'type': NodeType.Literal,
                                                                                    'value': 0,
                                                                                    'raw': "0x0"
                                                                                }
                                                                            }
                                                                        },
                                                                        'property': {
                                                                            'type': NodeType.MemberExpression,
                                                                            'computed': true,
                                                                            'object': {
                                                                                'type': NodeType.Identifier,
                                                                                'name': '_0x793b'
                                                                            },
                                                                            'property': {
                                                                                'type': NodeType.Literal,
                                                                                'value': 1,
                                                                                'raw': "0x1"
                                                                            }
                                                                        }
                                                                    },
                                                                    'arguments': [
                                                                        {
                                                                            'type': NodeType.BinaryExpression,
                                                                            'operator': '+',
                                                                            'left': {
                                                                                'type': NodeType.BinaryExpression,
                                                                                'operator': '+',
                                                                                'left': {
                                                                                    'type': NodeType.BinaryExpression,
                                                                                    'operator': '+',
                                                                                    'left': {
                                                                                        'type': NodeType.BinaryExpression,
                                                                                        'operator': '+',
                                                                                        'left': {
                                                                                            'type': NodeType.BinaryExpression,
                                                                                            'operator': '+',
                                                                                            'left': {
                                                                                                'type': NodeType.BinaryExpression,
                                                                                                'operator': '+',
                                                                                                'left': {
                                                                                                    'type': NodeType.BinaryExpression,
                                                                                                    'operator': '+',
                                                                                                    'left': {
                                                                                                        'type': NodeType.MemberExpression,
                                                                                                        'computed': true,
                                                                                                        'object': {
                                                                                                            'type': NodeType.BinaryExpression,
                                                                                                            'operator': '+',
                                                                                                            'left': {
                                                                                                                'type': NodeType.Identifier,
                                                                                                                'name': 'undefined'
                                                                                                            },
                                                                                                            'right': {
                                                                                                                'type': NodeType.MemberExpression,
                                                                                                                'computed': true,
                                                                                                                'object': {
                                                                                                                    'type': NodeType.Identifier,
                                                                                                                    'name': '_0x793b'
                                                                                                                },
                                                                                                                'property': {
                                                                                                                    'type': NodeType.Literal,
                                                                                                                    'value': 2,
                                                                                                                    'raw': "0x2"
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        'property': {
                                                                                                            'type': NodeType.Literal,
                                                                                                            'value': 2,
                                                                                                            'raw': "0x2"
                                                                                                        }
                                                                                                    },
                                                                                                    'right': {
                                                                                                        'type': NodeType.MemberExpression,
                                                                                                        'computed': true,
                                                                                                        'object': {
                                                                                                            'type': NodeType.BinaryExpression,
                                                                                                            'operator': '+',
                                                                                                            'left': {
                                                                                                                'type': NodeType.UnaryExpression,
                                                                                                                'operator': '!',
                                                                                                                'argument': {
                                                                                                                    'type': NodeType.UnaryExpression,
                                                                                                                    'operator': '!',
                                                                                                                    'argument': {
                                                                                                                        'type': NodeType.ArrayExpression,
                                                                                                                        'elements': []
                                                                                                                    },
                                                                                                                    'prefix': true
                                                                                                                },
                                                                                                                'prefix': true
                                                                                                            },
                                                                                                            'right': {
                                                                                                                'type': NodeType.MemberExpression,
                                                                                                                'computed': true,
                                                                                                                'object': {
                                                                                                                    'type': NodeType.Identifier,
                                                                                                                    'name': '_0x793b'
                                                                                                                },
                                                                                                                'property': {
                                                                                                                    'type': NodeType.Literal,
                                                                                                                    'value': 2,
                                                                                                                    'raw': "0x2"
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        'property': {
                                                                                                            'type': NodeType.Literal,
                                                                                                            'value': 3,
                                                                                                            'raw': "0x3"
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                'right': {
                                                                                                    'type': NodeType.MemberExpression,
                                                                                                    'computed': true,
                                                                                                    'object': {
                                                                                                        'type': NodeType.BinaryExpression,
                                                                                                        'operator': '+',
                                                                                                        'left': {
                                                                                                            'type': NodeType.CallExpression,
                                                                                                            'callee': {
                                                                                                                'type': NodeType.CallExpression,
                                                                                                                'callee': {
                                                                                                                    'type': NodeType.Identifier,
                                                                                                                    'name': 'Function'
                                                                                                                },
                                                                                                                'arguments': [
                                                                                                                    {
                                                                                                                        'type': NodeType.MemberExpression,
                                                                                                                        'computed': true,
                                                                                                                        'object': {
                                                                                                                            'type': NodeType.Identifier,
                                                                                                                            'name': '_0x793b'
                                                                                                                        },
                                                                                                                        'property': {
                                                                                                                            'type': NodeType.Literal,
                                                                                                                            'value': 3,
                                                                                                                            'raw': "0x3"
                                                                                                                        }
                                                                                                                    }
                                                                                                                ]
                                                                                                            },
                                                                                                            'arguments': []
                                                                                                        },
                                                                                                        'right': {
                                                                                                            'type': NodeType.MemberExpression,
                                                                                                            'computed': true,
                                                                                                            'object': {
                                                                                                                'type': NodeType.Identifier,
                                                                                                                'name': '_0x793b'
                                                                                                            },
                                                                                                            'property': {
                                                                                                                'type': NodeType.Literal,
                                                                                                                'value': 2,
                                                                                                                'raw': "0x2"
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    'property': {
                                                                                                        'type': NodeType.Literal,
                                                                                                        'value': 2,
                                                                                                        'raw': "0x2"
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            'right': {
                                                                                                'type': NodeType.MemberExpression,
                                                                                                'computed': true,
                                                                                                'object': {
                                                                                                    'type': NodeType.BinaryExpression,
                                                                                                    'operator': '+',
                                                                                                    'left': {
                                                                                                        'type': NodeType.Identifier,
                                                                                                        'name': 'undefined'
                                                                                                    },
                                                                                                    'right': {
                                                                                                        'type': NodeType.MemberExpression,
                                                                                                        'computed': true,
                                                                                                        'object': {
                                                                                                            'type': NodeType.Identifier,
                                                                                                            'name': '_0x793b'
                                                                                                        },
                                                                                                        'property': {
                                                                                                            'type': NodeType.Literal,
                                                                                                            'value': 2,
                                                                                                            'raw': "0x2"
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                'property': {
                                                                                                    'type': NodeType.Literal,
                                                                                                    'value': 0,
                                                                                                    'raw': "0x0"
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        'right': {
                                                                                            'type': NodeType.MemberExpression,
                                                                                            'computed': true,
                                                                                            'object': {
                                                                                                'type': NodeType.BinaryExpression,
                                                                                                'operator': '+',
                                                                                                'left': {
                                                                                                    'type': NodeType.BinaryExpression,
                                                                                                    'operator': '+',
                                                                                                    'left': {
                                                                                                        'type': NodeType.UnaryExpression,
                                                                                                        'operator': '!',
                                                                                                        'argument': {
                                                                                                            'type': NodeType.ArrayExpression,
                                                                                                            'elements': []
                                                                                                        },
                                                                                                        'prefix': true
                                                                                                    },
                                                                                                    'right': {
                                                                                                        'type': NodeType.ArrayExpression,
                                                                                                        'elements': [
                                                                                                            {
                                                                                                                'type': NodeType.Literal,
                                                                                                                'value': 0,
                                                                                                                'raw': "0x0"
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                },
                                                                                                'right': {
                                                                                                    'type': NodeType.Identifier,
                                                                                                    'name': 'String'
                                                                                                }
                                                                                            },
                                                                                            'property': {
                                                                                                'type': NodeType.Literal,
                                                                                                'value': 20,
                                                                                                'raw': "0x14"
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    'right': {
                                                                                        'type': NodeType.MemberExpression,
                                                                                        'computed': true,
                                                                                        'object': {
                                                                                            'type': NodeType.BinaryExpression,
                                                                                            'operator': '+',
                                                                                            'left': {
                                                                                                'type': NodeType.BinaryExpression,
                                                                                                'operator': '+',
                                                                                                'left': {
                                                                                                    'type': NodeType.UnaryExpression,
                                                                                                    'operator': '!',
                                                                                                    'argument': {
                                                                                                        'type': NodeType.ArrayExpression,
                                                                                                        'elements': []
                                                                                                    },
                                                                                                    'prefix': true
                                                                                                },
                                                                                                'right': {
                                                                                                    'type': NodeType.ArrayExpression,
                                                                                                    'elements': [
                                                                                                        {
                                                                                                            'type': NodeType.Literal,
                                                                                                            'value': 0,
                                                                                                            'raw': "0x0"
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            },
                                                                                            'right': {
                                                                                                'type': NodeType.Identifier,
                                                                                                'name': 'String'
                                                                                            }
                                                                                        },
                                                                                        'property': {
                                                                                            'type': NodeType.Literal,
                                                                                            'value': 20,
                                                                                            'raw': "0x14"
                                                                                        }
                                                                                    }
                                                                                },
                                                                                'right': {
                                                                                    'type': NodeType.MemberExpression,
                                                                                    'computed': true,
                                                                                    'object': {
                                                                                        'type': NodeType.BinaryExpression,
                                                                                        'operator': '+',
                                                                                        'left': {
                                                                                            'type': NodeType.UnaryExpression,
                                                                                            'operator': '!',
                                                                                            'argument': {
                                                                                                'type': NodeType.UnaryExpression,
                                                                                                'operator': '!',
                                                                                                'argument': {
                                                                                                    'type': NodeType.ArrayExpression,
                                                                                                    'elements': []
                                                                                                },
                                                                                                'prefix': true
                                                                                            },
                                                                                            'prefix': true
                                                                                        },
                                                                                        'right': {
                                                                                            'type': NodeType.MemberExpression,
                                                                                            'computed': true,
                                                                                            'object': {
                                                                                                'type': NodeType.Identifier,
                                                                                                'name': '_0x793b'
                                                                                            },
                                                                                            'property': {
                                                                                                'type': NodeType.Literal,
                                                                                                'value': 2,
                                                                                                'raw': "0x2"
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    'property': {
                                                                                        'type': NodeType.Literal,
                                                                                        'value': 3,
                                                                                        'raw': "0x3"
                                                                                    }
                                                                                }
                                                                            },
                                                                            'right': {
                                                                                'type': NodeType.MemberExpression,
                                                                                'computed': true,
                                                                                'object': {
                                                                                    'type': NodeType.BinaryExpression,
                                                                                    'operator': '+',
                                                                                    'left': {
                                                                                        'type': NodeType.UnaryExpression,
                                                                                        'operator': '!',
                                                                                        'argument': {
                                                                                            'type': NodeType.UnaryExpression,
                                                                                            'operator': '!',
                                                                                            'argument': {
                                                                                                'type': NodeType.ArrayExpression,
                                                                                                'elements': []
                                                                                            },
                                                                                            'prefix': true
                                                                                        },
                                                                                        'prefix': true
                                                                                    },
                                                                                    'right': {
                                                                                        'type': NodeType.MemberExpression,
                                                                                        'computed': true,
                                                                                        'object': {
                                                                                            'type': NodeType.Identifier,
                                                                                            'name': '_0x793b'
                                                                                        },
                                                                                        'property': {
                                                                                            'type': NodeType.Literal,
                                                                                            'value': 2,
                                                                                            'raw': "0x2"
                                                                                        }
                                                                                    }
                                                                                },
                                                                                'property': {
                                                                                    'type': NodeType.Literal,
                                                                                    'value': 1,
                                                                                    'raw': "0x1"
                                                                                }
                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                'arguments': []
                                                            }
                                                        }
                                                    ]
                                                }
                                            },
                                            {
                                                'type': NodeType.ExpressionStatement,
                                                'expression': {
                                                    'type': NodeType.CallExpression,
                                                    'callee': {
                                                        'type': NodeType.Identifier,
                                                        'name': 'debuggerProtection'
                                                    },
                                                    'arguments': [
                                                        {
                                                            'type': NodeType.UpdateExpression,
                                                            'operator': '++',
                                                            'argument': {
                                                                'type': NodeType.Identifier,
                                                                'name': 'counter'
                                                            },
                                                            'prefix': true
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    'generator': false,
                                    'expression': false
                                },
                                {
                                    'type': NodeType.TryStatement,
                                    'block': {
                                        'type': NodeType.BlockStatement,
                                        'body': [
                                            {
                                                'type': NodeType.ExpressionStatement,
                                                'expression': {
                                                    'type': NodeType.CallExpression,
                                                    'callee': {
                                                        'type': NodeType.Identifier,
                                                        'name': 'debuggerProtection'
                                                    },
                                                    'arguments': [
                                                        {
                                                            'type': NodeType.Literal,
                                                            'value': 0,
                                                            'raw': "0"
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    },
                                    'guardedHandlers': [],
                                    'handlers': [
                                        {
                                            'type': NodeType.CatchClause,
                                            'param': {
                                                'type': NodeType.Identifier,
                                                'name': 'y'
                                            },
                                            'body': {
                                                'type': NodeType.BlockStatement,
                                                'body': []
                                            }
                                        }
                                    ],
                                    'handler': {
                                        'type': NodeType.CatchClause,
                                        'param': {
                                            'type': NodeType.Identifier,
                                            'name': 'y'
                                        },
                                        'body': {
                                            'type': NodeType.BlockStatement,
                                            'body': []
                                        }
                                    },
                                    'finalizer': null
                                }
                            ]
                        },
                        'generator': false,
                        'expression': false
                    }
                }
            ],
            'kind': 'var'
        };
    }
}
