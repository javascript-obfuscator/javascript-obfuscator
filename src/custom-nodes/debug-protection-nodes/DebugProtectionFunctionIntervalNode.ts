import * as estraverse from 'estraverse';

import { INode } from '../../interfaces/nodes/INode';

import { NodeType } from '../../enums/NodeType';

import { Node } from '../Node';
import { NodeUtils } from '../../NodeUtils';

export class DebugProtectionFunctionIntervalNode extends Node {
    /**
     * @type {string}
     */
    private debugProtectionFunctionName: string;

    /**
     * @param debugProtectionFunctionName
     */
    constructor (debugProtectionFunctionName: string) {
        super();

        this.debugProtectionFunctionName = debugProtectionFunctionName;

        this.node = this.getNodeStructure();
    }

    /**
     * @param astTree
     */
    public appendNode (astTree: INode): void {
        estraverse.replace(astTree, {
            leave: (node: INode, parent: INode): any => {
                if (NodeUtils.isProgramNode(node)) {
                    NodeUtils.appendNode(node.body, this.getNode());

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
            'type': NodeType.ExpressionStatement,
            'expression': {
                'type': NodeType.CallExpression,
                'callee': {
                    'type': NodeType.Identifier,
                    'name': 'setInterval'
                },
                'arguments': [
                    {
                        'type': NodeType.FunctionExpression,
                        'id': null,
                        'params': [],
                        'defaults': [],
                        'body': {
                            'type': NodeType.BlockStatement,
                            'body': [
                                {
                                    'type': NodeType.ExpressionStatement,
                                    'expression': {
                                        'type': NodeType.CallExpression,
                                        'callee': {
                                            'type': NodeType.Identifier,
                                            'name': this.debugProtectionFunctionName
                                        },
                                        'arguments': []
                                    }
                                }
                            ]
                        },
                        'generator': false,
                        'expression': false
                    },
                    {
                        'type': NodeType.Literal,
                        'value': 4000,
                        'raw': '4000'
                    }
                ]
            }
        };
    }
}
