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
     * @type {boolean}
     */
    public initialized: boolean = false;

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

    public checkInitialization (): void {
        if (!this.initialized) {
            throw new Error(`Custom node should be initialized first by calling \`initialize\` method!`);
        }
    }

    /**
     * @param args
     */
    public initialize (...args: any[]): void {
        this.initialized = true;
    };

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
        this.checkInitialization();

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
