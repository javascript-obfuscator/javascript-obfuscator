import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { ICryptUtils } from '../../interfaces/utils/ICryptUtils';
import { IEncodedValue } from '../../interfaces/IEncodedValue';
import { IEscapeSequenceEncoder } from '../../interfaces/utils/IEscapeSequenceEncoder';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-storage/IStringArrayStorage';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-storage/IStringArrayStorageItem';

import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

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
    private static readonly stringArrayNameLength: number = 7;

    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @type {ICryptUtils}
     */
    private readonly cryptUtils: ICryptUtils;

    /**
     * @type {IEscapeSequenceEncoder}
     */
    private readonly escapeSequenceEncoder: IEscapeSequenceEncoder;

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
     * @type {string}
     */
    private stringArrayStorageCallsWrapperName!: string;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IArrayUtils} arrayUtils
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {ICryptUtils} cryptUtils
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.ICryptUtils) cryptUtils: ICryptUtils,
        @inject(ServiceIdentifiers.IEscapeSequenceEncoder) escapeSequenceEncoder: IEscapeSequenceEncoder
    ) {
        super(randomGenerator, options);

        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.arrayUtils = arrayUtils;
        this.cryptUtils = cryptUtils;
        this.escapeSequenceEncoder = escapeSequenceEncoder;

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
     * @returns {IStringArrayStorageItemData}
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
     * @returns {string}
     */
    public getStorageCallsWrapperName (): string {
        if (!this.stringArrayStorageCallsWrapperName) {
            this.stringArrayStorageCallsWrapperName = this.identifierNamesGenerator
                .generateForGlobalScope(StringArrayStorage.stringArrayNameLength);
        }

        return this.stringArrayStorageCallsWrapperName;
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
     * @returns {string}
     */
    public toString (): string {
        return Array
            .from(this.storage.values())
            .map((stringArrayStorageItemData: IStringArrayStorageItemData) => {
                // we have to encode here, because of possible errors during `parse` of StringArrayCustomNode
                return `'${this.escapeSequenceEncoder.encode(
                    stringArrayStorageItemData.encodedValue,
                    this.options.unicodeEscapeSequence
                )}'`;
            }).toString();
    }

    /**
     * @param {string} value
     * @returns {IStringArrayStorageItemData}
     */
    private getOrSetIfDoesNotExist (value: string): IStringArrayStorageItemData {
        const { encodedValue, decodeKey }: IEncodedValue = this.getEncodedValue(value);
        const storedStringArrayStorageItemData: IStringArrayStorageItemData | undefined = this.storage.get(encodedValue);

        if (storedStringArrayStorageItemData) {
            return storedStringArrayStorageItemData;
        }

        const stringArrayStorageItemData: IStringArrayStorageItemData = {
            encodedValue,
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
        switch (this.options.stringArrayEncoding) {
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
                const encodedValue: string = this.cryptUtils.btoa(this.cryptUtils.rc4(value, decodeKey));

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

                return { encodedValue, decodeKey };
            }

            case StringArrayEncoding.Base64: {
                const decodeKey: null = null;
                const encodedValue: string = this.cryptUtils.btoa(value);

                return { encodedValue, decodeKey };
            }

            default: {
                const decodeKey: null = null;
                const encodedValue: string = value;

                return { encodedValue, decodeKey };
            }
        }
    }
}
