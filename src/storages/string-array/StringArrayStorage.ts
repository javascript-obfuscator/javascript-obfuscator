import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { TIdentifierNameGeneratorFactory } from '../../types/container/generators/TIdentifierNameGeneratorFactory';
import { IIdentifierNameGenerator } from '../../interfaces/generators/identifier-name-generators/IIdentifierNameGenerator';
import { IOptions } from '../../interfaces/options/IOptions';

import { ArrayStorage } from '../ArrayStorage';

@injectable()
export class StringArrayStorage extends ArrayStorage <string> {
    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @type {IIdentifierNameGenerator}
     */
    private readonly identifierNameGenerator: IIdentifierNameGenerator;

    /**
     * @param {TIdentifierNameGeneratorFactory} identifierNameGeneratorFactory
     * @param {IArrayUtils} arrayUtils
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNameGenerator)
            identifierNameGeneratorFactory: TIdentifierNameGeneratorFactory,
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.identifierNameGenerator = identifierNameGeneratorFactory(options);
        this.arrayUtils = arrayUtils;
    }

    @postConstruct()
    public initialize (): void {
        super.initialize();

        const stringArrayName: string = this.identifierNameGenerator.generate(4);
        const stringArrayCallsWrapperName: string = this.identifierNameGenerator.generate(4);

        this.storageId = `${stringArrayName}|${stringArrayCallsWrapperName}`;
    }

    /**
     * @param {number} rotationValue
     */
    public rotateArray (rotationValue: number): void {
        this.storage = this.arrayUtils.arrayRotate(this.storage, rotationValue);
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
