"use strict";
const estraverse = require('estraverse');
const NodeType_1 = require('../enums/NodeType');
const Node_1 = require('./Node');
const NodeUtils_1 = require('../NodeUtils');
class DebugProtectionFunctionNode extends Node_1.Node {
    constructor(astTree, debugProtectionFunctionName, debugProtectionFunctionIndex) {
        super();
        this.astTree = astTree;
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.debugProtectionFunctionIndex = debugProtectionFunctionIndex;
        this.node = this.getNodeStructure();
    }
    appendNode() {
        estraverse.replace(this.astTree, {
            leave: (node, parent) => {
                if (NodeUtils_1.NodeUtils.isProgramNode(node)) {
                    node.body.splice(this.debugProtectionFunctionIndex, 0, this.getNode());
                    return estraverse.VisitorOption.Break;
                }
                return estraverse.VisitorOption.Skip;
            }
        });
    }
    getNodeStructure() {
        return {
            'type': NodeType_1.NodeType.VariableDeclaration,
            'declarations': [
                {
                    'type': NodeType_1.NodeType.VariableDeclarator,
                    'id': {
                        'type': NodeType_1.NodeType.Identifier,
                        'name': this.debugProtectionFunctionName
                    },
                    'init': {
                        'type': NodeType_1.NodeType.FunctionExpression,
                        'id': null,
                        'params': [],
                        'defaults': [],
                        'body': {
                            'type': NodeType_1.NodeType.BlockStatement,
                            'body': [
                                {
                                    'type': NodeType_1.NodeType.FunctionDeclaration,
                                    'id': {
                                        'type': NodeType_1.NodeType.Identifier,
                                        'name': 'debuggerProtection'
                                    },
                                    'params': [
                                        {
                                            'type': NodeType_1.NodeType.Identifier,
                                            'name': 'counter'
                                        }
                                    ],
                                    'defaults': [],
                                    'body': {
                                        'type': NodeType_1.NodeType.BlockStatement,
                                        'body': [
                                            {
                                                'type': NodeType_1.NodeType.IfStatement,
                                                'test': {
                                                    'type': NodeType_1.NodeType.LogicalExpression,
                                                    'operator': '||',
                                                    'left': {
                                                        'type': NodeType_1.NodeType.BinaryExpression,
                                                        'operator': '!==',
                                                        'left': {
                                                            'type': NodeType_1.NodeType.MemberExpression,
                                                            'computed': true,
                                                            'object': {
                                                                'type': NodeType_1.NodeType.BinaryExpression,
                                                                'operator': '+',
                                                                'left': {
                                                                    'type': NodeType_1.NodeType.Literal,
                                                                    'value': '',
                                                                    'raw': "''"
                                                                },
                                                                'right': {
                                                                    'type': NodeType_1.NodeType.BinaryExpression,
                                                                    'operator': '/',
                                                                    'left': {
                                                                        'type': NodeType_1.NodeType.Identifier,
                                                                        'name': 'counter'
                                                                    },
                                                                    'right': {
                                                                        'type': NodeType_1.NodeType.Identifier,
                                                                        'name': 'counter'
                                                                    }
                                                                }
                                                            },
                                                            'property': {
                                                                'type': NodeType_1.NodeType.Literal,
                                                                'value': 'length',
                                                                'raw': "'length'"
                                                            }
                                                        },
                                                        'right': {
                                                            'type': NodeType_1.NodeType.Literal,
                                                            'value': 1,
                                                            'raw': "1"
                                                        }
                                                    },
                                                    'right': {
                                                        'type': NodeType_1.NodeType.BinaryExpression,
                                                        'operator': '===',
                                                        'left': {
                                                            'type': NodeType_1.NodeType.BinaryExpression,
                                                            'operator': '%',
                                                            'left': {
                                                                'type': NodeType_1.NodeType.Identifier,
                                                                'name': 'counter'
                                                            },
                                                            'right': {
                                                                'type': NodeType_1.NodeType.Literal,
                                                                'value': 20,
                                                                'raw': "20"
                                                            }
                                                        },
                                                        'right': {
                                                            'type': NodeType_1.NodeType.Literal,
                                                            'value': 0,
                                                            'raw': "0"
                                                        }
                                                    }
                                                },
                                                'consequent': {
                                                    'type': NodeType_1.NodeType.BlockStatement,
                                                    'body': [
                                                        {
                                                            'type': NodeType_1.NodeType.ExpressionStatement,
                                                            'expression': {
                                                                'type': NodeType_1.NodeType.CallExpression,
                                                                'callee': {
                                                                    'type': NodeType_1.NodeType.CallExpression,
                                                                    'callee': {
                                                                        'type': NodeType_1.NodeType.MemberExpression,
                                                                        'computed': false,
                                                                        'object': {
                                                                            'type': NodeType_1.NodeType.FunctionExpression,
                                                                            'id': null,
                                                                            'params': [],
                                                                            'defaults': [],
                                                                            'body': {
                                                                                'type': NodeType_1.NodeType.BlockStatement,
                                                                                'body': []
                                                                            },
                                                                            'generator': false,
                                                                            'expression': false
                                                                        },
                                                                        'property': {
                                                                            'type': NodeType_1.NodeType.Identifier,
                                                                            'name': 'constructor'
                                                                        }
                                                                    },
                                                                    'arguments': [
                                                                        {
                                                                            'type': NodeType_1.NodeType.Literal,
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
                                                    'type': NodeType_1.NodeType.BlockStatement,
                                                    'body': [
                                                        {
                                                            'type': NodeType_1.NodeType.VariableDeclaration,
                                                            'declarations': [
                                                                {
                                                                    'type': NodeType_1.NodeType.VariableDeclarator,
                                                                    'id': {
                                                                        'type': NodeType_1.NodeType.Identifier,
                                                                        'name': '_0x793b'
                                                                    },
                                                                    'init': {
                                                                        'type': NodeType_1.NodeType.ArrayExpression,
                                                                        'elements': [
                                                                            {
                                                                                'type': NodeType_1.NodeType.Literal,
                                                                                'value': 'filter',
                                                                                'raw': "'\\u0066\\u0069\\u006c\\u0074\\u0065\\u0072'"
                                                                            },
                                                                            {
                                                                                'type': NodeType_1.NodeType.Literal,
                                                                                'value': 'constructor',
                                                                                'raw': "'\\u0063\\u006f\\u006e\\u0073\\u0074\\u0072\\u0075\\u0063\\u0074\\u006f\\u0072'"
                                                                            },
                                                                            {
                                                                                'type': NodeType_1.NodeType.Literal,
                                                                                'value': '',
                                                                                'raw': "''"
                                                                            },
                                                                            {
                                                                                'type': NodeType_1.NodeType.Literal,
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
                                                            'type': NodeType_1.NodeType.ExpressionStatement,
                                                            'expression': {
                                                                'type': NodeType_1.NodeType.CallExpression,
                                                                'callee': {
                                                                    'type': NodeType_1.NodeType.CallExpression,
                                                                    'callee': {
                                                                        'type': NodeType_1.NodeType.MemberExpression,
                                                                        'computed': true,
                                                                        'object': {
                                                                            'type': NodeType_1.NodeType.MemberExpression,
                                                                            'computed': true,
                                                                            'object': {
                                                                                'type': NodeType_1.NodeType.ArrayExpression,
                                                                                'elements': []
                                                                            },
                                                                            'property': {
                                                                                'type': NodeType_1.NodeType.MemberExpression,
                                                                                'computed': true,
                                                                                'object': {
                                                                                    'type': NodeType_1.NodeType.Identifier,
                                                                                    'name': '_0x793b'
                                                                                },
                                                                                'property': {
                                                                                    'type': NodeType_1.NodeType.Literal,
                                                                                    'value': 0,
                                                                                    'raw': "0x0"
                                                                                }
                                                                            }
                                                                        },
                                                                        'property': {
                                                                            'type': NodeType_1.NodeType.MemberExpression,
                                                                            'computed': true,
                                                                            'object': {
                                                                                'type': NodeType_1.NodeType.Identifier,
                                                                                'name': '_0x793b'
                                                                            },
                                                                            'property': {
                                                                                'type': NodeType_1.NodeType.Literal,
                                                                                'value': 1,
                                                                                'raw': "0x1"
                                                                            }
                                                                        }
                                                                    },
                                                                    'arguments': [
                                                                        {
                                                                            'type': NodeType_1.NodeType.BinaryExpression,
                                                                            'operator': '+',
                                                                            'left': {
                                                                                'type': NodeType_1.NodeType.BinaryExpression,
                                                                                'operator': '+',
                                                                                'left': {
                                                                                    'type': NodeType_1.NodeType.BinaryExpression,
                                                                                    'operator': '+',
                                                                                    'left': {
                                                                                        'type': NodeType_1.NodeType.BinaryExpression,
                                                                                        'operator': '+',
                                                                                        'left': {
                                                                                            'type': NodeType_1.NodeType.BinaryExpression,
                                                                                            'operator': '+',
                                                                                            'left': {
                                                                                                'type': NodeType_1.NodeType.BinaryExpression,
                                                                                                'operator': '+',
                                                                                                'left': {
                                                                                                    'type': NodeType_1.NodeType.BinaryExpression,
                                                                                                    'operator': '+',
                                                                                                    'left': {
                                                                                                        'type': NodeType_1.NodeType.MemberExpression,
                                                                                                        'computed': true,
                                                                                                        'object': {
                                                                                                            'type': NodeType_1.NodeType.BinaryExpression,
                                                                                                            'operator': '+',
                                                                                                            'left': {
                                                                                                                'type': NodeType_1.NodeType.Identifier,
                                                                                                                'name': 'undefined'
                                                                                                            },
                                                                                                            'right': {
                                                                                                                'type': NodeType_1.NodeType.MemberExpression,
                                                                                                                'computed': true,
                                                                                                                'object': {
                                                                                                                    'type': NodeType_1.NodeType.Identifier,
                                                                                                                    'name': '_0x793b'
                                                                                                                },
                                                                                                                'property': {
                                                                                                                    'type': NodeType_1.NodeType.Literal,
                                                                                                                    'value': 2,
                                                                                                                    'raw': "0x2"
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        'property': {
                                                                                                            'type': NodeType_1.NodeType.Literal,
                                                                                                            'value': 2,
                                                                                                            'raw': "0x2"
                                                                                                        }
                                                                                                    },
                                                                                                    'right': {
                                                                                                        'type': NodeType_1.NodeType.MemberExpression,
                                                                                                        'computed': true,
                                                                                                        'object': {
                                                                                                            'type': NodeType_1.NodeType.BinaryExpression,
                                                                                                            'operator': '+',
                                                                                                            'left': {
                                                                                                                'type': NodeType_1.NodeType.UnaryExpression,
                                                                                                                'operator': '!',
                                                                                                                'argument': {
                                                                                                                    'type': NodeType_1.NodeType.UnaryExpression,
                                                                                                                    'operator': '!',
                                                                                                                    'argument': {
                                                                                                                        'type': NodeType_1.NodeType.ArrayExpression,
                                                                                                                        'elements': []
                                                                                                                    },
                                                                                                                    'prefix': true
                                                                                                                },
                                                                                                                'prefix': true
                                                                                                            },
                                                                                                            'right': {
                                                                                                                'type': NodeType_1.NodeType.MemberExpression,
                                                                                                                'computed': true,
                                                                                                                'object': {
                                                                                                                    'type': NodeType_1.NodeType.Identifier,
                                                                                                                    'name': '_0x793b'
                                                                                                                },
                                                                                                                'property': {
                                                                                                                    'type': NodeType_1.NodeType.Literal,
                                                                                                                    'value': 2,
                                                                                                                    'raw': "0x2"
                                                                                                                }
                                                                                                            }
                                                                                                        },
                                                                                                        'property': {
                                                                                                            'type': NodeType_1.NodeType.Literal,
                                                                                                            'value': 3,
                                                                                                            'raw': "0x3"
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                'right': {
                                                                                                    'type': NodeType_1.NodeType.MemberExpression,
                                                                                                    'computed': true,
                                                                                                    'object': {
                                                                                                        'type': NodeType_1.NodeType.BinaryExpression,
                                                                                                        'operator': '+',
                                                                                                        'left': {
                                                                                                            'type': NodeType_1.NodeType.CallExpression,
                                                                                                            'callee': {
                                                                                                                'type': NodeType_1.NodeType.CallExpression,
                                                                                                                'callee': {
                                                                                                                    'type': NodeType_1.NodeType.Identifier,
                                                                                                                    'name': 'Function'
                                                                                                                },
                                                                                                                'arguments': [
                                                                                                                    {
                                                                                                                        'type': NodeType_1.NodeType.MemberExpression,
                                                                                                                        'computed': true,
                                                                                                                        'object': {
                                                                                                                            'type': NodeType_1.NodeType.Identifier,
                                                                                                                            'name': '_0x793b'
                                                                                                                        },
                                                                                                                        'property': {
                                                                                                                            'type': NodeType_1.NodeType.Literal,
                                                                                                                            'value': 3,
                                                                                                                            'raw': "0x3"
                                                                                                                        }
                                                                                                                    }
                                                                                                                ]
                                                                                                            },
                                                                                                            'arguments': []
                                                                                                        },
                                                                                                        'right': {
                                                                                                            'type': NodeType_1.NodeType.MemberExpression,
                                                                                                            'computed': true,
                                                                                                            'object': {
                                                                                                                'type': NodeType_1.NodeType.Identifier,
                                                                                                                'name': '_0x793b'
                                                                                                            },
                                                                                                            'property': {
                                                                                                                'type': NodeType_1.NodeType.Literal,
                                                                                                                'value': 2,
                                                                                                                'raw': "0x2"
                                                                                                            }
                                                                                                        }
                                                                                                    },
                                                                                                    'property': {
                                                                                                        'type': NodeType_1.NodeType.Literal,
                                                                                                        'value': 2,
                                                                                                        'raw': "0x2"
                                                                                                    }
                                                                                                }
                                                                                            },
                                                                                            'right': {
                                                                                                'type': NodeType_1.NodeType.MemberExpression,
                                                                                                'computed': true,
                                                                                                'object': {
                                                                                                    'type': NodeType_1.NodeType.BinaryExpression,
                                                                                                    'operator': '+',
                                                                                                    'left': {
                                                                                                        'type': NodeType_1.NodeType.Identifier,
                                                                                                        'name': 'undefined'
                                                                                                    },
                                                                                                    'right': {
                                                                                                        'type': NodeType_1.NodeType.MemberExpression,
                                                                                                        'computed': true,
                                                                                                        'object': {
                                                                                                            'type': NodeType_1.NodeType.Identifier,
                                                                                                            'name': '_0x793b'
                                                                                                        },
                                                                                                        'property': {
                                                                                                            'type': NodeType_1.NodeType.Literal,
                                                                                                            'value': 2,
                                                                                                            'raw': "0x2"
                                                                                                        }
                                                                                                    }
                                                                                                },
                                                                                                'property': {
                                                                                                    'type': NodeType_1.NodeType.Literal,
                                                                                                    'value': 0,
                                                                                                    'raw': "0x0"
                                                                                                }
                                                                                            }
                                                                                        },
                                                                                        'right': {
                                                                                            'type': NodeType_1.NodeType.MemberExpression,
                                                                                            'computed': true,
                                                                                            'object': {
                                                                                                'type': NodeType_1.NodeType.BinaryExpression,
                                                                                                'operator': '+',
                                                                                                'left': {
                                                                                                    'type': NodeType_1.NodeType.BinaryExpression,
                                                                                                    'operator': '+',
                                                                                                    'left': {
                                                                                                        'type': NodeType_1.NodeType.UnaryExpression,
                                                                                                        'operator': '!',
                                                                                                        'argument': {
                                                                                                            'type': NodeType_1.NodeType.ArrayExpression,
                                                                                                            'elements': []
                                                                                                        },
                                                                                                        'prefix': true
                                                                                                    },
                                                                                                    'right': {
                                                                                                        'type': NodeType_1.NodeType.ArrayExpression,
                                                                                                        'elements': [
                                                                                                            {
                                                                                                                'type': NodeType_1.NodeType.Literal,
                                                                                                                'value': 0,
                                                                                                                'raw': "0x0"
                                                                                                            }
                                                                                                        ]
                                                                                                    }
                                                                                                },
                                                                                                'right': {
                                                                                                    'type': NodeType_1.NodeType.Identifier,
                                                                                                    'name': 'String'
                                                                                                }
                                                                                            },
                                                                                            'property': {
                                                                                                'type': NodeType_1.NodeType.Literal,
                                                                                                'value': 20,
                                                                                                'raw': "0x14"
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    'right': {
                                                                                        'type': NodeType_1.NodeType.MemberExpression,
                                                                                        'computed': true,
                                                                                        'object': {
                                                                                            'type': NodeType_1.NodeType.BinaryExpression,
                                                                                            'operator': '+',
                                                                                            'left': {
                                                                                                'type': NodeType_1.NodeType.BinaryExpression,
                                                                                                'operator': '+',
                                                                                                'left': {
                                                                                                    'type': NodeType_1.NodeType.UnaryExpression,
                                                                                                    'operator': '!',
                                                                                                    'argument': {
                                                                                                        'type': NodeType_1.NodeType.ArrayExpression,
                                                                                                        'elements': []
                                                                                                    },
                                                                                                    'prefix': true
                                                                                                },
                                                                                                'right': {
                                                                                                    'type': NodeType_1.NodeType.ArrayExpression,
                                                                                                    'elements': [
                                                                                                        {
                                                                                                            'type': NodeType_1.NodeType.Literal,
                                                                                                            'value': 0,
                                                                                                            'raw': "0x0"
                                                                                                        }
                                                                                                    ]
                                                                                                }
                                                                                            },
                                                                                            'right': {
                                                                                                'type': NodeType_1.NodeType.Identifier,
                                                                                                'name': 'String'
                                                                                            }
                                                                                        },
                                                                                        'property': {
                                                                                            'type': NodeType_1.NodeType.Literal,
                                                                                            'value': 20,
                                                                                            'raw': "0x14"
                                                                                        }
                                                                                    }
                                                                                },
                                                                                'right': {
                                                                                    'type': NodeType_1.NodeType.MemberExpression,
                                                                                    'computed': true,
                                                                                    'object': {
                                                                                        'type': NodeType_1.NodeType.BinaryExpression,
                                                                                        'operator': '+',
                                                                                        'left': {
                                                                                            'type': NodeType_1.NodeType.UnaryExpression,
                                                                                            'operator': '!',
                                                                                            'argument': {
                                                                                                'type': NodeType_1.NodeType.UnaryExpression,
                                                                                                'operator': '!',
                                                                                                'argument': {
                                                                                                    'type': NodeType_1.NodeType.ArrayExpression,
                                                                                                    'elements': []
                                                                                                },
                                                                                                'prefix': true
                                                                                            },
                                                                                            'prefix': true
                                                                                        },
                                                                                        'right': {
                                                                                            'type': NodeType_1.NodeType.MemberExpression,
                                                                                            'computed': true,
                                                                                            'object': {
                                                                                                'type': NodeType_1.NodeType.Identifier,
                                                                                                'name': '_0x793b'
                                                                                            },
                                                                                            'property': {
                                                                                                'type': NodeType_1.NodeType.Literal,
                                                                                                'value': 2,
                                                                                                'raw': "0x2"
                                                                                            }
                                                                                        }
                                                                                    },
                                                                                    'property': {
                                                                                        'type': NodeType_1.NodeType.Literal,
                                                                                        'value': 3,
                                                                                        'raw': "0x3"
                                                                                    }
                                                                                }
                                                                            },
                                                                            'right': {
                                                                                'type': NodeType_1.NodeType.MemberExpression,
                                                                                'computed': true,
                                                                                'object': {
                                                                                    'type': NodeType_1.NodeType.BinaryExpression,
                                                                                    'operator': '+',
                                                                                    'left': {
                                                                                        'type': NodeType_1.NodeType.UnaryExpression,
                                                                                        'operator': '!',
                                                                                        'argument': {
                                                                                            'type': NodeType_1.NodeType.UnaryExpression,
                                                                                            'operator': '!',
                                                                                            'argument': {
                                                                                                'type': NodeType_1.NodeType.ArrayExpression,
                                                                                                'elements': []
                                                                                            },
                                                                                            'prefix': true
                                                                                        },
                                                                                        'prefix': true
                                                                                    },
                                                                                    'right': {
                                                                                        'type': NodeType_1.NodeType.MemberExpression,
                                                                                        'computed': true,
                                                                                        'object': {
                                                                                            'type': NodeType_1.NodeType.Identifier,
                                                                                            'name': '_0x793b'
                                                                                        },
                                                                                        'property': {
                                                                                            'type': NodeType_1.NodeType.Literal,
                                                                                            'value': 2,
                                                                                            'raw': "0x2"
                                                                                        }
                                                                                    }
                                                                                },
                                                                                'property': {
                                                                                    'type': NodeType_1.NodeType.Literal,
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
                                                'type': NodeType_1.NodeType.ExpressionStatement,
                                                'expression': {
                                                    'type': NodeType_1.NodeType.CallExpression,
                                                    'callee': {
                                                        'type': NodeType_1.NodeType.Identifier,
                                                        'name': 'debuggerProtection'
                                                    },
                                                    'arguments': [
                                                        {
                                                            'type': NodeType_1.NodeType.UpdateExpression,
                                                            'operator': '++',
                                                            'argument': {
                                                                'type': NodeType_1.NodeType.Identifier,
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
                                    'type': NodeType_1.NodeType.TryStatement,
                                    'block': {
                                        'type': NodeType_1.NodeType.BlockStatement,
                                        'body': [
                                            {
                                                'type': NodeType_1.NodeType.ExpressionStatement,
                                                'expression': {
                                                    'type': NodeType_1.NodeType.CallExpression,
                                                    'callee': {
                                                        'type': NodeType_1.NodeType.Identifier,
                                                        'name': 'debuggerProtection'
                                                    },
                                                    'arguments': [
                                                        {
                                                            'type': NodeType_1.NodeType.Literal,
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
                                            'type': NodeType_1.NodeType.CatchClause,
                                            'param': {
                                                'type': NodeType_1.NodeType.Identifier,
                                                'name': 'y'
                                            },
                                            'body': {
                                                'type': NodeType_1.NodeType.BlockStatement,
                                                'body': []
                                            }
                                        }
                                    ],
                                    'handler': {
                                        'type': NodeType_1.NodeType.CatchClause,
                                        'param': {
                                            'type': NodeType_1.NodeType.Identifier,
                                            'name': 'y'
                                        },
                                        'body': {
                                            'type': NodeType_1.NodeType.BlockStatement,
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
exports.DebugProtectionFunctionNode = DebugProtectionFunctionNode;
