import { TObfuscationEvent } from '../../../types/TObfuscationEvent';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IStackTraceData } from '../../../interfaces/stack-trace-analyzer/IStackTraceData';

import { ObfuscationEvents } from '../../../enums/ObfuscationEvents';

import { StringArrayCallsWrapper } from '../StringArrayCallsWrapper';
import { StringArrayNode } from '../StringArrayNode';
import { StringArrayRotateFunctionNode } from '../StringArrayRotateFunctionNode';

import { AbstractCustomNodesFactory } from '../../AbstractCustomNodesFactory';
import { StringArrayStorage } from '../../../storages/string-array/StringArrayStorage';
import { Utils } from '../../../Utils';
import { IStorage } from '../../../interfaces/IStorage';

export class StringArrayCustomNodesFactory extends AbstractCustomNodesFactory {
    /**
     * @type {TObfuscationEvent}
     */
    protected appendEvent: TObfuscationEvent = ObfuscationEvents.AfterObfuscation;

    /**
     * @type {string}
     */
    private stringArrayName: string = Utils.getRandomVariableName(StringArrayNode.ARRAY_RANDOM_LENGTH);

    /**
     * @type {string}
     */
    private stringArrayCallsWrapper: string = Utils.getRandomVariableName(StringArrayNode.ARRAY_RANDOM_LENGTH);

    /**
     * @type {number}
     */
    private stringArrayRotateValue: number;

    /**
     * @param stackTraceData
     * @returns {Map<string, ICustomNode>}
     */
    public initializeCustomNodes (stackTraceData: IStackTraceData[]): Map <string, ICustomNode> | undefined {
        if (!this.options.stringArray) {
            return;
        }

        if (this.options.rotateStringArray) {
            this.stringArrayRotateValue = Utils.getRandomInteger(100, 500);
        } else {
            this.stringArrayRotateValue = 0;
        }

        const stringArray: IStorage <string> = new StringArrayStorage();
        const stringArrayNode: ICustomNode = new StringArrayNode(
            stringArray,
            this.stringArrayName,
            this.stringArrayRotateValue,
            this.options
        );
        const customNodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ([
            [
                'stringArrayNode', stringArrayNode,
            ],
            [
                'stringArrayCallsWrapper',
                new StringArrayCallsWrapper(
                    this.stringArrayCallsWrapper,
                    this.stringArrayName,
                    stringArray,
                    this.options
                )
            ]
        ]);

        if (this.options.rotateStringArray) {
            customNodes.set(
                'stringArrayRotateFunctionNode',
                new StringArrayRotateFunctionNode(
                    this.stringArrayName,
                    stringArray,
                    this.stringArrayRotateValue,
                    this.options
                )
            );
        }

        return this.syncCustomNodesWithNodesFactory(customNodes);
    }
}
