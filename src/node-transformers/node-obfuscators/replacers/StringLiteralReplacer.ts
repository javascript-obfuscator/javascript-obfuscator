import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { StringArrayEncoding } from '../../../enums/StringArrayEncoding';

import { AbstractReplacer } from './AbstractReplacer';
import { CryptUtils } from '../../../utils/CryptUtils';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';
import { Utils } from '../../../utils/Utils';

@injectable()
export class StringLiteralReplacer extends AbstractReplacer {
    /**
     * @type {number}
     */
    private static readonly minimumLengthForStringArray: number = 3;

    /**
     * @type {string[]}
     */
    private static readonly rc4Keys: string[] = RandomGeneratorUtils.getRandomGenerator()
        .n(() => RandomGeneratorUtils.getRandomGenerator().string({length: 4}), 50);

    /**
     * @type {IStorage<ICustomNodeGroup>}
     */
    private readonly customNodeGroupStorage: IStorage<ICustomNodeGroup>;

    /**
     * @type {IStorage<string>}
     */
    private readonly stringArrayStorage: IStorage<string>;

    /**
     * @param customNodeGroupStorage
     * @param stringArrayStorage
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['IStorage<ICustomNodeGroup>']) customNodeGroupStorage: IStorage<ICustomNodeGroup>,
        @inject(ServiceIdentifiers['IStorage<string>']) stringArrayStorage: IStorage<string>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeGroupStorage = customNodeGroupStorage;
        this.stringArrayStorage = stringArrayStorage;
    }

    /**
     * @param nodeValue
     * @returns {string}
     */
    public replace (nodeValue: string): string {
        const replaceWithStringArrayFlag: boolean = (
            nodeValue.length >= StringLiteralReplacer.minimumLengthForStringArray
            && RandomGeneratorUtils.getRandomFloat(0, 1) <= this.options.stringArrayThreshold
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
        let rc4Key: string = '';

        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding.base64:
                value = CryptUtils.btoa(value);

                break;

            case StringArrayEncoding.rc4:
                rc4Key = RandomGeneratorUtils.getRandomGenerator().pickone(StringLiteralReplacer.rc4Keys);
                value = CryptUtils.btoa(CryptUtils.rc4(value, rc4Key));

                break;
        }

        if (this.options.unicodeEscapeSequence) {
            value = Utils.stringToUnicodeEscapeSequence(value);
        }

        const indexOfExistingValue: number = <number>this.stringArrayStorage.getKeyOf(value);

        let indexOfValue: number;

        if (indexOfExistingValue >= 0) {
            indexOfValue = indexOfExistingValue;
        } else {
            indexOfValue = this.stringArrayStorage.getLength();
            this.stringArrayStorage.set(null, value);
        }

        const reversedStringArrayId: string = Array.from(this.stringArrayStorage.getStorageId()).reverse().join('');
        const stringArrayStorageCallsWrapperName: string = `_${Utils.hexadecimalPrefix}${reversedStringArrayId}a`;
        const hexadecimalIndex: string = `${Utils.hexadecimalPrefix}${Utils.decToHex(indexOfValue)}`;

        if (this.options.stringArrayEncoding === StringArrayEncoding.rc4) {
            return `${stringArrayStorageCallsWrapperName}('${hexadecimalIndex}', '${Utils.stringToUnicodeEscapeSequence(rc4Key)}')`;
        }

        return `${stringArrayStorageCallsWrapperName}('${hexadecimalIndex}')`;
    }
}
