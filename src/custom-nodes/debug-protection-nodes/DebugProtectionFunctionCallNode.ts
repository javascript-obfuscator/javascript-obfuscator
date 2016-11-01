import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';

import { DebugProtectionFunctionCallTemplate } from '../../templates/custom-nodes/debug-protection-nodes/debug-protection-function-call-node/DebufProtectionFunctionCallTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../NodeUtils';

export class DebugProtectionFunctionCallNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @type {string}
     */
    private debugProtectionFunctionName: string;

    /**
     * @param debugProtectionFunctionName
     * @param options
     */
    constructor (debugProtectionFunctionName: string, options: IOptions) {
        super(options);

        this.debugProtectionFunctionName = debugProtectionFunctionName;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        NodeUtils.appendNode(blockScopeNode, this.getNode());
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(
            DebugProtectionFunctionCallTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            })
        );
    }
}
