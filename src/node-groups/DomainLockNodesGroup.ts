import { AbstractNodesGroup } from './AbstractNodesGroup';
import { NodeAppender } from '../NodeAppender';
import { DomainLockNode } from '../custom-nodes/domain-lock-nodes/DomainLockNode';
import { NodeCallsControllerFunctionNode } from '../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode';
import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';

export class DomainLockNodesGroup extends AbstractNodesGroup {
    /**
     * @returns {Map<string, ICustomNode> | undefined}
     */
    public getNodes (): Map <string, ICustomNode> | undefined {
        if (!this.options.domainLock.length) {
            return;
        }

        const callsControllerFunctionName: string = 'domainLockCallsControllerFunction';
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);

        return this.syncCustomNodesWithNodesGroup(new Map <string, ICustomNode> ([
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
