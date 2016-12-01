import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../../../types/event-emitters/TObfuscationEvent';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { ObfuscationEvents } from '../../../enums/ObfuscationEvents';

import { ControlFlowStorageCallTemplate } from '../../../templates/custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/ControlFlowStorageCallTemplate';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { NodeAppender } from '../../../node/NodeAppender';

@injectable()
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
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param controlFlowStorageName
     * @param controlFlowStorageKey
     * @param leftValue
     * @param rightValue
     */
    public initialize (
        controlFlowStorageName: string,
        controlFlowStorageKey: string,
        leftValue: string,
        rightValue: string,
    ): void {
        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
        this.leftValue = leftValue;
        this.rightValue = rightValue;

        super.initialize();
    }

    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void {
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
