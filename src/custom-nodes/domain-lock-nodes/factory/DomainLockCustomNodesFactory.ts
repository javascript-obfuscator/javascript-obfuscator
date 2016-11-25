import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { DomainLockNode } from '../DomainLockNode';
import { NodeCallsControllerFunctionNode } from '../../node-calls-controller-nodes/NodeCallsControllerFunctionNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { NodeAppender } from '../../../node/NodeAppender';
import { Utils } from '../../../Utils';

export class DomainLockCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @returns {Map<string, ICustomNode> | undefined}
     */
    public initializeCustomNodes (): Map <string, ICustomNode> | undefined {
        if (!this.options.domainLock.length) {
            return;
        }

        const callsControllerFunctionName: string = Utils.getRandomVariableName();
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);

        return this.syncCustomNodesWithNodesFactory(new Map <string, ICustomNode> ([
            [
                'DomainLockNode',
                new DomainLockNode(
                    this.stackTraceData,
                    callsControllerFunctionName,
                    randomStackTraceIndex,
                    this.options
                )
            ],
            [
                'DomainLockNodeCallsControllerFunctionNode',
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
