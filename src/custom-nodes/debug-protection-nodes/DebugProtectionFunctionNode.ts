import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';

import { DebugProtectionFunctionTemplate } from '../../templates/custom-nodes/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeAppender } from '../../node/NodeAppender';
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
    public getCode (): string {
        return format(DebugProtectionFunctionTemplate(), {
            debugProtectionFunctionName: this.debugProtectionFunctionName
        });
    }
}
