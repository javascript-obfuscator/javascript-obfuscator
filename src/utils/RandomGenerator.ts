import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import md5 from 'md5';

import { IInitializable } from '../interfaces/IInitializable';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { ISourceCode } from '../interfaces/source-code/ISourceCode';
import { ActualRandomGenerator } from './ActualRandomGenerator';


@injectable()
export class RandomGenerator implements IRandomGenerator, IInitializable {
    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {ISourceCode}
     */
    private readonly sourceCode: ISourceCode;

    private readonly randomGenerator: ActualRandomGenerator;

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
        this.randomGenerator = new R();
    }

    @postConstruct()
    public initialize (): void {
    }

    /**
     * @returns {number}
     */
    public getMathRandom (): number {
        return this.getRandomInteger(0, 99999) / 100000;
    }

    public getRandomGenerator (): ActualRandomGenerator {
        return this.randomGenerator;
    }

    /**
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    public getRandomInteger (min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min) + min);
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

        return valuesToPickArray[Math.floor(Math.random() * valuesToPickArray.length)];
    }

    /**
     * @param {number} length
     * @returns {string}
     */
    public getRandomString (length: number): string {
        return this.getRandomGenerator().string({ length });
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
