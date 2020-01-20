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

import { initializable } from '../../decorators/Initializable';

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
     * @type {number}
     */
    private rotationAmount: number = 0;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayStorageName!: string;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayStorageCallsWrapperName!: string;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IArrayUtils} arrayUtils
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {ICryptUtils} cryptUtils
     * @param {IEscapeSequenceEncoder} escapeSequenceEncoder
     */
    constructor (
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

        const baseStringArrayName: string = this.identifierNamesGenerator
            .generate(StringArrayStorage.stringArrayNameLength);
        const baseStringArrayCallsWrapperName: string = this.identifierNamesGenerator
            .generate(StringArrayStorage.stringArrayNameLength);

        this.stringArrayStorageName = `${this.options.identifiersPrefix}${baseStringArrayName}`;
        this.stringArrayStorageCallsWrapperName = `${this.options.identifiersPrefix}${baseStringArrayCallsWrapperName}`;

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
    public getStorageId (): string {
        return this.stringArrayStorageName;
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
    public getStorageCallsWrapperName (): string {
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
            case StringArrayEncoding.Rc4: {
                const decodeKey: string = this.randomGenerator.getRandomGenerator().pickone(this.rc4Keys);
                const encodedValue: string = this.cryptUtils.btoa(this.cryptUtils.rc4(value, decodeKey));

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
