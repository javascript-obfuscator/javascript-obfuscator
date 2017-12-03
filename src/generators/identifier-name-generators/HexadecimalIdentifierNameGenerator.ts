import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { AbstractIdentifierNameGenerator } from './AbstractIdentifierNameGenerator';
import { Utils } from '../../utils/Utils';

@injectable()
export class HexadecimalIdentifierNameGenerator extends AbstractIdentifierNameGenerator {
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
     * @param {number} length
     * @returns {string}
     */
    public generate (length: number): string {
        const prefix: string = `_${Utils.hexadecimalPrefix}`;
        const rangeMinInteger: number = 10000;
        const rangeMaxInteger: number = 99999999;
        const randomInteger: number = this.randomGenerator.getRandomInteger(rangeMinInteger, rangeMaxInteger);
        const hexadecimalNumber: string = Utils.decToHex(randomInteger);
        const randomVariableName: string = `${prefix}${hexadecimalNumber.substr(0, length)}`;

        if (this.randomVariableNameSet.has(randomVariableName)) {
            return this.generate(length);
        }

        this.randomVariableNameSet.add(randomVariableName);

        return randomVariableName;
    }
}
