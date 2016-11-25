import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { DomainLockNode } from '../DomainLockNode';
import { NodeCallsControllerFunctionNode } from '../../node-calls-controller-nodes/NodeCallsControllerFunctionNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { NodeAppender } from '../../../node/NodeAppender';
import { Utils } from '../../../Utils';

export class DomainLockCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @param stackTraceData
     * @returns {Map<string, ICustomNode>}
     */
    public initializeCustomNodes (stackTraceData: IStackTraceData[]): Map <string, ICustomNode> | undefined {
        if (!this.options.domainLock.length) {
            return;
        }

        const callsControllerFunctionName: string = Utils.getRandomVariableName();
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(stackTraceData.length);

        return this.syncCustomNodesWithNodesFactory(new Map <string, ICustomNode> ([
            [
                'DomainLockNode',
                new DomainLockNode(
                    stackTraceData,
                    callsControllerFunctionName,
                    randomStackTraceIndex,
                    this.options
                )
            ],
            [
                'DomainLockNodeCallsControllerFunctionNode',
                new NodeCallsControllerFunctionNode(
                    stackTraceData,
                    callsControllerFunctionName,
                    randomStackTraceIndex,
                    this.options
                )
            ]
        ]));
    }
}
