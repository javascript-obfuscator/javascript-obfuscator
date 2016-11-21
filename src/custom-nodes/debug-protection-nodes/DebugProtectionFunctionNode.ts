import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';

import { DebugProtectionFunctionTemplate } from '../../templates/custom-nodes/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeUtils } from '../../node/NodeUtils';
import { Utils } from '../../Utils';

export class DebugProtectionFunctionNode extends AbstractCustomNode {
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
        let programBodyLength: number = blockScopeNode.body.length,
            randomIndex: number = Utils.getRandomInteger(0, programBodyLength);

        NodeAppender.insertNodeAtIndex(blockScopeNode, this.getNode(), randomIndex);
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.debugProtectionFunctionName;
    }

    /**
     * Found this trick in JScrambler
     *
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(
            DebugProtectionFunctionTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            })
        );
    }
}
