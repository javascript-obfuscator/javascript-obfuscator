import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../../../types/event-emitters/TObfuscationEvent';

import { IOptions } from '../../../interfaces/options/IOptions';

import { ObfuscationEvents } from '../../../enums/ObfuscationEvents';

import { ControlFlowStorageCallTemplate } from '../../../templates/custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/ControlFlowStorageCallTemplate';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { NodeAppender } from '../../../node/NodeAppender';

export class ControlFlowStorageCallNode extends AbstractCustomNode {
    /**
     * @type {TObfuscationEvent}
     */
    protected readonly appendEvent: TObfuscationEvent = ObfuscationEvents.AfterObfuscation;

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
