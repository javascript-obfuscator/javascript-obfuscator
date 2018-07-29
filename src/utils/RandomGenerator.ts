import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import md5 from 'md5';
import { Chance } from 'chance';

import { IInitializable } from '../interfaces/IInitializable';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { ISourceCode } from '../interfaces/source-code/ISourceCode';

import { initializable } from '../decorators/Initializable';

@injectable()
export class RandomGenerator implements IRandomGenerator, IInitializable {
    /**
     * @type {string}
     */
    public static readonly randomGeneratorPool: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {Chance.Chance}
     */
    @initializable()
    private randomGenerator!: Chance.Chance;

    /**
     * @type {number}
     */
    @initializable()
    private seed!: number;

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

        /**
         * We need to add numbers from md5 hash of source code to input seed to prevent same String Array name
         * for different bundles with same seed
         *
         * @returns {number}
         */
        const getSeed: () => number = (): number => {
            const md5Hash: string = md5(this.sourceCode.getSourceCode());

            return this.seed + Number(md5Hash.replace(/\D/g, ''));
        };

        this.seed = this.options.seed !== 0 ? this.options.seed : getRandomInteger(0, 999_999_999);
        this.randomGenerator = new Chance(getSeed());
    }

    /**
     * @returns {number}
     */
    public getMathRandom (): number {
        return this.getRandomInteger(0, 99999) / 100000;
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
     * @returns {number}
     */
    public getSeed (): number {
        return this.seed;
    }
}
