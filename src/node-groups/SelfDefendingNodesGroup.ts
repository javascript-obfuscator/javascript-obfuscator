import { IOptions } from '../interfaces/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { NodeAppender } from '../NodeAppender';
import { NodeCallsControllerFunctionNode } from '../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode';
import { SelfDefendingUnicodeNode } from '../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode';

export class SelfDefendingNodesGroup extends AbstractNodesGroup {
    /**
     * @param stackTraceData
     * @param options
     */
    constructor (stackTraceData: IStackTraceData[], options: IOptions) {
        super(stackTraceData, options);

        if (!this.options.selfDefending) {
            return;
        }

        const callsControllerFunctionName: string = 'domainLockCallsControllerFunction';
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);

        this.nodes.set(
            'selfDefendingUnicodeNode',
            new SelfDefendingUnicodeNode(
                this.stackTraceData,
                callsControllerFunctionName,
                randomStackTraceIndex,
                this.options
            )
        );
        this.nodes.set(
            'SelfDefendingNodeCallsControllerFunctionNode',
            new NodeCallsControllerFunctionNode(
                this.stackTraceData,
                callsControllerFunctionName,
                randomStackTraceIndex,
                this.options
            )
        );
    }
}
