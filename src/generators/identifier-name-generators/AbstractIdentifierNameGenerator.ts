import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IIdentifierNameGenerator } from '../../interfaces/generators/identifier-name-generators/IIdentifierNameGenerator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

@injectable()
export abstract class AbstractIdentifierNameGenerator implements IIdentifierNameGenerator {
    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {number} length
     * @returns {string}
     */
    public abstract generate (length: number): string;
}
