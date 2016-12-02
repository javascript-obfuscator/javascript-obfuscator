import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TObfuscationEvent } from '../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/options/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';
import { TStatement } from '../types/node/TStatement';

import { NodeUtils } from '../node/NodeUtils';

@injectable()
export abstract class AbstractCustomNode implements ICustomNode {
    /**
     * @type {TObfuscationEvent}
     */
    protected abstract appendEvent: TObfuscationEvent;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
    }

    /**
     * @param args
     */
    public abstract initialize (...args: any[]): void;

    /**
     * @param astTree
     * @param stackTraceData
     */
    public abstract appendNode (astTree: ESTree.Node, stackTraceData: IStackTraceData[]): void;

    /**
     * @returns {TObfuscationEvent}
     */
    public getAppendEvent (): TObfuscationEvent {
        return this.appendEvent;
    }

    /**
     * @returns {string}
     */
    public abstract getCode (): string;

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        return this.getNodeStructure();
    }

    /**
     * @param appendEvent
     */
    public setAppendEvent (appendEvent: TObfuscationEvent): void {
        this.appendEvent = appendEvent;
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(this.getCode());
    }
}
