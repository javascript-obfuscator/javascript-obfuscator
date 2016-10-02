import { IOptions } from 'app/interfaces/IOptions';

import { DebugProtectionFunctionCallNode } from 'app/custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode';
import { DebugProtectionFunctionIntervalNode } from 'app/custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode';
import { DebugProtectionFunctionNode } from 'app/custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { Utils } from 'app/Utils';

export class DebugProtectionNodesGroup extends AbstractNodesGroup {
    /**
     * @type {string}
     */
    private debugProtectionFunctionIdentifier: string = Utils.getRandomVariableName();

    /**
     * @param options
     */
    constructor (options: IOptions) {
        super(options);

        if (!this.options.debugProtection) {
            return;
        }

        this.nodes.set(
            'debugProtectionFunctionNode',
            new DebugProtectionFunctionNode(this.debugProtectionFunctionIdentifier, this.options)
        );
        this.nodes.set(
            'debugProtectionFunctionCallNode',
            new DebugProtectionFunctionCallNode(this.debugProtectionFunctionIdentifier, this.options)
        );

        if (this.options.debugProtectionInterval) {
            this.nodes.set(
                'debugProtectionFunctionIntervalNode',
                new DebugProtectionFunctionIntervalNode(this.debugProtectionFunctionIdentifier, this.options)
            );
        }
    }
}
