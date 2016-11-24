import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { AppendState } from '../../../enums/AppendState';

import { NodeCallsControllerFunctionNode } from '../../node-calls-controller-nodes/NodeCallsControllerFunctionNode';
import { SelfDefendingUnicodeNode } from '../SelfDefendingUnicodeNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { NodeAppender } from '../../../node/NodeAppender';
import { Utils } from '../../../Utils';

export class SelfDefendingCustomNodesFactory extends AbstractCustomNodesFactory {
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
