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
}
