import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IIdentifierNamesGenerator } from '../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

@injectable()
export abstract class AbstractIdentifierNamesGenerator implements IIdentifierNamesGenerator {
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
     * @param {number} nameLength
     * @returns {string}
     */
    public abstract generate (nameLength?: number): string;

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    public abstract generateWithPrefix (nameLength?: number): string;

    /**
     * @param {string} name
     * @returns {boolean}
     */
    public isValidIdentifierName (name: string): boolean {
        return this.options.reservedNames.length
            ? !this.options.reservedNames.some((reservedName: string) =>
                new RegExp(reservedName, 'g').exec(name) !== null
            )
            : true;

    }
}
