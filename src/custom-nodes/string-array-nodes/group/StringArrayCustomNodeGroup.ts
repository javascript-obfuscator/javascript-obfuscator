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

import { AbstractCustomNodeGroup } from '../../AbstractCustomNodeGroup';
import { NodeAppender } from '../../../node/NodeAppender';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';
import { Utils } from '../../../utils/Utils';

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
    private stringArrayStorage: IStorage <string>;

    /**
     * @param customNodeFactory
     * @param obfuscationEventEmitter
     * @param stringArrayStorage
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IObfuscationEventEmitter) obfuscationEventEmitter: IObfuscationEventEmitter,
        @inject(ServiceIdentifiers.TStringArrayStorage) stringArrayStorage: IStorage<string>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeFactory = customNodeFactory;
        this.obfuscationEventEmitter = obfuscationEventEmitter;
        this.stringArrayStorage = stringArrayStorage;
    }

    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    public appendCustomNodes (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void {
        if (!this.stringArrayStorage.getLength()) {
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

        if (!this.options.stringArray) {
            return;
        }

        const stringArrayNode: ICustomNode = this.customNodeFactory(CustomNodes.StringArrayNode);
        const stringArrayCallsWrapper: ICustomNode = this.customNodeFactory(CustomNodes.StringArrayCallsWrapper);
        const stringArrayRotateFunctionNode: ICustomNode = this.customNodeFactory(CustomNodes.StringArrayRotateFunctionNode);

        const stringArrayStorageId: string = this.stringArrayStorage.getStorageId();

        const stringArrayName: string = `_${Utils.hexadecimalPrefix}${stringArrayStorageId}`;
        const stringArrayCallsWrapperName: string = `_${Utils.hexadecimalPrefix}${Utils.stringRotate(stringArrayStorageId, 1)}`;

        let stringArrayRotateValue: number;

        if (this.options.rotateStringArray) {
            stringArrayRotateValue = RandomGeneratorUtils.getRandomInteger(100, 500);
        } else {
            stringArrayRotateValue = 0;
        }

        stringArrayNode.initialize(this.stringArrayStorage, stringArrayName, stringArrayRotateValue);
        stringArrayCallsWrapper.initialize(this.stringArrayStorage, stringArrayName, stringArrayCallsWrapperName);
        stringArrayRotateFunctionNode.initialize(this.stringArrayStorage, stringArrayName, stringArrayRotateValue);

        this.customNodes.set(CustomNodes.StringArrayNode, stringArrayNode);
        this.customNodes.set(CustomNodes.StringArrayCallsWrapper, stringArrayCallsWrapper);

        if (this.options.rotateStringArray) {
            this.customNodes.set(CustomNodes.StringArrayRotateFunctionNode, stringArrayRotateFunctionNode);
        }
    }
}
