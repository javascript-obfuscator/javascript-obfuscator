import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { DebugProtectionFunctionCallNode } from '../DebugProtectionFunctionCallNode';
import { DebugProtectionFunctionIntervalNode } from '../DebugProtectionFunctionIntervalNode';
import { DebugProtectionFunctionNode } from '../DebugProtectionFunctionNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { Utils } from '../../../Utils';

export class DebugProtectionCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @returns {Map<string, ICustomNode> | undefined}
     */
    public getNodes (): Map <string, ICustomNode> | undefined {
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

        return this.syncCustomNodesWithNodesGroup(customNodes);
    }
}
