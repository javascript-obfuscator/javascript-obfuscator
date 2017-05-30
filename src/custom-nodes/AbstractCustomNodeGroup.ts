import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TNodeWithBlockStatement } from '../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../interfaces/custom-nodes/ICustomNodeGroup';
import { IOptions } from '../interfaces/options/IOptions';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { CustomNode } from '../enums/container/custom-nodes/CustomNode';

@injectable()
export abstract class AbstractCustomNodeGroup implements ICustomNodeGroup {
    /**
     * @type {TObfuscationEvent}
     */
    protected abstract readonly appendEvent: TObfuscationEvent;

    /**
     * @type {Map<CustomNode, ICustomNode>}
     */
    protected abstract customNodes: Map <CustomNode, ICustomNode>;

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
     * @returns {Map<CustomNode, ICustomNode>}
     */
    public getCustomNodes (): Map <CustomNode, ICustomNode> {
        return this.customNodes;
    }

    public abstract initialize (): void;

    /**
     * @param customNodeName
     * @param callback
     */
    protected appendCustomNodeIfExist (customNodeName: CustomNode, callback: (customNode: ICustomNode) => void): void {
        const customNode: ICustomNode | undefined = this.customNodes.get(customNodeName);

        if (!customNode) {
            return;
        }

        callback(customNode);
    }
}
