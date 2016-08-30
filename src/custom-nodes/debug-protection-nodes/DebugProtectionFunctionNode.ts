import 'format-unicorn';

import { INode } from "../../interfaces/nodes/INode";
import { IOptions } from "../../interfaces/IOptions";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { DebugProtectionFunctionTemplate } from "../../templates/custom-nodes/debug-protection-nodes/debug-protection-function-node/DebugProtectionFunctionTemplate";

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../NodeUtils';
import { Utils } from "../../Utils";

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
            randomIndex: number = Utils.getRandomGenerator().integer({
                min: 0,
                max: programBodyLength
            });

        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
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
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        return NodeUtils.convertCodeToStructure(
            DebugProtectionFunctionTemplate().formatUnicorn({
                debugProtectionFunctionName: this.debugProtectionFunctionName
            })
        );
    }
}
