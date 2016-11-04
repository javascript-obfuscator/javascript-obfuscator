import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';

import { DebugProtectionFunctionCallNode } from '../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode';
import { DebugProtectionFunctionIntervalNode } from '../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode';
import { DebugProtectionFunctionNode } from '../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode';

import { AbstractNodesGroup } from './AbstractNodesGroup';

export class DebugProtectionNodesGroup extends AbstractNodesGroup {
    /**
     * @returns {Map<string, ICustomNode> | undefined}
     */
    public getNodes (): Map <string, ICustomNode> | undefined {
        if (!this.options.debugProtection) {
            return;
        }

        const debugProtectionFunctionName: string = 'debugProtectionFunction';
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

        return this.syncCustomNodesWithNodesGroup(customNodes);
    }
}
