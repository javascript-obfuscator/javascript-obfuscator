import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TObfuscationEvent } from '../../../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { ObfuscationEvents } from '../../../enums/ObfuscationEvents';

import { NodeCallsControllerFunctionNode } from '../../node-calls-controller-nodes/NodeCallsControllerFunctionNode';
import { SelfDefendingUnicodeNode } from '../SelfDefendingUnicodeNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { NodeAppender } from '../../../node/NodeAppender';
import { Utils } from '../../../Utils';

@injectable()
export class SelfDefendingCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @type {TObfuscationEvent}
     */
    protected appendEvent: TObfuscationEvent = ObfuscationEvents.AfterObfuscation;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param stackTraceData
     * @returns {Map<string, ICustomNode>}
     */
    public initializeCustomNodes (stackTraceData: IStackTraceData[]): Map <string, ICustomNode> | undefined {
        if (!this.options.selfDefending) {
            return;
        }

        const callsControllerFunctionName: string = Utils.getRandomVariableName();
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(stackTraceData.length);

        const selfDefendingUnicodeNode: ICustomNode = new SelfDefendingUnicodeNode(this.options);
        const nodeCallsControllerFunctionNode: ICustomNode = new NodeCallsControllerFunctionNode(this.options);

        selfDefendingUnicodeNode.initialize(callsControllerFunctionName, randomStackTraceIndex);
        nodeCallsControllerFunctionNode.initialize(callsControllerFunctionName, randomStackTraceIndex);

        return this.syncCustomNodesWithNodesFactory(new Map <string, ICustomNode> ([
            ['selfDefendingUnicodeNode', selfDefendingUnicodeNode],
            ['SelfDefendingNodeCallsControllerFunctionNode', nodeCallsControllerFunctionNode]
        ]));
    }
}
