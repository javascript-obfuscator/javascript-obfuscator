import { IOptions } from "../interfaces/IOptions";

import { NodesGroup } from './NodesGroup';
import { UnicodeArrayCallsWrapper } from "../custom-nodes/unicode-array-nodes/UnicodeArrayCallsWrapper";
import { UnicodeArrayDecodeNode } from "../custom-nodes/unicode-array-nodes/UnicodeArrayDecodeNode";
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
    private unicodeArrayRotateValue: number;

    /**
     * @type {string}
     */
    private unicodeArrayTranslatorName: string = Utils.getRandomVariableName(UnicodeArrayNode.UNICODE_ARRAY_RANDOM_LENGTH);

    /**
     * @param options
     */
    constructor (options: IOptions = {}) {
        super(options);

        this.unicodeArrayRotateValue = this.options['rotateUnicodeArray'] ? Utils.getRandomInteger(100, 500) : 0;

        let unicodeArrayNode: UnicodeArrayNode = new UnicodeArrayNode(
                this.unicodeArrayName,
                this.unicodeArrayRotateValue,
                this.options
            ),
            unicodeArray: string [] = unicodeArrayNode.getNodeData();

        this.nodes.set(
            'unicodeArrayNode',
            unicodeArrayNode
        );

        if (this.options['wrapUnicodeArrayCalls']) {
            this.nodes.set(
                'unicodeArrayCallsWrapper',
                new UnicodeArrayCallsWrapper(
                    this.unicodeArrayTranslatorName,
                    this.unicodeArrayName,
                    unicodeArray,
                    this.options
                )
            );
        }

        if (this.options['encodeUnicodeLiterals']) {
            this.nodes.set(
                'unicodeArrayDecodeNode',
                new UnicodeArrayDecodeNode (
                    this.unicodeArrayName,
                    unicodeArray,
                    this.options
                )
            );
        }

        if (this.options['rotateUnicodeArray']) {
            this.nodes.set(
                'unicodeArrayRotateFunctionNode',
                new UnicodeArrayRotateFunctionNode(
                    this.unicodeArrayName,
                    unicodeArray,
                    this.unicodeArrayRotateValue,
                    this.options
                )
            );
        }
    }
}
