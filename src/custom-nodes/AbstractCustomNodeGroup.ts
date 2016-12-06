import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TNodeWithBlockStatement } from '../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../interfaces/custom-nodes/ICustomNodeGroup';
import { IOptions } from '../interfaces/options/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { CustomNodes } from '../enums/container/CustomNodes';

@injectable()
export abstract class AbstractCustomNodeGroup implements ICustomNodeGroup {
    /**
     * @type {TObfuscationEvent}
     */
    protected abstract readonly appendEvent: TObfuscationEvent;

    /**
     * @type {Map<CustomNodes, ICustomNode>}
     */
    protected abstract customNodes: Map <CustomNodes, ICustomNode>;

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
     * @param blockScopeNode
     * @param stackTraceData
     */
    public abstract appendCustomNodes (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void;

    /**
     * @returns {TObfuscationEvent}
     */
    public getAppendEvent (): TObfuscationEvent {
        return this.appendEvent;
    }

    /**
     * @returns {Map<CustomNodes, ICustomNode>}
     */
    public getCustomNodes (): Map <CustomNodes, ICustomNode> {
        return this.customNodes;
    }

    public abstract initialize (): void;

    /**
     * @param customNodeName
     * @param callback
     */
    protected appendCustomNodeIfExist (customNodeName: CustomNodes, callback: (customNode: ICustomNode) => void): void {
        const customNode: ICustomNode | undefined = this.customNodes.get(customNodeName);

        if (!customNode) {
            return;
        }

        callback(customNode);
    }
}
