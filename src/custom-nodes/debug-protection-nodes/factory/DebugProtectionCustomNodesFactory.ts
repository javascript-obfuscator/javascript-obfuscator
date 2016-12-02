import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { CustomNodes } from '../../../enums/container/CustomNodes';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { Utils } from '../../../Utils';

@injectable()
export class DebugProtectionCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['Factory<ICustomNode>']) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeFactory = customNodeFactory;
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

        const debugProtectionFunctionNode: ICustomNode = this.customNodeFactory(CustomNodes.DebugProtectionFunctionNode);
        const debugProtectionFunctionCallNode: ICustomNode = this.customNodeFactory(CustomNodes.DebugProtectionFunctionCallNode);
        const debugProtectionFunctionIntervalNode: ICustomNode = this.customNodeFactory(CustomNodes.DebugProtectionFunctionIntervalNode);

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
