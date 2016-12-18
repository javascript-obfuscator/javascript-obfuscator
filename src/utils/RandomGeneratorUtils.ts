import { Chance } from 'chance';

import { Utils } from './Utils';

export class RandomGeneratorUtils {
    /**
     * @type {string}
     */
    public static readonly randomGeneratorPool: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /**
     * @type {string}
     */
    public static readonly randomGeneratorPoolWithNumbers: string = `${RandomGeneratorUtils.randomGeneratorPool}0123456789`;

    /**
     * @type {Chance.Chance | Chance.SeededChance}
     */
    private static randomGenerator: Chance.Chance | Chance.SeededChance = new Chance();

    /**
     * @param min
     * @param max
     * @returns {number}
     */
    public static getRandomFloat (min: number, max: number): number {
        return RandomGeneratorUtils.getRandomGenerator().floating({
            min: min,
            max: max,
            fixed: 7
        });
    }

    /**
     * @returns {Chance.Chance}
     */
    public static getRandomGenerator (): Chance.Chance {
        const randomGenerator: Chance.Chance = RandomGeneratorUtils.randomGenerator;

        if (!randomGenerator) {
            throw new Error(`\`randomGenerator\` static property is undefined`);
        }

        return RandomGeneratorUtils.randomGenerator;
    }

    /**
     * @param min
     * @param max
     * @returns {number}
     */
    public static getRandomInteger (min: number, max: number): number {
        return RandomGeneratorUtils.getRandomGenerator().integer({
            min: min,
            max: max
        });
    }

    /**
     * @param length
     * @param pool
     * @returns {string}
     */
    public static getRandomString (length: number, pool: string = RandomGeneratorUtils.randomGeneratorPool): string {
        return RandomGeneratorUtils.getRandomGenerator().string({ length, pool });
    }

    /**
     * @param length
     * @param withPrefix
     * @returns {string}
     */
    public static getRandomVariableName (length: number = 6, withPrefix: boolean = true): string {
        const prefix: string = withPrefix ? `_${Utils.hexadecimalPrefix}` : '';
        const rangeMinInteger: number = 10000;
        const rangeMaxInteger: number = 99999999;

        return `${prefix}${(
            Utils.decToHex(
                RandomGeneratorUtils.getRandomInteger(rangeMinInteger, rangeMaxInteger)
            )
        ).substr(0, length)}`;
    }

    /**
     * @param randomGenerator
     */
    public static setRandomGenerator (randomGenerator: Chance.Chance | Chance.SeededChance): void {
        RandomGeneratorUtils.randomGenerator = randomGenerator;
    }
}
