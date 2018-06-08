import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractIdentifierNamesGenerator } from './AbstractIdentifierNamesGenerator';
import { NumberUtils } from '../../utils/NumberUtils';
import { Utils } from '../../utils/Utils';

@injectable()
export class HexadecimalIdentifierNamesGenerator extends AbstractIdentifierNamesGenerator {
    /**
     * @type {number}
     */
    private static readonly baseIdentifierNameLength: number = 6;

    /**
     * @type {Set<string>}
     */
    private readonly randomVariableNameSet: Set <string> = new Set();

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @returns {string}
     */
    public generate (): string {
        const rangeMinInteger: number = 10000;
        const rangeMaxInteger: number = 99_999_999;
        const randomInteger: number = this.randomGenerator.getRandomInteger(rangeMinInteger, rangeMaxInteger);
        const hexadecimalNumber: string = NumberUtils.toHex(randomInteger);
        const baseIdentifierName: string = hexadecimalNumber.substr(0, HexadecimalIdentifierNamesGenerator.baseIdentifierNameLength);
        const identifierName: string = `_${Utils.hexadecimalPrefix}${baseIdentifierName}`;

        if (this.randomVariableNameSet.has(identifierName)) {
            return this.generate();
        }

        this.randomVariableNameSet.add(identifierName);

        return identifierName;
    }

    /**
     * @returns {string}
     */
    public generateWithPrefix (): string {
        const identifierName: string = this.generate();

        return `${this.options.identifiersPrefix}${identifierName}`.replace('__', '_');
    }
}
