import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';
import { TNodeWithBlockStatement } from '../../../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../../../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from '../../../interfaces/event-emitters/IObfuscationEventEmitter';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { initializable } from '../../../decorators/Initializable';

import { CustomNodes } from '../../../enums/container/CustomNodes';
import { ObfuscationEvents } from '../../../enums/ObfuscationEvents';

import { AbstractCustomNodeGroup } from '../../AbstractCustomNodeGroup';
import { NodeAppender } from '../../../node/NodeAppender';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';

@injectable()
export class DomainLockCustomNodeGroup extends AbstractCustomNodeGroup {
    /**
     * @type {TObfuscationEvent}
     */
    protected readonly appendEvent: TObfuscationEvent = ObfuscationEvents.BeforeObfuscation;

    /**
     * @type {Map<CustomNodes, ICustomNode>}
     */
    @initializable()
    protected customNodes: Map <CustomNodes, ICustomNode>;

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

        // domainLockNode append
        this.appendCustomNodeIfExist(CustomNodes.DomainLockNode, (customNode: ICustomNode) => {
            NodeAppender.appendNodeToOptimalBlockScope(
                stackTraceData,
                blockScopeNode,
                customNode.getNode(),
                randomStackTraceIndex
            );
        });

        // nodeCallsControllerFunctionNode append
        this.appendCustomNodeIfExist(CustomNodes.NodeCallsControllerFunctionNode, (customNode: ICustomNode) => {
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
        this.customNodes = new Map <CustomNodes, ICustomNode> ();

        if (!this.options.domainLock.length) {
            return;
        }

        const callsControllerFunctionName: string = RandomGeneratorUtils.getRandomVariableName();

        const domainLockNode: ICustomNode = this.customNodeFactory(CustomNodes.DomainLockNode);
        const nodeCallsControllerFunctionNode: ICustomNode = this.customNodeFactory(CustomNodes.NodeCallsControllerFunctionNode);

        domainLockNode.initialize(callsControllerFunctionName);
        nodeCallsControllerFunctionNode.initialize(this.appendEvent, callsControllerFunctionName);

        this.customNodes.set(CustomNodes.DomainLockNode, domainLockNode);
        this.customNodes.set(CustomNodes.NodeCallsControllerFunctionNode, nodeCallsControllerFunctionNode);
    }
}
