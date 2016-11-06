import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';

import { AppendState } from '../enums/AppendState';

import { UnicodeArrayCallsWrapper } from '../custom-nodes/unicode-array-nodes/UnicodeArrayCallsWrapper';
import { UnicodeArrayNode } from '../custom-nodes/unicode-array-nodes/UnicodeArrayNode';
import { UnicodeArrayRotateFunctionNode } from '../custom-nodes/unicode-array-nodes/UnicodeArrayRotateFunctionNode';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { UnicodeArray } from '../UnicodeArray';
import { Utils } from '../Utils';

export class UnicodeArrayNodesGroup extends AbstractNodesGroup {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string}
     */
    private unicodeArrayName: string = Utils.getRandomVariableName(UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);

    /**
     * @type {string}
     */
    private unicodeArrayCallsWrapper: string = Utils.getRandomVariableName(UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);

    /**
     * @type {number}
     */
    private unicodeArrayRotateValue: number;

    /**
     * @returns {Map<string, ICustomNode> | undefined}
     */
    public getNodes (): Map <string, ICustomNode> | undefined {
        if (!this.options.unicodeArray) {
            return;
        }

        if (this.options.rotateUnicodeArray) {
            this.unicodeArrayRotateValue = Utils.getRandomGenerator().integer({
                min: 100,
                max: 500
            });
        } else {
            this.unicodeArrayRotateValue = 0;
        }

        const unicodeArray: UnicodeArray = new UnicodeArray();
        const unicodeArrayNode: ICustomNode = new UnicodeArrayNode(
            unicodeArray,
            this.unicodeArrayName,
            this.unicodeArrayRotateValue,
            this.options
        );
        const customNodes: Map <string, ICustomNode> = new Map <string, ICustomNode> ([
            [
                'unicodeArrayNode', unicodeArrayNode,
            ],
            [
                'unicodeArrayCallsWrapper',
                new UnicodeArrayCallsWrapper(
                    this.unicodeArrayCallsWrapper,
                    this.unicodeArrayName,
                    unicodeArray,
                    this.options
                )
            ]
        ]);

        if (this.options.rotateUnicodeArray) {
            customNodes.set(
                'unicodeArrayRotateFunctionNode',
                new UnicodeArrayRotateFunctionNode(
                    this.unicodeArrayName,
                    unicodeArray,
                    this.unicodeArrayRotateValue,
                    this.options
                )
            );
        }

        return this.syncCustomNodesWithNodesGroup(customNodes);
    }
}
