import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithStatements } from '../types/node/TNodeWithStatements';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../interfaces/custom-nodes/ICustomNodeGroup';
import { IIdentifierNamesGenerator } from '../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { IStackTraceData } from '../interfaces/analyzers/stack-trace-analyzer/IStackTraceData';

import { CustomNode } from '../enums/custom-nodes/CustomNode';
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
     * @type {IIdentifierNamesGenerator}
     */
    protected readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {IStackTraceData[]} stackTraceData
     */
    public abstract appendCustomNodes (nodeWithStatements: TNodeWithStatements, stackTraceData: IStackTraceData[]): void;

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
     * @param {CustomNode} customNodeName
     * @param {callback} callback
     */
    protected appendCustomNodeIfExist (customNodeName: CustomNode, callback: (customNode: ICustomNode) => void): void {
        const customNode: ICustomNode | undefined = this.customNodes.get(customNodeName);

        if (!customNode) {
            return;
        }

        callback(customNode);
    }

    /**
     * @param {number} stackTraceLength
     * @returns {number}
     */
    protected getRandomStackTraceIndex (stackTraceLength: number): number {
        return this.randomGenerator.getRandomInteger(0, Math.max(0, Math.round(stackTraceLength - 1)));
    }
}
