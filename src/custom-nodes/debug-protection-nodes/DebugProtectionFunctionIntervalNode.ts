import { BlockScopeNode } from "../../types/BlockScopeNode";

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
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: BlockScopeNode): void {
        NodeUtils.appendNode(blockScopeNode.body, this.getNode());
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
