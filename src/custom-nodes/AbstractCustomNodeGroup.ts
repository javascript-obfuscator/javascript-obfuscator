import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TObfuscationEvent } from '../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../interfaces/custom-nodes/ICustomNodeGroup';
import { IOptions } from '../interfaces/options/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { ObfuscationEvents } from '../enums/ObfuscationEvents';

@injectable()
export abstract class AbstractCustomNodeGroup implements ICustomNodeGroup {
    /**
     * @type {TObfuscationEvent}
     */
    protected readonly appendEvent: TObfuscationEvent = ObfuscationEvents.BeforeObfuscation;

    /**
     * @type {Map<string, ICustomNode>}
     */
    protected abstract customNodes: Map <string, ICustomNode>;

    /**
     * @type {string}
     */
    protected abstract readonly groupName: string;

    /**
     * @type {IStackTraceData[]}
     */
    protected readonly stackTraceData: IStackTraceData[];

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
     * @returns {Map<string, ICustomNode>}
     */
    public getCustomNodes (): Map <string, ICustomNode> {
        return this.customNodes;
    }

    /**
     * @returns {string}
     */
    public getGroupName (): string {
        return this.groupName;
    }

    /**
     * @param stackTraceData
     */
    public abstract initialize (stackTraceData: IStackTraceData[]): void;
}
