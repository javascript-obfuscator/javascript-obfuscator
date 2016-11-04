import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { AppendState } from '../enums/AppendState';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { NodeAppender } from '../NodeAppender';
import { NodeCallsControllerFunctionNode } from '../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode';
import { SelfDefendingUnicodeNode } from '../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode';
import { Utils } from '../Utils';

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

        const callsControllerFunctionName: string = Utils.getRandomVariableName();
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(this.stackTraceData.length);
        const selfDefendingUnicodeNode: ICustomNode = new SelfDefendingUnicodeNode(
            this.stackTraceData,
            callsControllerFunctionName,
            randomStackTraceIndex,
            this.options
        );
        const nodeCallsControllerFunctionNode: ICustomNode = new NodeCallsControllerFunctionNode(
            this.stackTraceData,
            callsControllerFunctionName,
            randomStackTraceIndex,
            this.options
        );

        selfDefendingUnicodeNode.setAppendState(AppendState.AfterObfuscation);
        nodeCallsControllerFunctionNode.setAppendState(AppendState.AfterObfuscation);

        this.nodes.set(
            'selfDefendingUnicodeNode',
            selfDefendingUnicodeNode
        );
        this.nodes.set(
            'SelfDefendingNodeCallsControllerFunctionNode',
            nodeCallsControllerFunctionNode
        );
    }
}
