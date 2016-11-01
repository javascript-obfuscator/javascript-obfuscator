import { TUnicodeArrayCallsWrapper } from '../../types/custom-nodes/TUnicodeArrayCallsWrapper';
import { TUnicodeArrayNode } from '../../types/custom-nodes/TUnicodeArrayNode';

import { UnicodeArrayEncoding } from '../../enums/UnicodeArrayEncoding';

import { AbstractReplacer } from './AbstractReplacer';
import { NumberLiteralReplacer } from './NumberLiteralReplacer';
import { UnicodeArray } from '../../UnicodeArray';
import { Utils } from '../../Utils';

export class StringLiteralReplacer extends AbstractReplacer {
    /**
     * @type {number}
     */
    private static minimumLengthForUnicodeArray: number = 2;

    /**
     * @type {string[]}
     */
    private static rc4Keys: string[] = Utils.getRandomGenerator()
        .n(() => Utils.getRandomGenerator().string({length: 4}), 50);

    /**
     * @param nodeValue
     * @returns {string}
     */
    public replace (nodeValue: string): string {
        const replaceWithUnicodeArrayFlag: boolean = (
            nodeValue.length > StringLiteralReplacer.minimumLengthForUnicodeArray
            && Math.random() <= this.options.unicodeArrayThreshold
        );

        if (this.options.unicodeArray && replaceWithUnicodeArrayFlag) {
            return this.replaceStringLiteralWithUnicodeArrayCall(nodeValue);
        }

        return Utils.stringToUnicode(nodeValue);
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

        let rc4Key: string = '';

        switch (this.options.unicodeArrayEncoding) {
            case UnicodeArrayEncoding.base64:
                value = Utils.btoa(value);

                break;

            case UnicodeArrayEncoding.rc4:
                rc4Key = Utils.getRandomGenerator().pickone(StringLiteralReplacer.rc4Keys);
                value = Utils.btoa(Utils.rc4(value, rc4Key));

                break;
        }

        value = Utils.stringToUnicode(value);

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

        if (this.options.unicodeArrayEncoding === UnicodeArrayEncoding.rc4) {
            return `${unicodeArrayCallsWrapper.getNodeIdentifier()}('${hexadecimalIndex}', ${Utils.stringToUnicode(rc4Key)})`;
        }

        return `${unicodeArrayCallsWrapper.getNodeIdentifier()}('${hexadecimalIndex}')`;
    }
}
