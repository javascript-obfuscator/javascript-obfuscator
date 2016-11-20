import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../../types/TNodeWithBlockStatement';

import { IOptions } from '../../../interfaces/IOptions';

import { AppendState } from '../../../enums/AppendState';

import { ControlFlowStorageCallTemplate } from '../../../templates/custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/ControlFlowStorageCallTemplate';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { NodeAppender } from '../../../node/NodeAppender';

export class ControlFlowStorageCallNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string}
     */
    private controlFlowStorageKey: string;

    /**
     * @type {string}
     */
    private controlFlowStorageName: string;

    /**
     * @type {string}
     */
    private leftValue: string;

    /**
     * @type {string}
     */
    private rightValue: string;

    /**
     * @param controlFlowStorageName
     * @param controlFlowStorageKey
     * @param leftValue
     * @param rightValue
     * @param options
     */
    constructor (
        controlFlowStorageName: string,
        controlFlowStorageKey: string,
        leftValue: string,
        rightValue: string,
        options: IOptions
    ) {
        super(options);

        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
        this.leftValue = leftValue;
        this.rightValue = rightValue;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        NodeAppender.prependNode(blockScopeNode, this.getNode());
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        return format(ControlFlowStorageCallTemplate(), {
            controlFlowStorageKey: this.controlFlowStorageKey,
            controlFlowStorageName: this.controlFlowStorageName,
            leftValue: this.leftValue,
            rightValue: this.rightValue
        });
    }
}
