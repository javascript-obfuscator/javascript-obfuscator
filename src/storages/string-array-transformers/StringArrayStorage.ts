import { inject, injectable, injectFromBase, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStringArrayEncoding } from '../../types/options/TStringArrayEncoding';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { ICryptUtilsStringArray } from '../../interfaces/utils/ICryptUtilsStringArray';
import { IEncodedValue } from '../../interfaces/IEncodedValue';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-transformers/IStringArrayStorage';
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-transformers/IStringArrayStorageItem';

import { StringArrayEncoding } from '../../enums/node-transformers/string-array-transformers/StringArrayEncoding';

import { MapStorage } from '../MapStorage';

@injectFromBase()
@injectable()
export class StringArrayStorage
    extends MapStorage<`${string}-${TStringArrayEncoding}`, IStringArrayStorageItemData>
    implements IStringArrayStorage
{
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
    private static readonly minimumIndexShiftAmount: number = 100;

    /**
     * @type {number}
     */
    private static readonly maximumIndexShiftAmount: number = 500;

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
    private static readonly stringArrayFunctionNameLength: number = 4;

    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @type {ICryptUtilsStringArray}
     */
    private readonly cryptUtilsStringArray: ICryptUtilsStringArray;

    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {string[]}
     */
    private readonly rc4Keys: string[];

    /**
     * @type {Map<string, Set<string>>}
     */
    private readonly rc4EncodedValuesSourcesCache: Map<string, Set<string>> = new Map();

    /**
     * @type {number}
     */
    private indexShiftAmount: number = 0;

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
     * @param {ICryptUtilsStringArray} cryptUtilsStringArray
     */
    public constructor(
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
        identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.ICryptUtilsStringArray) cryptUtilsStringArray: ICryptUtilsStringArray
    ) {
        super(randomGenerator, options);

        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.arrayUtils = arrayUtils;
        this.cryptUtilsStringArray = cryptUtilsStringArray;

        this.rc4Keys = this.randomGenerator.getRandomGenerator().n(
            () =>
                this.randomGenerator.getRandomGenerator().string({
                    length: StringArrayStorage.rc4KeyLength
                }),
            StringArrayStorage.rc4KeysCount
        );
    }

    @postConstruct()
    public override initialize(): void {
        super.initialize();

        this.indexShiftAmount = this.options.stringArrayIndexShift
            ? this.randomGenerator.getRandomInteger(
                  StringArrayStorage.minimumIndexShiftAmount,
                  StringArrayStorage.maximumIndexShiftAmount
              )
            : 0;
        this.rotationAmount = this.options.stringArrayRotate
            ? this.randomGenerator.getRandomInteger(
                  StringArrayStorage.minimumRotationAmount,
                  StringArrayStorage.maximumRotationAmount
              )
            : 0;
    }

    /**
     * @param {string} value
     */
    public override get(value: string): IStringArrayStorageItemData {
        return this.getOrSetIfDoesNotExist(value);
    }

    /**
     * @returns {number}
     */
    public getIndexShiftAmount(): number {
        return this.indexShiftAmount;
    }

    /**
     * @returns {number}
     */
    public getRotationAmount(): number {
        return this.rotationAmount;
    }

    /**
     * @returns {string}
     */
    public getStorageName(): string {
        return this.getStorageId();
    }

    /**
     * @returns {string}
     */
    public override getStorageId(): string {
        if (!this.stringArrayStorageName) {
            this.stringArrayStorageName = this.identifierNamesGenerator.generateForGlobalScope(
                StringArrayStorage.stringArrayFunctionNameLength
            );
        }

        return this.stringArrayStorageName;
    }

    /**
     * @param {TStringArrayEncoding | null} stringArrayEncoding
     * @returns {IStringArrayCallsWrapperNames}
     */
    public getStorageCallsWrapperName(stringArrayEncoding: TStringArrayEncoding | null): string {
        const storageCallsWrapperName: string | null =
            this.stringArrayStorageCallsWrapperNamesMap.get(stringArrayEncoding) ?? null;

        if (storageCallsWrapperName) {
            return storageCallsWrapperName;
        }

        const newStorageCallsWrapperName: string = this.identifierNamesGenerator.generateForGlobalScope(
            StringArrayStorage.stringArrayFunctionNameLength
        );

        this.stringArrayStorageCallsWrapperNamesMap.set(stringArrayEncoding, newStorageCallsWrapperName);

        return newStorageCallsWrapperName;
    }

    public rotateStorage(): void {
        if (!this.getLength()) {
            return;
        }

        this.storage = new Map(this.arrayUtils.rotate(Array.from(this.storage.entries()), this.rotationAmount));
    }

    public shuffleStorage(): void {
        this.storage = new Map(
            this.arrayUtils
                .shuffle(Array.from(this.storage.entries()))
                .map<
                    [`${string}-${TStringArrayEncoding}`, IStringArrayStorageItemData]
                >(([value, stringArrayStorageItemData], index: number) => {
                    stringArrayStorageItemData.index = index;

                    return [value, stringArrayStorageItemData];
                })
        );
    }

    /**
     * @param {string} value
     * @returns {IStringArrayStorageItemData}
     */
    private getOrSetIfDoesNotExist(value: string): IStringArrayStorageItemData {
        const { encodedValue, encoding, decodeKey }: IEncodedValue = this.getEncodedValue(value);

        const cacheKey: `${string}-${TStringArrayEncoding}` = `${encodedValue}-${encoding}`;
        const storedStringArrayStorageItemData: IStringArrayStorageItemData | undefined = this.storage.get(cacheKey);

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

        this.storage.set(cacheKey, stringArrayStorageItemData);

        return stringArrayStorageItemData;
    }

    /**
     * @param {string} value
     * @returns {IEncodedValue}
     */
    private getEncodedValue(value: string): IEncodedValue {
        const encoding: TStringArrayEncoding | null = this.options.stringArrayEncoding.length
            ? this.randomGenerator.getRandomGenerator().pickone(this.options.stringArrayEncoding)
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
                const maxRetryAttempts: number = 50;

                for (let attempt: number = 0; attempt < maxRetryAttempts; attempt++) {
                    const decodeKey: string = this.randomGenerator.getRandomGenerator().pickone(this.rc4Keys);
                    const encodedValue: string = this.cryptUtilsStringArray.btoa(
                        this.cryptUtilsStringArray.rc4(value, decodeKey)
                    );

                    const encodedValueSources: Set<string> =
                        this.rc4EncodedValuesSourcesCache.get(encodedValue) ?? new Set();

                    const shouldAddValueToSourcesCache: boolean =
                        encodedValueSources.size === 0 || !encodedValueSources.has(value);

                    if (shouldAddValueToSourcesCache) {
                        encodedValueSources.add(value);
                    }

                    this.rc4EncodedValuesSourcesCache.set(encodedValue, encodedValueSources);

                    if (encodedValueSources.size <= 1) {
                        return { encodedValue, encoding, decodeKey };
                    }
                }

                return {
                    encodedValue: this.cryptUtilsStringArray.btoa(value),
                    encoding: StringArrayEncoding.Base64,
                    decodeKey: null
                };
            }

            case StringArrayEncoding.Base64: {
                const decodeKey: null = null;
                const encodedValue: string = this.cryptUtilsStringArray.btoa(value);

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
