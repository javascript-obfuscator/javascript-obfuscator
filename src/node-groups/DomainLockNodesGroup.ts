import { IOptions } from '../interfaces/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { NodeAppender } from '../NodeAppender';
import { DomainLockNode } from '../custom-nodes/domain-lock-nodes/DomainLockNode';
import { NodeCallsControllerFunctionNode } from '../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode';

export class DomainLockNodesGroup extends AbstractNodesGroup {
    /**
     * @param stackTraceData
     * @param options
     */
    constructor (stackTraceData: IStackTraceData[], options: IOptions) {
        super(stackTraceData, options);

        if (!this.options.domainLock.length) {
            return;
        }

        const callsControllerFunctionName: string = 'domainLockCallsControllerFunction';
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);

        this.nodes.set(
            'DomainLockNode',
            new DomainLockNode(
                this.stackTraceData,
                callsControllerFunctionName,
                randomStackTraceIndex,
                this.options
            )
        );
        this.nodes.set(
            'DomainLockNodeCallsControllerFunctionNode',
            new NodeCallsControllerFunctionNode(
                this.stackTraceData,
                callsControllerFunctionName,
                randomStackTraceIndex,
                this.options
            )
        );
    }
}
