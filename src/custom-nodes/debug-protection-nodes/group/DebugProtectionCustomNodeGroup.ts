import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomNodeFactory } from '../../../types/container/custom-nodes/TCustomNodeFactory';
import { TNodeWithBlockStatement } from '../../../types/node/TNodeWithBlockStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStackTraceData } from '../../../interfaces/analyzers/stack-trace-analyzer/IStackTraceData';

import { initializable } from '../../../decorators/Initializable';

import { CustomNode } from '../../../enums/custom-nodes/CustomNode';
import { ObfuscationEvent } from '../../../enums/event-emitters/ObfuscationEvent';

import { AbstractCustomNodeGroup } from '../../AbstractCustomNodeGroup';
import { NodeAppender } from '../../../node/NodeAppender';

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
    protected customNodes: Map <CustomNode, ICustomNode>;

    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @param {TCustomNodeFactory} customNodeFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.customNodeFactory = customNodeFactory;
    }

    /**
     * @param {TNodeWithBlockStatement} blockScopeNode
     * @param {IStackTraceData[]} stackTraceData
     */
    public appendCustomNodes (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void {
        const randomStackTraceIndex: number = this.getRandomStackTraceIndex(stackTraceData.length);

        // debugProtectionFunctionCallNode append
        this.appendCustomNodeIfExist(CustomNode.DebugProtectionFunctionCallNode, (customNode: ICustomNode) => {
            NodeAppender.appendNodeToOptimalBlockScope(
                stackTraceData,
                blockScopeNode,
                customNode.getNode(),
                randomStackTraceIndex
            );
        });

        // debugProtectionFunctionNode append
        this.appendCustomNodeIfExist(CustomNode.DebugProtectionFunctionNode, (customNode: ICustomNode) => {
            NodeAppender.appendNode(blockScopeNode, customNode.getNode());
        });

        // debugProtectionFunctionIntervalNode append
        this.appendCustomNodeIfExist(CustomNode.DebugProtectionFunctionIntervalNode, (customNode: ICustomNode) => {
            const programBodyLength: number = blockScopeNode.body.length;
            const randomIndex: number = this.randomGenerator.getRandomInteger(0, programBodyLength);

            NodeAppender.insertNodeAtIndex(blockScopeNode, customNode.getNode(), randomIndex);
        });
    }

    public initialize (): void {
        this.customNodes = new Map <CustomNode, ICustomNode>();

        if (!this.options.debugProtection) {
            return;
        }

        const debugProtectionFunctionName: string = this.randomGenerator.getRandomVariableName(6);

        const debugProtectionFunctionNode: ICustomNode = this.customNodeFactory(CustomNode.DebugProtectionFunctionNode);
        const debugProtectionFunctionCallNode: ICustomNode = this.customNodeFactory(CustomNode.DebugProtectionFunctionCallNode);
        const debugProtectionFunctionIntervalNode: ICustomNode = this.customNodeFactory(CustomNode.DebugProtectionFunctionIntervalNode);

        debugProtectionFunctionNode.initialize(debugProtectionFunctionName);
        debugProtectionFunctionCallNode.initialize(debugProtectionFunctionName);
        debugProtectionFunctionIntervalNode.initialize(debugProtectionFunctionName);

        this.customNodes.set(CustomNode.DebugProtectionFunctionNode, debugProtectionFunctionNode);
        this.customNodes.set(CustomNode.DebugProtectionFunctionCallNode, debugProtectionFunctionCallNode);

        if (this.options.debugProtectionInterval) {
            this.customNodes.set(CustomNode.DebugProtectionFunctionIntervalNode, debugProtectionFunctionIntervalNode);
        }
    }
}
