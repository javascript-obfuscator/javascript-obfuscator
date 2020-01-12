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
import { IStringArrayStorageItemData } from '../../interfaces/storages/string-array-storage/IStringArrayStorageItem';

import { StringArrayEncoding } from '../../enums/StringArrayEncoding';

import { MapStorage } from '../MapStorage';

@injectable()
export class StringArrayStorage extends MapStorage <string, IStringArrayStorageItemData> {
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
        const stringArrayName: string = `${this.options.identifiersPrefix}${baseStringArrayName}`;
        const stringArrayCallsWrapperName: string = `${this.options.identifiersPrefix}${baseStringArrayCallsWrapperName}`;

        this.storageId = `${stringArrayName}|${stringArrayCallsWrapperName}`;
    }

    /**
     * @param {string} value
     * @returns {IStringArrayStorageItemData}
     */
    public get (value: string): IStringArrayStorageItemData {
        return this.getOrSetIfDoesNotExist(value);
    }

    /**
     * @param {number} rotationAmount
     */
    public rotateStorage (rotationAmount: number): void {
        this.storage = new Map(
            this.arrayUtils.rotate(
                Array.from(this.storage.entries()),
                rotationAmount
            )
        );
    }

    /**
     * @returns {string}
     */
    public toString (): string {
        return Array
            .from(this.storage.values())
            .map((item: IStringArrayStorageItemData) => {
                return `'${this.escapeSequenceEncoder.encode(
                    item.encodedValue,
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
        let encodedValue: string;
        let decodeKey: string | null = null;

        switch (this.options.stringArrayEncoding) {
            case StringArrayEncoding.Rc4:
                decodeKey = this.randomGenerator.getRandomGenerator().pickone(this.rc4Keys);
                encodedValue = this.cryptUtils.btoa(this.cryptUtils.rc4(value, decodeKey));

                break;

            case StringArrayEncoding.Base64:
                encodedValue = this.cryptUtils.btoa(value);

                break;

            default:
                encodedValue = value;
        }

        return { encodedValue, decodeKey };
    }
}
