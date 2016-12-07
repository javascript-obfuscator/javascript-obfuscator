import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';
import { TNodeWithBlockStatement } from '../../../types/node/TNodeWithBlockStatement';
import { TObfuscationEvent } from '../../../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IObfuscationEventEmitter } from '../../../interfaces/event-emitters/IObfuscationEventEmitter';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { initializable } from '../../../decorators/Initializable';

import { CustomNodes } from '../../../enums/container/CustomNodes';
import { ObfuscationEvents } from '../../../enums/ObfuscationEvents';

import { StringArrayNode } from '../StringArrayNode';

import { AbstractCustomNodeGroup } from '../../AbstractCustomNodeGroup';
import { NodeAppender } from '../../../node/NodeAppender';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';
import { StringArrayStorage } from '../../../storages/string-array/StringArrayStorage';

@injectable()
export class StringArrayCustomNodeGroup extends AbstractCustomNodeGroup {
    /**
     * @type {TObfuscationEvent}
     */
    protected appendEvent: TObfuscationEvent = ObfuscationEvents.AfterObfuscation;

    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @type {Map<CustomNodes, ICustomNode>}
     */
    @initializable()
    protected customNodes: Map <CustomNodes, ICustomNode>;

    /**
     * @type {IObfuscationEventEmitter}
     */
    private readonly obfuscationEventEmitter: IObfuscationEventEmitter;

    /**
     * @type {IStorage <string>}
     */
    @initializable()
    private stringArray: IStorage <string>;

    /**
     * @param customNodeFactory
     * @param obfuscationEventEmitter
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['Factory<ICustomNode>']) customNodeFactory: TCustomNodeFactory,
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
        if (!this.stringArray.getLength()) {
            return;
        }

        // stringArrayNode append
        this.appendCustomNodeIfExist(CustomNodes.StringArrayNode, (customNode: ICustomNode) => {
            NodeAppender.prependNode(blockScopeNode, customNode.getNode());
        });

        // stringArrayCallsWrapper append
        this.appendCustomNodeIfExist(CustomNodes.StringArrayCallsWrapper, (customNode: ICustomNode) => {
            NodeAppender.insertNodeAtIndex(blockScopeNode, customNode.getNode(), 1);
        });

        // stringArrayRotateFunctionNode append
        this.appendCustomNodeIfExist(CustomNodes.StringArrayRotateFunctionNode, (customNode: ICustomNode) => {
            NodeAppender.insertNodeAtIndex(blockScopeNode, customNode.getNode(), 1);
        });
    }

    public initialize (): void {
        this.customNodes = new Map <CustomNodes, ICustomNode> ();
        this.stringArray = new StringArrayStorage();

        if (!this.options.stringArray) {
            return;
        }

        const stringArrayNode: ICustomNode = this.customNodeFactory(CustomNodes.StringArrayNode);
        const stringArrayCallsWrapper: ICustomNode = this.customNodeFactory(CustomNodes.StringArrayCallsWrapper);
        const stringArrayRotateFunctionNode: ICustomNode = this.customNodeFactory(CustomNodes.StringArrayRotateFunctionNode);

        const stringArrayName: string = RandomGeneratorUtils.getRandomVariableName(StringArrayNode.ARRAY_RANDOM_LENGTH);
        const stringArrayCallsWrapperName: string = RandomGeneratorUtils.getRandomVariableName(StringArrayNode.ARRAY_RANDOM_LENGTH);

        let stringArrayRotateValue: number;

        if (this.options.rotateStringArray) {
            stringArrayRotateValue = RandomGeneratorUtils.getRandomInteger(100, 500);
        } else {
            stringArrayRotateValue = 0;
        }

        stringArrayNode.initialize(this.stringArray, stringArrayName, stringArrayRotateValue);
        stringArrayCallsWrapper.initialize(this.stringArray, stringArrayName, stringArrayCallsWrapperName);
        stringArrayRotateFunctionNode.initialize(this.stringArray, stringArrayName, stringArrayRotateValue);

        this.customNodes.set(CustomNodes.StringArrayNode, stringArrayNode);
        this.customNodes.set(CustomNodes.StringArrayCallsWrapper, stringArrayCallsWrapper);

        if (this.options.rotateStringArray) {
            this.customNodes.set(CustomNodes.StringArrayRotateFunctionNode, stringArrayRotateFunctionNode);
        }
    }
}
