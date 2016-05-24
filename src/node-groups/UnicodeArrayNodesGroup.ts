import { INode } from '../interfaces/nodes/INode';

import { ICustomNode } from '../interfaces/ICustomNode';

import { NodesGroup } from './NodesGroup';
import { UnicodeArrayNode } from '../custom-nodes/unicode-array-nodes/UnicodeArrayNode';
import { UnicodeArrayRotateFunctionCallNode } from '../custom-nodes/unicode-array-nodes/UnicodeArrayRotateFunctionCallNode';
import { UnicodeArrayRotateFunctionNode } from '../custom-nodes/unicode-array-nodes/UnicodeArrayRotateFunctionNode';
import { Utils } from '../Utils';

export class UnicodeArrayNodesGroup extends NodesGroup {
    /**
     * @type {string}
     */
    private unicodeArrayRotateFunctionIdentifier: string = Utils.getRandomVariableName();

    constructor () {
        super();

        let unicodeArrayName: string = Utils.getRandomVariableName(UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH),
            unicodeArrayRotateValue: number = Utils.getRandomInteger(100, 500);

        this.nodes = new Map <string, ICustomNode> ([
            [
                'unicodeArrayNode',
                new UnicodeArrayNode(
                    unicodeArrayName,
                    unicodeArrayRotateValue
                )
            ],
            [
                'unicodeArrayRotateFunctionNode',
                new UnicodeArrayRotateFunctionNode(
                    this.unicodeArrayRotateFunctionIdentifier,
                    unicodeArrayName
                )
            ],
            [
                'unicodeArrayRotateFunctionCallNode',
                new UnicodeArrayRotateFunctionCallNode(
                    this.unicodeArrayRotateFunctionIdentifier,
                    unicodeArrayName,
                    unicodeArrayRotateValue
                )
            ]
        ]);
    }
}
