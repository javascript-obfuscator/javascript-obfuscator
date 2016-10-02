import { IOptions } from '../interfaces/IOptions';

import { AbstractNodesGroup } from './AbstractNodesGroup';
import { UnicodeArray } from '../UnicodeArray';
import { UnicodeArrayCallsWrapper } from '../custom-nodes/unicode-array-nodes/UnicodeArrayCallsWrapper';
import { UnicodeArrayDecodeNode } from '../custom-nodes/unicode-array-nodes/UnicodeArrayDecodeNode';
import { UnicodeArrayNode } from '../custom-nodes/unicode-array-nodes/UnicodeArrayNode';
import { UnicodeArrayRotateFunctionNode } from '../custom-nodes/unicode-array-nodes/UnicodeArrayRotateFunctionNode';
import { Utils } from '../Utils';

export class UnicodeArrayNodesGroup extends AbstractNodesGroup {
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
    constructor (options: IOptions) {
        super(options);

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

        let unicodeArray: UnicodeArray = new UnicodeArray(),
            unicodeArrayNode: UnicodeArrayNode = new UnicodeArrayNode(
                unicodeArray,
                this.unicodeArrayName,
                this.unicodeArrayRotateValue,
                this.options
            );

        this.nodes.set(
            'unicodeArrayNode',
            unicodeArrayNode
        );

        if (this.options.wrapUnicodeArrayCalls) {
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

        if (this.options.encodeUnicodeLiterals) {
            this.nodes.set(
                'unicodeArrayDecodeNode',
                new UnicodeArrayDecodeNode (
                    this.unicodeArrayName,
                    unicodeArray,
                    this.options
                )
            );
        }

        if (this.options.rotateUnicodeArray) {
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
