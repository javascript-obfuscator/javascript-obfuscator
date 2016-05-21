import * as estraverse from 'estraverse';

import { IProgramNode } from "../interfaces/nodes/IProgramNode";
import { ITreeNode } from "../interfaces/nodes/ITreeNode";

import { NodeType } from "../enums/NodeType";

import { Node } from './Node';

export class UnicodeArrayRotateFunctionCallNode extends Node {
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
     * @type {number}
     */
    private unicodeArrayRotateValue: number;

    /**
     * @param {string}
     */
    private unicodeArrayRotateFunctionName: string;

    /**
     * @param astTree
     * @param unicodeArrayRotateFunctionName
     * @param unicodeArrayName
     * @param unicodeArrayRotateValue
     */
    constructor (
        astTree: ITreeNode,
        unicodeArrayRotateFunctionName: string,
        unicodeArrayName: string,
        unicodeArrayRotateValue: number
    ) {
        super();

        this.astTree = astTree;
        this.unicodeArrayRotateFunctionName = unicodeArrayRotateFunctionName;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
        this.node = this.getNodeStructure();
    }

    public appendNode (): void {
        estraverse.replace(this.astTree, {
            leave: (node: ITreeNode, parent: ITreeNode): any => {
                switch (node.type) {
                    case NodeType.Program:
                        (<IProgramNode>node).body.unshift(this.getNode());

                        break;

                    default:
                        break;
                }
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
                    'name': this.unicodeArrayRotateFunctionName
                },
                'arguments': [
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
