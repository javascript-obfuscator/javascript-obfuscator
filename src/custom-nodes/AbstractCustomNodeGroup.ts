import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TNodeWithBlockStatement } from '../types/node/TNodeWithBlockStatement';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../interfaces/custom-nodes/ICustomNodeGroup';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { CustomNode } from '../enums/container/custom-nodes/CustomNode';
import { ObfuscationEvent } from '../enums/event-emitters/ObfuscationEvent';

@injectable()
export abstract class AbstractCustomNodeGroup implements ICustomNodeGroup {
    /**
     * @type {ObfuscationEvent}
     */
    protected abstract readonly appendEvent: ObfuscationEvent;

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
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @param randomGenerator
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    public abstract appendCustomNodes (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void;

    /**
     * @returns {ObfuscationEvent}
     */
    public getAppendEvent (): ObfuscationEvent {
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

    /**
     * @param stackTraceLength
     */
    protected getRandomStackTraceIndex (stackTraceLength: number): number {
        return this.randomGenerator.getRandomInteger(0, Math.max(0, Math.round(stackTraceLength - 1)));
    }
}
