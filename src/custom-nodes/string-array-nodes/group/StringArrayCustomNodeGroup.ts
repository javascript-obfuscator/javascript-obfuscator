import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomNodeFactory } from '../../../types/container/custom-nodes/TCustomNodeFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';
import { TStringArrayStorage } from '../../../types/storages/TStringArrayStorage';

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
export class StringArrayCustomNodeGroup extends AbstractCustomNodeGroup {
    /**
     * @type {ObfuscationEvent}
     */
    protected appendEvent: ObfuscationEvent = ObfuscationEvent.AfterObfuscation;

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
     * @type {TStringArrayStorage}
     */
    private readonly stringArrayStorage: TStringArrayStorage;

    /**
     * @param {TCustomNodeFactory} customNodeFactory
     * @param {TStringArrayStorage} stringArrayStorage
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.TStringArrayStorage) stringArrayStorage: TStringArrayStorage,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);

        this.customNodeFactory = customNodeFactory;
        this.stringArrayStorage = stringArrayStorage;
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {IStackTraceData[]} stackTraceData
     */
    public appendCustomNodes (nodeWithStatements: TNodeWithStatements, stackTraceData: IStackTraceData[]): void {
        if (!this.stringArrayStorage.getLength()) {
            return;
        }

        // stringArrayNode append
        this.appendCustomNodeIfExist(CustomNode.StringArrayNode, (customNode: ICustomNode) => {
            NodeAppender.prepend(nodeWithStatements, customNode.getNode());
        });

        // stringArrayCallsWrapper append
        this.appendCustomNodeIfExist(CustomNode.StringArrayCallsWrapper, (customNode: ICustomNode) => {
            NodeAppender.insertAtIndex(nodeWithStatements, customNode.getNode(), 1);
        });

        // stringArrayRotateFunctionNode append
        this.appendCustomNodeIfExist(CustomNode.StringArrayRotateFunctionNode, (customNode: ICustomNode) => {
            NodeAppender.insertAtIndex(nodeWithStatements, customNode.getNode(), 1);
        });
    }

    public initialize (): void {
        this.customNodes = new Map <CustomNode, ICustomNode>();

        if (!this.options.stringArray) {
            return;
        }

        const stringArrayNode: ICustomNode = this.customNodeFactory(CustomNode.StringArrayNode);
        const stringArrayCallsWrapper: ICustomNode = this.customNodeFactory(CustomNode.StringArrayCallsWrapper);
        const stringArrayRotateFunctionNode: ICustomNode = this.customNodeFactory(CustomNode.StringArrayRotateFunctionNode);

        const stringArrayStorageId: string = this.stringArrayStorage.getStorageId();

        const [stringArrayName, stringArrayCallsWrapperName]: string[] = stringArrayStorageId.split('|');

        let stringArrayRotateValue: number;

        if (this.options.rotateStringArray) {
            stringArrayRotateValue = this.randomGenerator.getRandomInteger(100, 500);
        } else {
            stringArrayRotateValue = 0;
        }

        stringArrayNode.initialize(this.stringArrayStorage, stringArrayName, stringArrayRotateValue);
        stringArrayCallsWrapper.initialize(stringArrayName, stringArrayCallsWrapperName);
        stringArrayRotateFunctionNode.initialize(stringArrayName, stringArrayRotateValue);

        this.customNodes.set(CustomNode.StringArrayNode, stringArrayNode);
        this.customNodes.set(CustomNode.StringArrayCallsWrapper, stringArrayCallsWrapper);

        if (this.options.rotateStringArray) {
            this.customNodes.set(CustomNode.StringArrayRotateFunctionNode, stringArrayRotateFunctionNode);
        }
    }
}
