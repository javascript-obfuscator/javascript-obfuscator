import * as estraverse from 'estraverse';

import { ITreeNode } from '../interfaces/nodes/ITreeNode';

import { INode } from '../interfaces/INode';

import { DebugProtectionFunctionCallNode } from "../nodes/debugProtectionNodes/DebugProtectionFunctionCallNode";
import { DebugProtectionFunctionIntervalNode } from "../nodes/debugProtectionNodes/DebugProtectionFunctionIntervalNode";
import { DebugProtectionFunctionNode } from "../nodes/debugProtectionNodes/DebugProtectionFunctionNode";

import { NodesGroup } from './NodesGroup';
import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

export class DebugProtectionNodesGroup extends NodesGroup {
    /**
     * @type {ITreeNode}
     */
    private astTree: ITreeNode;

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
     * @param astTree
     */
    constructor (astTree: ITreeNode, options: any) {
        super();

        this.astTree = astTree;
        this.options = options;

        this.debugProtectionFunctionIndex = this.getDebugProtectionFunctionIndex();

        this.nodes = new Map <string, INode> ([
            [
                'debugProtectionFunctionNode',
                new DebugProtectionFunctionNode(
                    this.astTree,
                    this.debugProtectionFunctionIdentifier,
                    this.debugProtectionFunctionIndex
                )
            ],
            [
                'debugProtectionFunctionCallNode',
                new DebugProtectionFunctionCallNode(
                    this.astTree,
                    this.debugProtectionFunctionIdentifier
                )
            ]
        ]);

        if (this.options['debugProtectionInterval']) {
            this.nodes.set(
                'debugProtectionFunctionIntervalNode',
                new DebugProtectionFunctionIntervalNode(
                    this.astTree,
                    this.debugProtectionFunctionIdentifier
                )
            );
        }
    }

    /**
     * @returns {number}
     */
    private getDebugProtectionFunctionIndex (): number {
        let randomIndex: number;

        estraverse.replace(this.astTree, {
            leave: (node: ITreeNode, parent: ITreeNode): any => {
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
