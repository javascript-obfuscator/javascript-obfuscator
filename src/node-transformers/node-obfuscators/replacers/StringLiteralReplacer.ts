import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';
import { IEncodedValue } from '../../../interfaces/node-transformers/IEncodedValue';
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
     * @type {Map<string, string>}
     */
    private readonly stringLiteralCache: Map <string, string> = new Map();

    /**
     * @type {Map<string, string>}
     */
    private readonly stringLiteralHexadecimalIndexCache: Map <string, string> = new Map();

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
        @inject(ServiceIdentifiers.TCustomNodeGroupStorage) customNodeGroupStorage: IStorage<ICustomNodeGroup>,
        @inject(ServiceIdentifiers.TStringArrayStorage) stringArrayStorage: IStorage<string>,
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
        const usingStringArray: boolean = (
            this.options.stringArray &&
            nodeValue.length >= StringLiteralReplacer.minimumLengthForStringArray &&
            RandomGeneratorUtils.getRandomFloat(0, 1) <= this.options.stringArrayThreshold
        );
        const cacheKey: string = `${nodeValue}-${String(usingStringArray)}`;

        if (this.stringLiteralCache.has(cacheKey) && this.options.stringArrayEncoding !== StringArrayEncoding.rc4) {
            return <string>this.stringLiteralCache.get(cacheKey);
        }

        let result: string;

        if (usingStringArray) {
            result = this.replaceStringLiteralWithStringArrayCall(nodeValue);
        } else {
            result = `'${Utils.stringToUnicodeEscapeSequence(nodeValue, !this.options.unicodeEscapeSequence)}'`;
        }

        this.stringLiteralCache.set(cacheKey, result);

        return result;
    }

    /**
     * @param value
     * @return {string}
     */
    private getArrayHexadecimalIndex (value: string): string {
        if (this.stringLiteralHexadecimalIndexCache.has(value)) {
            return <string>this.stringLiteralHexadecimalIndexCache.get(value);
        }

        const indexOfExistingValue: number = <number>this.stringArrayStorage.getKeyOf(value);

        let indexOfValue: number;

        if (indexOfExistingValue >= 0) {
            indexOfValue = indexOfExistingValue;
        } else {
            indexOfValue = this.stringArrayStorage.getLength();
            this.stringArrayStorage.set(null, value);
        }

        const hexadecimalIndex: string = `${Utils.hexadecimalPrefix}${Utils.decToHex(indexOfValue)}`;

        this.stringLiteralHexadecimalIndexCache.set(value, hexadecimalIndex);

        return hexadecimalIndex;
    }

    /**
     * @param value
     * @returns {IEncodedValue}
     */
    private getEncodedValue (value: string): IEncodedValue {
        let encodedValue: string,
            key: string | undefined;

        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding.rc4:
                key = RandomGeneratorUtils.getRandomGenerator().pickone(StringLiteralReplacer.rc4Keys);
                encodedValue = CryptUtils.btoa(CryptUtils.rc4(value, key));

                break;

            case StringArrayEncoding.base64:
                encodedValue = CryptUtils.btoa(value);

                break;

            default:
                encodedValue = value;
        }

        encodedValue = Utils.stringToUnicodeEscapeSequence(encodedValue, !this.options.unicodeEscapeSequence);

        return { encodedValue, key };
    }

    /**
     * @param value
     * @returns {string}
     */
    private replaceStringLiteralWithStringArrayCall (value: string): string {
        const { encodedValue, key }: IEncodedValue = this.getEncodedValue(value);
        const hexadecimalIndex: string = this.getArrayHexadecimalIndex(encodedValue);
        const rotatedStringArrayStorageId: string = Utils.stringRotate(this.stringArrayStorage.getStorageId(), 1);
        const stringArrayStorageCallsWrapperName: string = `_${Utils.hexadecimalPrefix}${rotatedStringArrayStorageId}`;

        if (key) {
            return `${stringArrayStorageCallsWrapperName}('${hexadecimalIndex}', '${Utils.stringToUnicodeEscapeSequence(key, !this.options.unicodeEscapeSequence)}')`;
        }

        return `${stringArrayStorageCallsWrapperName}('${hexadecimalIndex}')`;
    }
}
