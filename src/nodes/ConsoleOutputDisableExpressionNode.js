"use strict";
const estraverse = require('estraverse');
const NodeType_1 = require("../enums/NodeType");
const Node_1 = require('./Node');
class ConsoleOutputDisableExpressionNode extends Node_1.Node {
    constructor(astTree) {
        super();
        this.astTree = astTree;
        this.node = this.getNodeStructure();
    }
    appendNode() {
        estraverse.replace(this.astTree, {
            leave: (node, parent) => {
                switch (node.type) {
                    case NodeType_1.NodeType.Program:
                        node.body.unshift(this.getNode());
                        break;
                    default:
                        break;
                }
            }
        });
    }
    getNodeStructure() {
        return {
            "type": NodeType_1.NodeType.ExpressionStatement,
            "expression": {
                "type": NodeType_1.NodeType.CallExpression,
                "callee": {
                    "type": NodeType_1.NodeType.CallExpression,
                    "callee": {
                        "type": NodeType_1.NodeType.MemberExpression,
                        "computed": true,
                        "object": {
                            "type": NodeType_1.NodeType.MemberExpression,
                            "computed": true,
                            "object": {
                                "type": NodeType_1.NodeType.ArrayExpression,
                                "elements": []
                            },
                            "property": {
                                "type": NodeType_1.NodeType.Literal,
                                "value": "filter",
                                "raw": "\"filter\""
                            }
                        },
                        "property": {
                            "type": NodeType_1.NodeType.Literal,
                            "value": "constructor",
                            "raw": "\"constructor\""
                        }
                    },
                    "arguments": [
                        {
                            "type": NodeType_1.NodeType.BinaryExpression,
                            "operator": "+",
                            "left": {
                                "type": NodeType_1.NodeType.BinaryExpression,
                                "operator": "+",
                                "left": {
                                    "type": NodeType_1.NodeType.BinaryExpression,
                                    "operator": "+",
                                    "left": {
                                        "type": NodeType_1.NodeType.BinaryExpression,
                                        "operator": "+",
                                        "left": {
                                            "type": NodeType_1.NodeType.BinaryExpression,
                                            "operator": "+",
                                            "left": {
                                                "type": NodeType_1.NodeType.BinaryExpression,
                                                "operator": "+",
                                                "left": {
                                                    "type": NodeType_1.NodeType.BinaryExpression,
                                                    "operator": "+",
                                                    "left": {
                                                        "type": NodeType_1.NodeType.Literal,
                                                        "value": "_='(\u0002var \u0004\u0005[][\"filter\"]",
                                                        "raw": "\"_='(\\u0002var \\u0004\\u0005[][\\\"filter\\\"]\""
                                                    },
                                                    "right": {
                                                        "type": NodeType_1.NodeType.Literal,
                                                        "value": "[\"\u0006tructor\"](\"return t",
                                                        "raw": "\"[\\\"\\u0006tructor\\\"](\\\"return t\""
                                                    }
                                                },
                                                "right": {
                                                    "type": NodeType_1.NodeType.Literal,
                                                    "value": "his\")()\u0003log\u0001error\u0001info\u0001warn\u0005\u0002};})()\u0001\u0005\u0002}\u0003\u0002function () {\u0003;\u0004.\u0006ole.\u0004_window\u0005 = \u0006cons';for(Y in $='\u0006\u0005\u0004\u0003\u0002\u0001')with",
                                                    "raw": "\"his\\\")()\\u0003log\\u0001error\\u0001info\\u0001warn\\u0005\\u0002};})()\\u0001\\u0005\\u0002}\\u0003\\u0002function () {\\u0003;\\u0004.\\u0006ole.\\u0004_window\\u0005 = \\u0006cons';for(Y in $='\\u0006\\u0005\\u0004\\u0003\\u0002\\u0001')with\""
                                                }
                                            },
                                            "right": {
                                                "type": NodeType_1.NodeType.Literal,
                                                "value": "(_.",
                                                "raw": "\"(_.\""
                                            }
                                        },
                                        "right": {
                                            "type": NodeType_1.NodeType.Literal,
                                            "value": "split($[Y]))_=jo",
                                            "raw": "\"split($[Y]))_=jo\""
                                        }
                                    },
                                    "right": {
                                        "type": NodeType_1.NodeType.Literal,
                                        "value": "in(pop",
                                        "raw": "\"in(pop\""
                                    }
                                },
                                "right": {
                                    "type": NodeType_1.NodeType.Literal,
                                    "value": "());ev",
                                    "raw": "\"());ev\""
                                }
                            },
                            "right": {
                                "type": NodeType_1.NodeType.Literal,
                                "value": "al(_)",
                                "raw": "\"al(_)\""
                            }
                        }
                    ]
                },
                "arguments": []
            }
        };
    }
}
exports.ConsoleOutputDisableExpressionNode = ConsoleOutputDisableExpressionNode;
