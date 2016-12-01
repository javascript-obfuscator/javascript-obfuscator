import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../../types/event-emitters/TObfuscationEvent';

import { IOptions } from '../../interfaces/options/IOptions';
import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { ObfuscationEvents } from '../../enums/ObfuscationEvents';

import { DomainLockNodeTemplate } from '../../templates/custom-nodes/domain-lock-nodes/domain-lock-node/DomainLockNodeTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeAppender } from '../../node/NodeAppender';
import { Utils } from '../../Utils';

@injectable()
export class DomainLockNode extends AbstractCustomNode {
    /**
     * @type {TObfuscationEvent}
     */
    protected readonly appendEvent: TObfuscationEvent = ObfuscationEvents.BeforeObfuscation;

    /**
     * @type {string}
     */
    protected callsControllerFunctionName: string;

    /**
     * @type {number}
     */
    protected randomStackTraceIndex: number;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param callsControllerFunctionName
     * @param randomStackTraceIndex
     */
    public initialize (callsControllerFunctionName: string, randomStackTraceIndex: number): void {
        this.callsControllerFunctionName = callsControllerFunctionName;
        this.randomStackTraceIndex = randomStackTraceIndex;

        super.initialize();
    }

    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void {
        NodeAppender.appendNodeToOptimalBlockScope(
            stackTraceData,
            blockScopeNode,
            this.getNode(),
            this.randomStackTraceIndex
        );
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        let domainsString: string = this.options.domainLock.join(';'),
            [hiddenDomainsString, diff]: string[] = Utils.hideString(domainsString, domainsString.length * 3);

        return format(DomainLockNodeTemplate(), {
            domainLockFunctionName: Utils.getRandomVariableName(),
            diff: diff,
            domains: hiddenDomainsString,
            singleNodeCallControllerFunctionName: this.callsControllerFunctionName
        });
    }
}
