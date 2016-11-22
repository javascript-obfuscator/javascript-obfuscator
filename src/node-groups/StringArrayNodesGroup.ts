import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';

import { AppendState } from '../enums/AppendState';

import { StringArrayCallsWrapper } from '../custom-nodes/string-array-nodes/StringArrayCallsWrapper';
import { StringArrayNode } from '../custom-nodes/string-array-nodes/StringArrayNode';
import { StringArrayRotateFunctionNode } from '../custom-nodes/string-array-nodes/StringArrayRotateFunctionNode';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { StringArrayStorage } from '../storages/string-array/StringArrayStorage';
import { Utils } from '../Utils';
import { IStorage } from '../interfaces/IStorage';

export class StringArrayNodesGroup extends AbstractNodesGroup {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

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
     * @returns {Map<string, ICustomNode> | undefined}
     */
    public getNodes (): Map <string, ICustomNode> | undefined {
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

        return this.syncCustomNodesWithNodesGroup(customNodes);
    }
}
