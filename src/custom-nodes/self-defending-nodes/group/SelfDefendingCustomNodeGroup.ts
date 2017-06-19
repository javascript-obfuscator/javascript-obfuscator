import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomNodeFactory } from '../../../types/container/custom-nodes/TCustomNodeFactory';
import { TNodeWithBlockStatement } from '../../../types/node/TNodeWithBlockStatement';

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
export class SelfDefendingCustomNodeGroup extends AbstractCustomNodeGroup {
    /**
     * @type {ObfuscationEvent}
     */
    protected appendEvent: ObfuscationEvent = ObfuscationEvent.AfterObfuscation;

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
        const randomStackTraceIndex: number = NodeAppender.getRandomStackTraceIndex(stackTraceData.length);

        // selfDefendingUnicodeNode append
        this.appendCustomNodeIfExist(CustomNode.SelfDefendingUnicodeNode, (customNode: ICustomNode) => {
            NodeAppender.appendNodeToOptimalBlockScope(
                stackTraceData,
                blockScopeNode,
                customNode.getNode(),
                randomStackTraceIndex
            );
        });

        // nodeCallsControllerFunctionNode append
        this.appendCustomNodeIfExist(CustomNode.NodeCallsControllerFunctionNode, (customNode: ICustomNode) => {
            let targetBlockScope: TNodeWithBlockStatement;

            if (stackTraceData.length) {
                targetBlockScope = NodeAppender.getOptimalBlockScope(stackTraceData, randomStackTraceIndex, 1);
            } else {
                targetBlockScope = blockScopeNode;
            }

            NodeAppender.prependNode(targetBlockScope, customNode.getNode());
        });
    }

    public initialize (): void {
        this.customNodes = new Map <CustomNode, ICustomNode> ();

        if (!this.options.selfDefending) {
            return;
        }

        const callsControllerFunctionName: string = RandomGeneratorUtils.getRandomVariableName(6);

        const selfDefendingUnicodeNode: ICustomNode = this.customNodeFactory(CustomNode.SelfDefendingUnicodeNode);
        const nodeCallsControllerFunctionNode: ICustomNode = this.customNodeFactory(CustomNode.NodeCallsControllerFunctionNode);

        selfDefendingUnicodeNode.initialize(callsControllerFunctionName);
        nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);

        this.customNodes.set(CustomNode.SelfDefendingUnicodeNode, selfDefendingUnicodeNode);
        this.customNodes.set(CustomNode.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
}
