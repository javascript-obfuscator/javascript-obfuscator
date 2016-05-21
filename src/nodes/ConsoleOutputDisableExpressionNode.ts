/* tslint:disable:max-line-length */

import * as estraverse from 'estraverse';

import { ITreeNode } from '../interfaces/nodes/ITreeNode';

import { NodeType } from "../enums/NodeType";

import { Node } from './Node';
import { NodeUtils } from "../NodeUtils";

export class ConsoleOutputDisableExpressionNode extends Node {
    /**
     * @type {ITreeNode}
     */
    protected node: ITreeNode;

    /**
     * @type {ITreeNode}
     */
    private astTree: ITreeNode;

    /**
     * @param astTree
     */
    constructor (astTree: ITreeNode) {
        super();

        this.astTree = astTree;
        this.node = this.getNodeStructure();
    }

    public appendNode (): void {
        estraverse.replace(this.astTree, {
            leave: (node: ITreeNode, parent: ITreeNode): any => {
                if (NodeUtils.isProgramNode(node)) {
                    node.body.unshift(this.getNode());

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
            "type": NodeType.ExpressionStatement,
            "expression": {
                "type": NodeType.CallExpression,
                "callee": {
                    "type": NodeType.CallExpression,
                    "callee": {
                        "type": NodeType.MemberExpression,
                        "computed": true,
                        "object": {
                            "type": NodeType.MemberExpression,
                            "computed": true,
                            "object": {
                                "type": NodeType.ArrayExpression,
                                "elements": []
                            },
                            "property": {
                                "type": NodeType.Literal,
                                "value": "filter",
                                "raw": "\"filter\""
                            }
                        },
                        "property": {
                            "type": NodeType.Literal,
                            "value": "constructor",
                            "raw": "\"constructor\""
                        }
                    },
                    "arguments": [
                        {
                            "type": NodeType.BinaryExpression,
                            "operator": "+",
                            "left": {
                                "type": NodeType.BinaryExpression,
                                "operator": "+",
                                "left": {
                                    "type": NodeType.BinaryExpression,
                                    "operator": "+",
                                    "left": {
                                        "type": NodeType.BinaryExpression,
                                        "operator": "+",
                                        "left": {
                                            "type": NodeType.BinaryExpression,
                                            "operator": "+",
                                            "left": {
                                                "type": NodeType.BinaryExpression,
                                                "operator": "+",
                                                "left": {
                                                    "type": NodeType.BinaryExpression,
                                                    "operator": "+",
                                                    "left": {
                                                        "type": NodeType.Literal,
                                                        "value": "_='(\u0002var \u0004\u0005[][\"filter\"]",
                                                        "raw": "\"_='(\\u0002var \\u0004\\u0005[][\\\"filter\\\"]\""
                                                    },
                                                    "right": {
                                                        "type": NodeType.Literal,
                                                        "value": "[\"\u0006tructor\"](\"return t",
                                                        "raw": "\"[\\\"\\u0006tructor\\\"](\\\"return t\""
                                                    }
                                                },
                                                "right": {
                                                    "type": NodeType.Literal,
                                                    "value": "his\")()\u0003log\u0001error\u0001info\u0001warn\u0005\u0002};})()\u0001\u0005\u0002}\u0003\u0002function () {\u0003;\u0004.\u0006ole.\u0004_window\u0005 = \u0006cons';for(Y in $='\u0006\u0005\u0004\u0003\u0002\u0001')with",
                                                    "raw": "\"his\\\")()\\u0003log\\u0001error\\u0001info\\u0001warn\\u0005\\u0002};})()\\u0001\\u0005\\u0002}\\u0003\\u0002function () {\\u0003;\\u0004.\\u0006ole.\\u0004_window\\u0005 = \\u0006cons';for(Y in $='\\u0006\\u0005\\u0004\\u0003\\u0002\\u0001')with\""
                                                }
                                            },
                                            "right": {
                                                "type": NodeType.Literal,
                                                "value": "(_.",
                                                "raw": "\"(_.\""
                                            }
                                        },
                                        "right": {
                                            "type": NodeType.Literal,
                                            "value": "split($[Y]))_=jo",
                                            "raw": "\"split($[Y]))_=jo\""
                                        }
                                    },
                                    "right": {
                                        "type": NodeType.Literal,
                                        "value": "in(pop",
                                        "raw": "\"in(pop\""
                                    }
                                },
                                "right": {
                                    "type": NodeType.Literal,
                                    "value": "());ev",
                                    "raw": "\"());ev\""
                                }
                            },
                            "right": {
                                "type": NodeType.Literal,
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
