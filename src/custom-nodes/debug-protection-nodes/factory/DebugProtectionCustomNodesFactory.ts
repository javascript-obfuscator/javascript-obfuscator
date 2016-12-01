import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { DebugProtectionFunctionCallNode } from '../DebugProtectionFunctionCallNode';
import { DebugProtectionFunctionIntervalNode } from '../DebugProtectionFunctionIntervalNode';
import { DebugProtectionFunctionNode } from '../DebugProtectionFunctionNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { Utils } from '../../../Utils';

@injectable()
export class DebugProtectionCustomNodesFactory extends AbstractCustomNodesFactory {
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
        if (!this.options.debugProtection) {
            return;
        }

        const debugProtectionFunctionName: string = Utils.getRandomVariableName();

        const debugProtectionFunctionNode: ICustomNode = new DebugProtectionFunctionNode(this.options);
        const debugProtectionFunctionCallNode: ICustomNode = new DebugProtectionFunctionCallNode(this.options);
        const debugProtectionFunctionIntervalNode: ICustomNode = new DebugProtectionFunctionIntervalNode(this.options);

        debugProtectionFunctionNode.initialize(debugProtectionFunctionName);
        debugProtectionFunctionCallNode.initialize(debugProtectionFunctionName);
        debugProtectionFunctionIntervalNode.initialize(debugProtectionFunctionName);

        const customNodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ([
            ['debugProtectionFunctionNode', debugProtectionFunctionNode],
            ['debugProtectionFunctionCallNode', debugProtectionFunctionCallNode]
        ]);

        if (this.options.debugProtectionInterval) {
            customNodes.set('debugProtectionFunctionIntervalNode', debugProtectionFunctionIntervalNode);
        }

        return this.syncCustomNodesWithNodesFactory(customNodes);
    }
}
