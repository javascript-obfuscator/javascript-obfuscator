import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from '../../../interfaces/IObfuscationEventEmitter';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { DebugProtectionFunctionCallNode } from '../DebugProtectionFunctionCallNode';
import { DebugProtectionFunctionIntervalNode } from '../DebugProtectionFunctionIntervalNode';
import { DebugProtectionFunctionNode } from '../DebugProtectionFunctionNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { Utils } from '../../../Utils';

export class DebugProtectionCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @param obfuscationEventEmitter
     * @param stackTraceData
     * @returns {Map<string, ICustomNode>}
     */
    public initializeCustomNodes (
        obfuscationEventEmitter: IObfuscationEventEmitter,
        stackTraceData: IStackTraceData[]
    ): Map <string, ICustomNode> | undefined {
        if (!this.options.debugProtection) {
            return;
        }

        const debugProtectionFunctionName: string = Utils.getRandomVariableName();
        const customNodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ([
            [
                'debugProtectionFunctionNode',
                new DebugProtectionFunctionNode(debugProtectionFunctionName, this.options)
            ],
            [
                'debugProtectionFunctionCallNode',
                new DebugProtectionFunctionCallNode(debugProtectionFunctionName, this.options)
            ]
        ]);

        if (this.options.debugProtectionInterval) {
            customNodes.set(
                'debugProtectionFunctionIntervalNode',
                new DebugProtectionFunctionIntervalNode(debugProtectionFunctionName, this.options)
            );
        }

        return this.syncCustomNodesWithNodesFactory(obfuscationEventEmitter, customNodes);
    }
}
