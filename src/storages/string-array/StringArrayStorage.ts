import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../interfaces/options/IOptions';

import { ArrayStorage } from '../ArrayStorage';

@injectable()
export class StringArrayStorage extends ArrayStorage <string> {
    /**
     * @type {number}
     */
    private static readonly stringArrayNameLength: number = 7;

    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IArrayUtils} arrayUtils
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
        this.arrayUtils = arrayUtils;
    }

    @postConstruct()
    public initialize (): void {
        super.initialize();

        const baseStringArrayName: string = this.identifierNamesGenerator
            .generate()
            .slice(0, StringArrayStorage.stringArrayNameLength);
        const baseStringArrayCallsWrapperName: string = this.identifierNamesGenerator
            .generate()
            .slice(0, StringArrayStorage.stringArrayNameLength);
        const stringArrayName: string = `${this.options.identifiersPrefix}${baseStringArrayName}`;
        const stringArrayCallsWrapperName: string = `${this.options.identifiersPrefix}${baseStringArrayCallsWrapperName}`;

        this.storageId = `${stringArrayName}|${stringArrayCallsWrapperName}`;
    }

    /**
     * @param {number} rotationValue
     */
    public rotateArray (rotationValue: number): void {
        this.storage = this.arrayUtils.rotate(this.storage, rotationValue);
    }

    /**
     * @returns {string}
     */
    public toString (): string {
        return this.storage.map((value: string) => {
            return `'${value}'`;
        }).toString();
    }
}
