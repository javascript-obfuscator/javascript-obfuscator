import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';

import { AppendState } from '../enums/AppendState';

import { StringsArrayCallsWrapper } from '../custom-nodes/strings-array-nodes/StringsArrayCallsWrapper';
import { StringsArrayNode } from '../custom-nodes/strings-array-nodes/StringsArrayNode';
import { StringsArrayRotateFunctionNode } from '../custom-nodes/strings-array-nodes/StringsArrayRotateFunctionNode';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { StringsArray } from '../StringsArray';
import { Utils } from '../Utils';

export class StringsArrayNodesGroup extends AbstractNodesGroup {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string}
     */
    private stringsArrayName: string = Utils.getRandomVariableName(StringsArrayNode.ARRAY_RANDOM_LENGTH);

    /**
     * @type {string}
     */
    private stringsArrayCallsWrapper: string = Utils.getRandomVariableName(StringsArrayNode.ARRAY_RANDOM_LENGTH);

    /**
     * @type {number}
     */
    private stringsArrayRotateValue: number;

    /**
     * @returns {Map<string, ICustomNode> | undefined}
     */
    public getNodes (): Map <string, ICustomNode> | undefined {
        if (!this.options.stringsArray) {
            return;
        }

        if (this.options.rotateStringsArray) {
            this.stringsArrayRotateValue = Utils.getRandomGenerator().integer({
                min: 100,
                max: 500
            });
        } else {
            this.stringsArrayRotateValue = 0;
        }

        const stringsArray: StringsArray = new StringsArray();
        const stringsArrayNode: ICustomNode = new StringsArrayNode(
            stringsArray,
            this.stringsArrayName,
            this.stringsArrayRotateValue,
            this.options
        );
        const customNodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ([
            [
                'stringsArrayNode', stringsArrayNode,
            ],
            [
                'stringsArrayCallsWrapper',
                new StringsArrayCallsWrapper(
                    this.stringsArrayCallsWrapper,
                    this.stringsArrayName,
                    stringsArray,
                    this.options
                )
            ]
        ]);

        if (this.options.rotateStringsArray) {
            customNodes.set(
                'stringsArrayRotateFunctionNode',
                new StringsArrayRotateFunctionNode(
                    this.stringsArrayName,
                    stringsArray,
                    this.stringsArrayRotateValue,
                    this.options
                )
            );
        }

        return this.syncCustomNodesWithNodesGroup(customNodes);
    }
}
