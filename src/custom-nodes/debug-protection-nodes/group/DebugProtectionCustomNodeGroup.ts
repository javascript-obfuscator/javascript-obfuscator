import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomNodeFactory } from '../../../types/container/custom-nodes/TCustomNodeFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStackTraceData } from '../../../interfaces/analyzers/stack-trace-analyzer/IStackTraceData';

import { initializable } from '../../../decorators/Initializable';

import { CustomNode } from '../../../enums/custom-nodes/CustomNode';
import { ObfuscationEvent } from '../../../enums/event-emitters/ObfuscationEvent';

import { AbstractCustomNodeGroup } from '../../AbstractCustomNodeGroup';
import { NodeAppender } from '../../../node/NodeAppender';
import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class DebugProtectionCustomNodeGroup extends AbstractCustomNodeGroup {
    /**
     * @type {ObfuscationEvent}
     */
    protected readonly appendEvent: ObfuscationEvent = ObfuscationEvent.BeforeObfuscation;

    /**
     * @type {Map<CustomNode, ICustomNode>}
     */
    @initializable()
    protected customNodes!: Map <CustomNode, ICustomNode>;

    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @param {TCustomNodeFactory} customNodeFactory
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);

        this.customNodeFactory = customNodeFactory;
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {IStackTraceData[]} stackTraceData
     */
    public appendCustomNodes (nodeWithStatements: TNodeWithStatements, stackTraceData: IStackTraceData[]): void {
        const randomStackTraceIndex: number = this.getRandomStackTraceIndex(stackTraceData.length);

        // debugProtectionFunctionCallNode append
        this.appendCustomNodeIfExist(CustomNode.DebugProtectionFunctionCallNode, (customNode: ICustomNode) => {
            NodeAppender.appendToOptimalBlockScope(
                stackTraceData,
                nodeWithStatements,
                customNode.getNode(),
                randomStackTraceIndex
            );
        });

        // debugProtectionFunctionNode append
        this.appendCustomNodeIfExist(CustomNode.DebugProtectionFunctionNode, (customNode: ICustomNode) => {
            NodeAppender.append(nodeWithStatements, customNode.getNode());
        });

        // debugProtectionFunctionIntervalNode append
        this.appendCustomNodeIfExist(CustomNode.DebugProtectionFunctionIntervalNode, (customNode: ICustomNode) => {
            const programBodyLength: number = NodeGuards.isSwitchCaseNode(nodeWithStatements)
                ? nodeWithStatements.consequent.length
                : nodeWithStatements.body.length;
            const randomIndex: number = this.randomGenerator.getRandomInteger(0, programBodyLength);

            NodeAppender.insertAtIndex(nodeWithStatements, customNode.getNode(), randomIndex);
        });

        // nodeCallsControllerFunctionNode append
        this.appendCustomNodeIfExist(CustomNode.NodeCallsControllerFunctionNode, (customNode: ICustomNode) => {
            const targetNodeWithStatements: TNodeWithStatements = stackTraceData.length
                ? NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1)
                : nodeWithStatements;

            NodeAppender.prepend(targetNodeWithStatements, customNode.getNode());
        });
    }

    public initialize (): void {
        this.customNodes = new Map <CustomNode, ICustomNode>();

        if (!this.options.debugProtection) {
            return;
        }

        const debugProtectionFunctionName: string = this.identifierNamesGenerator.generate();
        const callsControllerFunctionName: string = this.identifierNamesGenerator.generate();

        const debugProtectionFunctionNode: ICustomNode = this.customNodeFactory(CustomNode.DebugProtectionFunctionNode);
        const debugProtectionFunctionCallNode: ICustomNode = this.customNodeFactory(CustomNode.DebugProtectionFunctionCallNode);
        const debugProtectionFunctionIntervalNode: ICustomNode = this.customNodeFactory(CustomNode.DebugProtectionFunctionIntervalNode);
        const nodeCallsControllerFunctionNode: ICustomNode = this.customNodeFactory(CustomNode.NodeCallsControllerFunctionNode);

        debugProtectionFunctionNode.initialize(debugProtectionFunctionName);
        debugProtectionFunctionCallNode.initialize(debugProtectionFunctionName, callsControllerFunctionName);
        debugProtectionFunctionIntervalNode.initialize(debugProtectionFunctionName);
        nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);

        this.customNodes.set(CustomNode.DebugProtectionFunctionNode, debugProtectionFunctionNode);
        this.customNodes.set(CustomNode.DebugProtectionFunctionCallNode, debugProtectionFunctionCallNode);

        if (this.options.debugProtectionInterval) {
            this.customNodes.set(CustomNode.DebugProtectionFunctionIntervalNode, debugProtectionFunctionIntervalNode);
        }

        this.customNodes.set(CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
}
