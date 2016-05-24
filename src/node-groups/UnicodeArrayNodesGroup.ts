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

        let unicodeArrayNode: UnicodeArrayNode = new UnicodeArrayNode(
                this.unicodeArrayName,
                this.unicodeArrayRotateValue
            ),
            unicodeArray: string [] = unicodeArrayNode.getNodeData();

        this.nodes = new Map <string, ICustomNode> ([
            [
                'unicodeArrayNode',
                unicodeArrayNode
            ],
            [
                'unicodeArrayRotateFunctionNode',
                new UnicodeArrayRotateFunctionNode(
                    this.unicodeArrayName,
                    unicodeArray,
                    this.unicodeArrayRotateValue
                )
            ]
        ]);
    }
}
