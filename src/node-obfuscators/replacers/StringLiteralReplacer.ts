import { TStringsArrayCallsWrapper } from '../../types/custom-nodes/TStringsArrayCallsWrapper';
import { TStringsArrayNode } from '../../types/custom-nodes/TStringsArrayNode';

import { StringsArrayEncoding } from '../../enums/StringsArrayEncoding';

import { AbstractReplacer } from './AbstractReplacer';
import { NumberLiteralReplacer } from './NumberLiteralReplacer';
import { StringsArray } from '../../StringsArray';
import { Utils } from '../../Utils';

export class StringLiteralReplacer extends AbstractReplacer {
    /**
     * @type {number}
     */
    private static minimumLengthForStringsArray: number = 3;

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
        const replaceWithStringsArrayFlag: boolean = (
            nodeValue.length >= StringLiteralReplacer.minimumLengthForStringsArray
            && Math.random() <= this.options.stringsArrayThreshold
        );

        if (this.options.stringsArray && replaceWithStringsArrayFlag) {
            return this.replaceStringLiteralWithStringsArrayCall(nodeValue);
        }

        return `'${Utils.stringToUnicodeEscapeSequence(nodeValue)}'`;
    }

    /**
     * @param value
     * @returns {string}
     */
    private replaceStringLiteralWithStringsArrayCall (value: string): string {
        const stringsArrayNode: TStringsArrayNode = <TStringsArrayNode>this.nodes.get('stringsArrayNode');

        if (!stringsArrayNode) {
            throw new ReferenceError('`stringsArrayNode` node is not found in Map with custom node.');
        }

        let rc4Key: string = '';

        switch (this.options.stringsArrayEncoding) {
            case StringsArrayEncoding.base64:
                value = Utils.btoa(value);

                break;

            case StringsArrayEncoding.rc4:
                rc4Key = Utils.getRandomGenerator().pickone(StringLiteralReplacer.rc4Keys);
                value = Utils.btoa(Utils.rc4(value, rc4Key));

                break;
        }

        if (this.options.unicodeEscapeSequence) {
            value = Utils.stringToUnicodeEscapeSequence(value);
        }

        let stringsArray: StringsArray = stringsArrayNode.getNodeData(),
            indexOfExistingValue: number = stringsArray.getIndexOf(value),
            indexOfValue: number,
            hexadecimalIndex: string;

        if (indexOfExistingValue >= 0) {
            indexOfValue = indexOfExistingValue;
        } else {
            indexOfValue = stringsArray.getLength();
            stringsArrayNode.updateNodeData(value);
        }

        hexadecimalIndex = new NumberLiteralReplacer(this.nodes, this.options)
            .replace(indexOfValue);

        const stringsArrayCallsWrapper: TStringsArrayCallsWrapper = <TStringsArrayCallsWrapper>this.nodes.get('stringsArrayCallsWrapper');

        if (!stringsArrayCallsWrapper) {
            throw new ReferenceError('`stringsArrayCallsWrapper` node is not found in Map with custom node.');
        }

        if (this.options.stringsArrayEncoding === StringsArrayEncoding.rc4) {
            return `${stringsArrayCallsWrapper.getNodeIdentifier()}('${hexadecimalIndex}', '${Utils.stringToUnicodeEscapeSequence(rc4Key)}')`;
        }

        return `${stringsArrayCallsWrapper.getNodeIdentifier()}('${hexadecimalIndex}')`;
    }
}
