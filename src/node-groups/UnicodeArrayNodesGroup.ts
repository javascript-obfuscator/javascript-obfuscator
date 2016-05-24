import { ICustomNode } from '../interfaces/ICustomNode';

import { NodesGroup } from './NodesGroup';
import { UnicodeArrayNode } from '../custom-nodes/unicode-array-nodes/UnicodeArrayNode';
import { UnicodeArrayRotateFunctionNode } from '../custom-nodes/unicode-array-nodes/UnicodeArrayRotateFunctionNode';
import { Utils } from '../Utils';

export class UnicodeArrayNodesGroup extends NodesGroup {
    /**
     * @type {string}
     */
    private unicodeArrayName: string = Utils.getRandomVariableName(UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);

    /**
     * @type {number}
     */
    private unicodeArrayRotateValue: number = Utils.getRandomInteger(100, 500);

    constructor () {
        super();

        this.nodes = new Map <string, ICustomNode> ([
            [
                'unicodeArrayNode',
                new UnicodeArrayNode(
                    this.unicodeArrayName,
                    this.unicodeArrayRotateValue
                )
            ],
            [
                'unicodeArrayRotateFunctionNode',
                new UnicodeArrayRotateFunctionNode(
                    this.unicodeArrayName,
                    this.unicodeArrayRotateValue
                )
            ]
        ]);
    }
}
