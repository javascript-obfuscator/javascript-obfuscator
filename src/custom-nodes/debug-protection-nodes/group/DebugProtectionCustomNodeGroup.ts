import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomNodeFactory } from '../../../types/container/custom-nodes/TCustomNodeFactory';
import { TNodeWithBlockStatement } from '../../../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../../../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from '../../../interfaces/event-emitters/IObfuscationEventEmitter';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { initializable } from '../../../decorators/Initializable';

import { CustomNode } from '../../../enums/container/custom-nodes/CustomNode';
import { ObfuscationEvent } from '../../../enums/event-emitters/ObfuscationEvent';

import { AbstractCustomNodeGroup } from '../../AbstractCustomNodeGroup';
import { NodeAppender } from '../../../node/NodeAppender';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';

@injectable()
export class DebugProtectionCustomNodeGroup extends AbstractCustomNodeGroup {
    /**
     * @type {TObfuscationEvent}
     */
    protected readonly appendEvent: TObfuscationEvent = ObfuscationEvent.BeforeObfuscation;

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
     * @type {IObfuscationEventEmitter}
     */
    private readonly obfuscationEventEmitter: IObfuscationEventEmitter;

    /**
     * @param customNodeFactory
     * @param obfuscationEventEmitter
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeFactory = customNodeFactory;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
    }

    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    public appendCustomNodes (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void {
        // debugProtectionFunctionNode append
        this.appendCustomNodeIfExist(CustomNode.DebugProtectionFunctionNode, (customNode: ICustomNode) => {
            NodeAppender.appendNode(blockScopeNode, customNode.getNode());
        });

        // debugProtectionFunctionCallNode append
        this.appendCustomNodeIfExist(CustomNode.DebugProtectionFunctionCallNode, (customNode: ICustomNode) => {
            NodeAppender.appendNode(blockScopeNode, customNode.getNode());
        });

        // debugProtectionFunctionIntervalNode append
        this.appendCustomNodeIfExist(CustomNode.DebugProtectionFunctionIntervalNode, (customNode: ICustomNode) => {
            const programBodyLength: number = blockScopeNode.body.length;
            const randomIndex: number = RandomGeneratorUtils.getRandomInteger(0, programBodyLength);

            NodeAppender.insertNodeAtIndex(blockScopeNode, customNode.getNode(), randomIndex);
        });
    }

    public initialize (): void {
        this.customNodes = new Map <CustomNode, ICustomNode> ();

        if (!this.options.debugProtection) {
            return;
        }

        const debugProtectionFunctionName: string = RandomGeneratorUtils.getRandomVariableName(6);

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
