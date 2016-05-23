import * as estraverse from 'estraverse';

import { ITreeNode } from '../interfaces/nodes/ITreeNode';

import { NodeType } from "../enums/NodeType";

import { Node } from './Node';
import { NodeUtils } from "../NodeUtils";

export class DebugProtectionFunctionCallNode extends Node {
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
     * @param astTree
     * @param debugProtectionFunctionName
     */
    constructor (
        astTree: ITreeNode,
        debugProtectionFunctionName: string
    ) {
        super();

        this.astTree = astTree;
        this.debugProtectionFunctionName = debugProtectionFunctionName;
        this.node = this.getNodeStructure();
    }

    public appendNode (): void {
        estraverse.replace(this.astTree, {
            leave: (node: ITreeNode, parent: ITreeNode): any => {
                if (NodeUtils.isProgramNode(node)) {
                    node.body.push(this.getNode());

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
                    'name': this.debugProtectionFunctionName
                },
                'arguments': []
            }
        };
    }
}
