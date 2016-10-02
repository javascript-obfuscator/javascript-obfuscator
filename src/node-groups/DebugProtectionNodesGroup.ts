import { IOptions } from '../interfaces/IOptions';

import { DebugProtectionFunctionCallNode } from '../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode';
import { DebugProtectionFunctionIntervalNode } from '../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode';
import { DebugProtectionFunctionNode } from '../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { Utils } from '../Utils';

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
