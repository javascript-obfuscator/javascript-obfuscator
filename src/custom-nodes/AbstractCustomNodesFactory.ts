import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TObfuscationEvent } from '../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { ICustomNodesFactory } from '../interfaces/custom-nodes/ICustomNodesFactory';
import { IOptions } from '../interfaces/options/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { ObfuscationEvents } from '../enums/ObfuscationEvents';

@injectable()
export abstract class AbstractCustomNodesFactory implements ICustomNodesFactory {
    /**
     * @type {TObfuscationEvent}
     */
    protected readonly appendEvent: TObfuscationEvent = ObfuscationEvents.BeforeObfuscation;

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
     * @param stackTraceData
     * @returns {Map<string, ICustomNode> | undefined}
     */
    public abstract initializeCustomNodes (stackTraceData: IStackTraceData[]): Map <string, ICustomNode> | undefined;

    /**
     * @param customNodes
     * @returns {Map<string, ICustomNode>}
     */
    protected syncCustomNodesWithNodesFactory (customNodes: Map <string, ICustomNode>): Map <string, ICustomNode> {
        customNodes.forEach((customNode: ICustomNode) => {
            customNode.setAppendEvent(this.appendEvent);
        });

        return customNodes;
    }
}
