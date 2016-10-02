import * as ESTree from 'estree';

import 'format-unicorn';

import { IOptions } from 'app/interfaces/IOptions';

import { TNodeWithBlockStatement } from 'app/types/TNodeWithBlockStatement';

import { AppendState } from 'app/enums/AppendState';

import { DebugProtectionFunctionCallTemplate } from 'app/templates/custom-nodes/debug-protection-nodes/debug-protection-function-call-node/DebufProtectionFunctionCallTemplate';

import { AbstractCustomNode } from 'app/custom-nodes/AbstractCustomNode';
import { NodeUtils } from 'app/NodeUtils';

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
        NodeUtils.appendNode(blockScopeNode.body, this.getNode());
    }

    /**
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
        return NodeUtils.convertCodeToStructure(
            DebugProtectionFunctionCallTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            })
        );
    }
}
