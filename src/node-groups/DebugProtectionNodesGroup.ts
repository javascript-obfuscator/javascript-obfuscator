import * as estraverse from 'estraverse';

import { INode } from '../interfaces/nodes/INode';

import { ICustomNode } from '../interfaces/ICustomNode';

import { DebugProtectionFunctionCallNode } from "../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode";
import { DebugProtectionFunctionIntervalNode } from "../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode";
import { DebugProtectionFunctionNode } from "../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode";

import { NodesGroup } from './NodesGroup';
import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

export class DebugProtectionNodesGroup extends NodesGroup {
    /**
     * @type {INode}
     */
    private astTree: INode;

    /**
     * @type {number}
     */
    private debugProtectionFunctionIndex: number;

    /**
     * @type {string}
     */
    private debugProtectionFunctionIdentifier: string = Utils.getRandomVariableName();

    /**
     * @type {any}
     */
    private options: any;

    /**
     * @param options
     */
    constructor (options: any) {
        super();

        this.options = options;

        this.debugProtectionFunctionIndex = this.getDebugProtectionFunctionIndex();

        this.nodes = new Map <string, ICustomNode> ([
            [
                'debugProtectionFunctionNode',
                new DebugProtectionFunctionNode(this.debugProtectionFunctionIdentifier)
            ],
            [
                'debugProtectionFunctionCallNode',
                new DebugProtectionFunctionCallNode(this.debugProtectionFunctionIdentifier)
            ]
        ]);

        if (this.options['debugProtectionInterval']) {
            this.nodes.set(
                'debugProtectionFunctionIntervalNode',
                new DebugProtectionFunctionIntervalNode(this.debugProtectionFunctionIdentifier)
            );
        }
    }

    /**
     * @returns {number}
     */
    private getDebugProtectionFunctionIndex (): number {
        let randomIndex: number;

        estraverse.replace(this.astTree, {
            leave: (node: INode, parent: INode): any => {
                if (NodeUtils.isProgramNode(node)) {
                    let programBodyLength: number = node.body.length;

                    randomIndex = Utils.getRandomInteger(0, programBodyLength);

                    return estraverse.VisitorOption.Break;
                }

                return estraverse.VisitorOption.Skip;
            }
        });

        return randomIndex;
    }
}
