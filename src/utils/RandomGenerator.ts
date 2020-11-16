import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import md5 from 'md5';
import { Chance } from 'chance';

import { IInitializable } from '../interfaces/IInitializable';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { ISourceCode } from '../interfaces/source-code/ISourceCode';

import { initializable } from '../decorators/Initializable';

import { alphabetString } from '../constants/AlphabetString';
import { alphabetStringUppercase } from '../constants/AlphabetStringUppercase';

@injectable()
export class RandomGenerator implements IRandomGenerator, IInitializable {
    /**
     * @type {string}
     */
    public static readonly randomGeneratorPool: string = `${alphabetString}${alphabetStringUppercase}`;

    /**
     * @type {Chance.Chance}
     */
    @initializable()
    private randomGenerator!: Chance.Chance;

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {ISourceCode}
     */
    private readonly sourceCode: ISourceCode;

    /**
     * @param {ISourceCode} sourceCode
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.ISourceCode) sourceCode: ISourceCode,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.sourceCode = sourceCode;
        this.options = options;
    }

    @postConstruct()
    public initialize (): void {
        this.randomGenerator = new Chance(this.getRawSeed());
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
     * @param {number} min
     * @param {number} max
     * @param {number[]} valuesToExclude
     * @returns {number}
     */
    public getRandomIntegerExcluding (min: number, max: number, valuesToExclude: number[]): number {
        const valuesToPickArray: number[] = [];

        for (let value: number = min; value <= max; value++) {
            if (valuesToExclude.includes(value)) {
                continue;
            }

            valuesToPickArray.push(value);
        }

        return this.randomGenerator.pickone(valuesToPickArray);
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
     * @returns {string}
     */
    public getInputSeed (): string {
        return this.options.seed.toString();
    }

    /**
     * We need to add numbers from md5 hash of source code to input seed to prevent same String Array name
     * for different bundles with same seed
     *
     * @returns {number}
     */
    public getRawSeed (): string {
        const inputSeed: string = this.getInputSeed();
        const inputSeedParts: string[] = `${inputSeed}`.split('|');

        if (inputSeedParts.length > 1) {
            return inputSeed;
        }

        const sourceCodeMD5Hash: string = md5(this.sourceCode.getSourceCode());

        return `${inputSeed}|${sourceCodeMD5Hash}`;
    }
}
