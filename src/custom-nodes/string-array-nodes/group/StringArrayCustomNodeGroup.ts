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
import { StringArrayStorage } from '../../../storages/string-array/StringArrayStorage';
import { Utils } from '../../../Utils';

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
     * @type {Map<string, ICustomNode>}
     */
    @initializable()
    protected customNodes: Map <string, ICustomNode>;

    /**
     * @type {string}
     */
    protected readonly groupName: string = 'stringArrayCustomNodeGroup';

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
        @inject(ServiceIdentifiers['Factory<ICustomNode>']) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeFactory = customNodeFactory;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
    }

    /**
     * @param stackTraceData
     */
    public initialize (stackTraceData: IStackTraceData[]): void {
        const stringArray: IStorage <string> = new StringArrayStorage();

        const stringArrayNode: ICustomNode = this.customNodeFactory(CustomNodes.StringArrayNode);
        const stringArrayCallsWrapper: ICustomNode = this.customNodeFactory(CustomNodes.StringArrayCallsWrapper);
        const stringArrayRotateFunctionNode: ICustomNode = this.customNodeFactory(CustomNodes.StringArrayRotateFunctionNode);

        const stringArrayName: string = Utils.getRandomVariableName(StringArrayNode.ARRAY_RANDOM_LENGTH);
        const stringArrayCallsWrapperName: string = Utils.getRandomVariableName(StringArrayNode.ARRAY_RANDOM_LENGTH);

        let stringArrayRotateValue: number;

        if (this.options.rotateStringArray) {
            stringArrayRotateValue = Utils.getRandomInteger(100, 500);
        } else {
            stringArrayRotateValue = 0;
        }

        stringArrayNode.initialize(stringArray, stringArrayName, stringArrayRotateValue);
        stringArrayCallsWrapper.initialize(stringArray, stringArrayName, stringArrayCallsWrapperName);
        stringArrayRotateFunctionNode.initialize(stringArray, stringArrayName, stringArrayRotateValue);

        this.customNodes = new Map <string, ICustomNode> ([
            ['stringArrayNode', stringArrayNode],
            ['stringArrayCallsWrapper', stringArrayCallsWrapper]
        ]);

        this.obfuscationEventEmitter.once(
            this.appendEvent,
            (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]) => {
                if (!this.options.stringArray || !stringArray.getLength()) {
                    return;
                }

                // stringArrayNode append
                NodeAppender.prependNode(blockScopeNode, stringArrayNode.getNode());

                // stringArrayCallsWrapper append
                NodeAppender.insertNodeAtIndex(blockScopeNode, stringArrayCallsWrapper.getNode(), 1);
            }
        );

        if (this.options.rotateStringArray) {
            this.customNodes.set('stringArrayRotateFunctionNode', stringArrayRotateFunctionNode);

            this.obfuscationEventEmitter.once(
                this.appendEvent,
                (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]) => {
                    if (!this.options.stringArray || !stringArray.getLength()) {
                        return;
                    }

                    // stringArrayRotateFunctionNode append
                    NodeAppender.insertNodeAtIndex(blockScopeNode, stringArrayRotateFunctionNode.getNode(), 1);
                }
            );
        }
    }
}
