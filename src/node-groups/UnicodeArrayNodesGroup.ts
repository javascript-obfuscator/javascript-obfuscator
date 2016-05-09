import { INode } from '../interfaces/INode';

import { NodesGroup } from './NodesGroup';
import { UnicodeArrayNode } from '../nodes/UnicodeArrayNode';
import { UnicodeArrayRotateFunctionCallNode } from '../nodes/UnicodeArrayRotateFunctionCallNode';
import { UnicodeArrayRotateFunctionNode } from '../nodes/UnicodeArrayRotateFunctionNode';
import { Utils } from '../Utils';

export class UnicodeArrayNodesGroup extends NodesGroup {
    /**
     * @type {string}
     */
    private unicodeArrayRotateFunctionIdentifier: string = Utils.getRandomVariableName();

    /**
     * @param astTree
     */
    constructor (astTree: any) {
        super();

        let unicodeArrayName: string = Utils.getRandomVariableName(UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH),
            unicodeArrayRotateValue: number = Utils.getRandomInteger(100, 500);

        this.nodes = new Map <string, INode> ([
            [
                'unicodeArrayNode',
                new UnicodeArrayNode(
                    astTree,
                    unicodeArrayName,
                    unicodeArrayRotateValue
                )
            ],
            [
                'unicodeArrayRotateFunctionNode',
                new UnicodeArrayRotateFunctionNode(
                    astTree,
                    this.unicodeArrayRotateFunctionIdentifier,
                    unicodeArrayName
                )
            ],
            [
                'unicodeArrayRotateFunctionCallNode',
                new UnicodeArrayRotateFunctionCallNode(
                    astTree,
                    this.unicodeArrayRotateFunctionIdentifier,
                    unicodeArrayName,
                    unicodeArrayRotateValue
                )
            ]
        ])
    }
}