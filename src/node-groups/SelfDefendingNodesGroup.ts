import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';

import { AppendState } from '../enums/AppendState';

import { NodeCallsControllerFunctionNode } from '../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode';
import { SelfDefendingUnicodeNode } from '../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { NodeAppender } from '../node/NodeAppender';
import { Utils } from '../Utils';

export class SelfDefendingNodesGroup extends AbstractNodesGroup {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @returns {Map<string, ICustomNode> | undefined}
     */
    public getNodes (): Map <string, ICustomNode> | undefined {
        if (!this.options.selfDefending) {
            return;
        }

        const callsControllerFunctionName: string = Utils.getRandomVariableName();
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);

        return this.syncCustomNodesWithNodesGroup(new Map <string, ICustomNode> ([
            [
                'selfDefendingUnicodeNode',
                new SelfDefendingUnicodeNode(
                    this.stackTraceData,
                    callsControllerFunctionName,
                    randomStackTraceIndex,
                    this.options
                )
            ],
            [
                'SelfDefendingNodeCallsControllerFunctionNode',
                new NodeCallsControllerFunctionNode(
                    this.stackTraceData,
                    callsControllerFunctionName,
                    randomStackTraceIndex,
                    this.options
                )
            ]
        ]));
    }
}
