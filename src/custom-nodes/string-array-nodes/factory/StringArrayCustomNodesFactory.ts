import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TObfuscationEvent } from '../../../types/event-emitters/TObfuscationEvent';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { ObfuscationEvents } from '../../../enums/ObfuscationEvents';

import { StringArrayCallsWrapper } from '../StringArrayCallsWrapper';
import { StringArrayNode } from '../StringArrayNode';
import { StringArrayRotateFunctionNode } from '../StringArrayRotateFunctionNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { StringArrayStorage } from '../../../storages/string-array/StringArrayStorage';
import { Utils } from '../../../Utils';

@injectable()
export class StringArrayCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @type {TObfuscationEvent}
     */
    protected appendEvent: TObfuscationEvent = ObfuscationEvents.AfterObfuscation;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param stackTraceData
     * @returns {Map<string, ICustomNode>}
     */
    public initializeCustomNodes (stackTraceData: IStackTraceData[]): Map <string, ICustomNode> | undefined {
        if (!this.options.stringArray) {
            return;
        }

        const stringArray: IStorage <string> = new StringArrayStorage();

        const stringArrayNode: ICustomNode = new StringArrayNode(this.options);
        const stringArrayCallsWrapper: ICustomNode = new StringArrayCallsWrapper(this.options);
        const stringArrayRotateFunctionNode: ICustomNode = new StringArrayRotateFunctionNode(this.options);

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

        const customNodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ([
            ['stringArrayNode', stringArrayNode],
            ['stringArrayCallsWrapper', stringArrayCallsWrapper]
        ]);

        if (this.options.rotateStringArray) {
            customNodes.set('stringArrayRotateFunctionNode', stringArrayRotateFunctionNode);
        }

        return this.syncCustomNodesWithNodesFactory(customNodes);
    }
}
