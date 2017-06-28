import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as md5 from 'md5';
import { Chance } from 'chance';

import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { Utils } from './Utils';
import { ISourceCode } from '../interfaces/ISourceCode';

@injectable()
export class RandomGenerator implements IRandomGenerator {
    /**
     * @type {string}
     */
    public static readonly randomGeneratorPool: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /**
     * @type {string}
     */
    public static readonly randomGeneratorPoolNumbers: string = '0123456789';

    /**
     * @type {string}
     */
    public static readonly randomGeneratorPoolHexadecimal: string = `abcdef${RandomGenerator.randomGeneratorPoolNumbers}`;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {Set<string>}
     */
    private readonly randomVariableNameSet: Set <string> = new Set();

    /**
     * @type {Chance.Chance | Chance.SeededChance}
     */
    private readonly randomGenerator: Chance.Chance | Chance.SeededChance;

    /**
     * @type {ISourceCode}
     */
    private readonly  sourceCode: ISourceCode;

    /**
     * @param sourceCode
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.ISourceCode) sourceCode: ISourceCode,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.sourceCode = sourceCode;
        this.options = options;

        if (options.seed !== 0) {
            this.randomGenerator = new Chance(this.getSeed());
        } else {
            this.randomGenerator = new Chance();
        }
    }

    /**
     * @returns {number}
     */
    public getMathRandom (): number {
        return this.getRandomInteger(0, 99999) / 100000;
    }

    /**
     * @param min
     * @param max
     * @returns {number}
     */
    public getRandomFloat (min: number, max: number): number {
        return this.getRandomGenerator().floating({
            min: min,
            max: max,
            fixed: 7
        });
    }

    /**
     * @returns {Chance.Chance}
     */
    public getRandomGenerator (): Chance.Chance {
        return this.randomGenerator;
    }

    /**
     * @param min
     * @param max
     * @returns {number}
     */
    public getRandomInteger (min: number, max: number): number {
        return this.getRandomGenerator().integer({
            min: min,
            max: max
        });
    }

    /**
     * @param length
     * @param pool
     * @returns {string}
     */
    public getRandomString (length: number, pool: string = RandomGenerator.randomGeneratorPool): string {
        return this.getRandomGenerator().string({ length, pool });
    }

    /**
     * @param length
     * @returns {string}
     */
    public getRandomVariableName (length: number): string {
        const prefix: string = `_${Utils.hexadecimalPrefix}`;
        const rangeMinInteger: number = 10000;
        const rangeMaxInteger: number = 99999999;
        const randomVariableName: string = `${prefix}${(
            Utils.decToHex(
                this.getRandomInteger(rangeMinInteger, rangeMaxInteger)
            )
        ).substr(0, length)}`;

        if (this.randomVariableNameSet.has(randomVariableName)) {
            return this.getRandomVariableName(length);
        }

        this.randomVariableNameSet.add(randomVariableName);

        return randomVariableName;
    }

    /**
     * We need to add numbers from md5 hash of source code to input seed to prevent same String Array name
     * for different bundles with same seed
     *
     * @returns {number}
     */
    private getSeed (): number {
        const md5Hash: string = md5(this.sourceCode.getSourceCode());

        return this.options.seed + Number(md5Hash.replace(/\D/g, ''));
    }
}
