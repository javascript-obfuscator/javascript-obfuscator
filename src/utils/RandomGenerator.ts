import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as md5 from 'md5';
import { Chance } from 'chance';

import { IInitializable } from '../interfaces/IInitializable';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { Utils } from './Utils';
import { ISourceCode } from '../interfaces/ISourceCode';

@injectable()
export class RandomGenerator implements IRandomGenerator, IInitializable {
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
     * @type {number}
     */
    public seed: number;

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
    private randomGenerator: Chance.Chance | Chance.SeededChance;

    /**
     * @type {ISourceCode}
     */
    private readonly sourceCode: ISourceCode;

    /**
     * @param {ISourceCode} sourceCode
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.ISourceCode) sourceCode: ISourceCode,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.sourceCode = sourceCode;
        this.options = options;
    }

    @postConstruct()
    public initialize (): void {
        const getRandomInteger: (min: number, max: number) => number = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        this.seed = this.options.seed !== 0 ? this.options.seed : getRandomInteger(0, 999999999);
        this.randomGenerator = new Chance(this.getSeed());

        console.log(`seed is ${this.seed}`);
    }

    /**
     * @returns {number}
     */
    public getMathRandom (): number {
        return this.getRandomInteger(0, 99999) / 100000;
    }

    /**
     * @param {number} min
     * @param {number} max
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
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    public getRandomInteger (min: number, max: number): number {
        return this.getRandomGenerator().integer({
            min: min,
            max: max
        });
    }

    /**
     * @param {number} length
     * @param {string} pool
     * @returns {string}
     */
    public getRandomString (length: number, pool: string = RandomGenerator.randomGeneratorPool): string {
        return this.getRandomGenerator().string({ length, pool });
    }

    /**
     * @param {number} length
     * @returns {string}
     */
    public getRandomVariableName (length: number): string {
        const prefix: string = `_${Utils.hexadecimalPrefix}`;
        const rangeMinInteger: number = 10000;
        const rangeMaxInteger: number = 99999999;
        const randomInteger: number = this.getRandomInteger(rangeMinInteger, rangeMaxInteger);
        const hexadecimalNumber: string = Utils.decToHex(randomInteger);
        const randomVariableName: string = `${prefix}${hexadecimalNumber.substr(0, length)}`;

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

        return this.seed + Number(md5Hash.replace(/\D/g, ''));
    }
}
