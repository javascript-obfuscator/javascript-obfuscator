import * as ESTree from 'estree';

import { TObfuscationEvent } from '../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/options/IOptions';
import { TStatement } from '../types/node/TStatement';

import { NodeUtils } from '../node/NodeUtils';

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
    constructor (options: IOptions) {
        this.options = options;
    }

    /**
     * @param astTree
     */
    public abstract appendNode (astTree: ESTree.Node): void;

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
