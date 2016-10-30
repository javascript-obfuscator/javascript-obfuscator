import { TUnicodeArrayCallsWrapper } from '../../types/custom-nodes/TUnicodeArrayCallsWrapper';
import { TUnicodeArrayNode } from '../../types/custom-nodes/TUnicodeArrayNode';

import { UnicodeArrayEncoding } from '../../enums/UnicodeArrayEncoding';

import { AbstractReplacer } from './AbstractReplacer';
import { NumberLiteralReplacer } from './NumberLiteralReplacer';
import { UnicodeArray } from '../../UnicodeArray';
import { Utils } from '../../Utils';

export class StringLiteralReplacer extends AbstractReplacer {
    /**
     * @param nodeValue
     * @returns {string}
     */
    public replace (nodeValue: string): string {
        const replaceWithUnicodeArrayFlag: boolean = Math.random() <= this.options.unicodeArrayThreshold;

        if (replaceWithUnicodeArrayFlag) {
            switch (this.options.unicodeArrayEncoding) {
                case UnicodeArrayEncoding.base64:
                    nodeValue = Utils.btoa(nodeValue);

                    break;

                case UnicodeArrayEncoding.rc4:
                    nodeValue = Utils.btoa(nodeValue);

                    break;
            }
        }

        nodeValue = Utils.stringToUnicode(nodeValue);

        if (this.options.unicodeArray && replaceWithUnicodeArrayFlag) {
            return this.replaceStringLiteralWithUnicodeArrayCall(nodeValue);
        }

        return nodeValue;
    }

    /**
     * @param value
     * @returns {string}
     */
    private replaceStringLiteralWithUnicodeArrayCall (value: string): string {
        const unicodeArrayNode: TUnicodeArrayNode = <TUnicodeArrayNode>this.nodes.get('unicodeArrayNode');

        if (!unicodeArrayNode) {
            throw new ReferenceError('`unicodeArrayNode` node is not found in Map with custom nodes.');
        }

        let unicodeArray: UnicodeArray = unicodeArrayNode.getNodeData(),
            indexOfExistingValue: number = unicodeArray.getIndexOf(value),
            indexOfValue: number,
            hexadecimalIndex: string;

        if (indexOfExistingValue >= 0) {
            indexOfValue = indexOfExistingValue;
        } else {
            indexOfValue = unicodeArray.getLength();
            unicodeArrayNode.updateNodeData(value);
        }

        hexadecimalIndex = new NumberLiteralReplacer(this.nodes, this.options)
            .replace(indexOfValue);

        const unicodeArrayCallsWrapper: TUnicodeArrayCallsWrapper = <TUnicodeArrayCallsWrapper>this.nodes.get('unicodeArrayCallsWrapper');

        if (!unicodeArrayCallsWrapper) {
            throw new ReferenceError('`unicodeArrayCallsWrapper` node is not found in Map with custom nodes.');
        }

        return `${unicodeArrayCallsWrapper.getNodeIdentifier()}('${hexadecimalIndex}')`;
    }
}
