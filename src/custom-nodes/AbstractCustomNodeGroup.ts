import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithStatements } from '../types/node/TNodeWithStatements';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../interfaces/custom-nodes/ICustomNodeGroup';
import { IIdentifierNamesGenerator } from '../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { ICallsGraphData } from '../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';

import { CustomNode } from '../enums/custom-nodes/CustomNode';
import { ObfuscationEvent } from '../enums/event-emitters/ObfuscationEvent';

@injectable()
export abstract class AbstractCustomNodeGroup implements ICustomNodeGroup {
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
     * @type {ObfuscationEvent}
     */
    protected abstract readonly appendEvent: ObfuscationEvent;

    /**
     * @type {Map<CustomNode, ICustomNode>}
     */
    protected abstract customNodes: Map <CustomNode, ICustomNode>;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
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
     * @param {number} callsGraphLength
     * @returns {number}
     */
    protected getRandomCallsGraphIndex (callsGraphLength: number): number {
        return this.randomGenerator.getRandomInteger(0, Math.max(0, Math.round(callsGraphLength - 1)));
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {ICallsGraphData[]} callsGraphData
     */
    public abstract appendCustomNodes (nodeWithStatements: TNodeWithStatements, callsGraphData: ICallsGraphData[]): void;

    public abstract initialize (): void;
}
