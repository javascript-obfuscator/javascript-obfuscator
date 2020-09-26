import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { ICryptUtilsSwappedAlphabet } from '../../interfaces/utils/ICryptUtilsSwappedAlphabet';
import { IEncodedValue } from '../../interfaces/IEncodedValue';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';

import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';

import { MapStorage } from '../MapStorage';

@injectable()
export class StringArrayStorage extends MapStorage <string, IStringArrayStorageItemData> implements IStringArrayStorage {
    /**
     * @type {number}
     */
    private static readonly minimumRotationAmount: number = 100;

    /**
     * @type {number}
     */
    private static readonly maximumRotationAmount: number = 500;

    /**
     * @type {number}
     */
    private static readonly rc4KeyLength: number = 4;

    /**
     * @type {number}
     */
    private static readonly rc4KeysCount: number = 50;

    /**
     * @type {number}
     */
    private static readonly stringArrayNameLength: number = 4;

    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @type {ICryptUtilsSwappedAlphabet}
     */
    private readonly cryptUtilsSwappedAlphabet: ICryptUtilsSwappedAlphabet;

    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {string[]}
     */
    private readonly rc4Keys: string[];

    /**
     * @type {Map<string, string[]>}
     */
    private readonly rc4EncodedValuesSourcesCache: Map<string, string[]> = new Map();

    /**
     * @type {number}
     */
    private rotationAmount: number = 0;

    /**
     * @type {string}
     */
    private stringArrayStorageName!: string;

    /**
     * @type {Map<TStringArrayEncoding | null, string>}
     */
    private readonly stringArrayStorageCallsWrapperNamesMap: Map<TStringArrayEncoding | null, string> = new Map();

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IArrayUtils} arrayUtils
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {ICryptUtilsSwappedAlphabet} cryptUtilsSwappedAlphabet
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.ICryptUtilsSwappedAlphabet) cryptUtilsSwappedAlphabet: ICryptUtilsSwappedAlphabet
    ) {
        super(randomGenerator, options);

        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.arrayUtils = arrayUtils;
        this.cryptUtilsSwappedAlphabet = cryptUtilsSwappedAlphabet;

        this.rc4Keys = this.randomGenerator.getRandomGenerator()
            .n(
                () => this.randomGenerator.getRandomGenerator().string({
                    length: StringArrayStorage.rc4KeyLength
                }),
                StringArrayStorage.rc4KeysCount
            );
    }

    @postConstruct()
    public initialize (): void {
        super.initialize();

        this.rotationAmount = this.options.rotateStringArray
            ? this.randomGenerator.getRandomInteger(
                StringArrayStorage.minimumRotationAmount,
                StringArrayStorage.maximumRotationAmount
            )
            : 0;
    }

    /**
     * @param {string} value
     */
    public get (value: string): IStringArrayStorageItemData {
        return this.getOrSetIfDoesNotExist(value);
    }

    /**
     * @returns {number}
     */
    public getRotationAmount (): number {
        return this.rotationAmount;
    }

    /**
     * @returns {string}
     */
    public getStorageName (): string {
        return this.getStorageId();
    }

    /**
     * @returns {string}
     */
    public getStorageId (): string {
        if (!this.stringArrayStorageName) {
            this.stringArrayStorageName = this.identifierNamesGenerator
                .generateForGlobalScope(StringArrayStorage.stringArrayNameLength);
        }

        return this.stringArrayStorageName;
    }

    /**
     * @param {TStringArrayEncoding | null} stringArrayEncoding
     * @returns {IStringArrayCallsWrapperNames}
     */
    public getStorageCallsWrapperName (stringArrayEncoding: TStringArrayEncoding | null): string {
        const storageCallsWrapperName: string | null = this.stringArrayStorageCallsWrapperNamesMap
            .get(stringArrayEncoding) ?? null;

        if (storageCallsWrapperName) {
            return storageCallsWrapperName;
        }

        const newStorageCallsWrapperName: string = this.identifierNamesGenerator
            .generateForGlobalScope(StringArrayStorage.stringArrayNameLength);

        this.stringArrayStorageCallsWrapperNamesMap.set(
            stringArrayEncoding,
            newStorageCallsWrapperName
        );

        return newStorageCallsWrapperName;
    }

    public rotateStorage (): void {
        if (!this.getLength()) {
            return;
        }

        this.storage = new Map(
            this.arrayUtils.rotate(
                Array.from(this.storage.entries()),
                this.rotationAmount
            )
        );
    }

    public shuffleStorage (): void {
        this.storage = new Map(
            this.arrayUtils
                .shuffle(Array.from(this.storage.entries()))
                .map<[string, IStringArrayStorageItemData]>(
                    (
                        [value, stringArrayStorageItemData]: [string, IStringArrayStorageItemData],
                        index: number
                    ) => {
                        stringArrayStorageItemData.index = index;

                        return [value, stringArrayStorageItemData];
                    }
                )
                .sort((
                    [, stringArrayStorageItemDataA]: [string, IStringArrayStorageItemData],
                    [, stringArrayStorageItemDataB]: [string, IStringArrayStorageItemData]
                ) => stringArrayStorageItemDataA.index - stringArrayStorageItemDataB.index)
        );
    }

    /**
     * @param {string} value
     * @returns {IStringArrayStorageItemData}
     */
    private getOrSetIfDoesNotExist (value: string): IStringArrayStorageItemData {
        const { encodedValue, encoding, decodeKey }: IEncodedValue = this.getEncodedValue(value);
        const storedStringArrayStorageItemData: IStringArrayStorageItemData | undefined = this.storage.get(encodedValue);

        if (storedStringArrayStorageItemData) {
            return storedStringArrayStorageItemData;
        }

        const stringArrayStorageItemData: IStringArrayStorageItemData = {
            encodedValue,
            encoding,
            decodeKey,
            value,
            index: this.getLength()
        };

        this.storage.set(encodedValue, stringArrayStorageItemData);

        return stringArrayStorageItemData;
    }

    /**
     * @param {string} value
     * @returns {IEncodedValue}
     */
    private getEncodedValue (value: string): IEncodedValue {
        const encoding: TStringArrayEncoding | null = this.options.stringArrayEncoding.length
            ? this.randomGenerator
                .getRandomGenerator()
                .pickone(this.options.stringArrayEncoding)
            : null;

        if (!encoding) {
            throw new Error('`stringArrayEncoding` option array is empty');
        }

        switch (encoding) {
            /**
             * For rc4 there is a possible chance of a collision between encoded values that were received from
             * different source values with different keys
             *
             * For example:
             * source value | key  | encoded value
             * _15          | CRDL | w74TGA==
             * _12          | q9mB | w74TGA==
             *
             * Issue: https://github.com/javascript-obfuscator/javascript-obfuscator/issues/538
             *
             * As a fix that keeps key size of 4 character, the simple brute-force solution is using:
             * if collision will happen, just try to encode value again
             */
            case StringArrayEncoding.Rc4: {
                const decodeKey: string = this.randomGenerator.getRandomGenerator().pickone(this.rc4Keys);
                const encodedValue: string = this.cryptUtilsSwappedAlphabet.btoa(this.cryptUtilsSwappedAlphabet.rc4(value, decodeKey));

                const encodedValueSources: string[] = this.rc4EncodedValuesSourcesCache.get(encodedValue) ?? [];
                let encodedValueSourcesLength: number = encodedValueSources.length;

                const shouldAddValueToSourcesCache: boolean = !encodedValueSourcesLength || !encodedValueSources.includes(value);

                if (shouldAddValueToSourcesCache) {
                    encodedValueSources.push(value);
                    encodedValueSourcesLength++;
                }

                this.rc4EncodedValuesSourcesCache.set(encodedValue, encodedValueSources);

                if (encodedValueSourcesLength > 1) {
                    return this.getEncodedValue(value);
                }

                return { encodedValue, encoding, decodeKey };
            }

            case StringArrayEncoding.Base64: {
                const decodeKey: null = null;
                const encodedValue: string = this.cryptUtilsSwappedAlphabet.btoa(value);

                return { encodedValue, encoding, decodeKey };
            }

            default: {
                const decodeKey: null = null;
                const encodedValue: string = value;

                return { encodedValue, encoding, decodeKey };
            }
        }
    }
}
