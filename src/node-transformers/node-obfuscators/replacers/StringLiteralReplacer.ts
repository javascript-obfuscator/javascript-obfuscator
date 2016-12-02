import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeWithData } from '../../../interfaces/custom-nodes/ICustomNodeWithData';
import { ICustomNodeWithIdentifier } from '../../../interfaces/custom-nodes/ICustomNodeWithIdentifier';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { StringArrayEncoding } from '../../../enums/StringArrayEncoding';

import { AbstractReplacer } from './AbstractReplacer';
import { Utils } from '../../../Utils';

@injectable()
export class StringLiteralReplacer extends AbstractReplacer {
    /**
     * @type {number}
     */
    private static readonly minimumLengthForStringArray: number = 3;

    /**
     * @type {string[]}
     */
    private static readonly rc4Keys: string[] = Utils.getRandomGenerator()
        .n(() => Utils.getRandomGenerator().string({length: 4}), 50);

    /**
     * @param customNodesStorage
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);
    }

    /**
     * @param nodeValue
     * @returns {string}
     */
    public replace (nodeValue: string): string {
        const replaceWithStringArrayFlag: boolean = (
            nodeValue.length >= StringLiteralReplacer.minimumLengthForStringArray
            && Utils.getRandomFloat(0, 1) <= this.options.stringArrayThreshold
        );

        if (this.options.stringArray && replaceWithStringArrayFlag) {
            return this.replaceStringLiteralWithStringArrayCall(nodeValue);
        }

        return `'${Utils.stringToUnicodeEscapeSequence(nodeValue)}'`;
    }

    /**
     * @param value
     * @returns {string}
     */
    private replaceStringLiteralWithStringArrayCall (value: string): string {
        const stringArrayNode: ICustomNodeWithData = <ICustomNodeWithData>this.customNodesStorage.get('stringArrayNode');

        let rc4Key: string = '';

        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding.base64:
                value = Utils.btoa(value);

                break;

            case StringArrayEncoding.rc4:
                rc4Key = Utils.getRandomGenerator().pickone(StringLiteralReplacer.rc4Keys);
                value = Utils.btoa(Utils.rc4(value, rc4Key));

                break;
        }

        if (this.options.unicodeEscapeSequence) {
            value = Utils.stringToUnicodeEscapeSequence(value);
        }

        const stringArray: IStorage <string> = stringArrayNode.getNodeData();
        const indexOfExistingValue: number = <number>stringArray.getKeyOf(value);

        let indexOfValue: number;

        if (indexOfExistingValue >= 0) {
            indexOfValue = indexOfExistingValue;
        } else {
            indexOfValue = stringArray.getLength();
            stringArray.set(null, value);
        }

        const stringArrayCallsWrapper: ICustomNodeWithIdentifier = <ICustomNodeWithIdentifier>this.customNodesStorage.get('stringArrayCallsWrapper');
        const hexadecimalIndex: string = `${Utils.hexadecimalPrefix}${Utils.decToHex(indexOfValue)}`;

        if (this.options.stringArrayEncoding === StringArrayEncoding.rc4) {
            return `${stringArrayCallsWrapper.getNodeIdentifier()}('${hexadecimalIndex}', '${Utils.stringToUnicodeEscapeSequence(rc4Key)}')`;
        }

        return `${stringArrayCallsWrapper.getNodeIdentifier()}('${hexadecimalIndex}')`;
    }
}
