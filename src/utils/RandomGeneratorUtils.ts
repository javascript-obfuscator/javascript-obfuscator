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
    public static readonly randomGeneratorPoolHexadecimal: string = 'abcdef0123456789';

    /**
     * @type {string}
     */
    public static readonly randomGeneratorPoolWithNumbers: string = `${RandomGeneratorUtils.randomGeneratorPool}0123456789`;

    /**
     * @type {Set<string>}
     */
    public static readonly randomVariableNameSet: Set <string> = new Set();

    /**
     * @type {Chance.Chance | Chance.SeededChance}
     */
    private static randomGenerator: Chance.Chance | Chance.SeededChance;

    /**
     * @param seed
     */
    public static initializeRandomGenerator (seed: number): void {
        if (seed !== 0) {
            RandomGeneratorUtils.randomGenerator = new Chance(seed);
        } else {
            RandomGeneratorUtils.randomGenerator = new Chance();
        }
    }

    public static clearRandomGenerator (): void {
        RandomGeneratorUtils.randomVariableNameSet.clear();
    }

    /**
     * @returns {number}
     */
    public static getMathRandom (): number {
        return RandomGeneratorUtils.getRandomInteger(0, 99999) / 100000;
    }

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
            RandomGeneratorUtils.initializeRandomGenerator(0);
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
     * @returns {string}
     */
    public static getRandomVariableName (length: number): string {
        const prefix: string = `_${Utils.hexadecimalPrefix}`;
        const rangeMinInteger: number = 10000;
        const rangeMaxInteger: number = 99999999;
        const randomVariableName: string = `${prefix}${(
            Utils.decToHex(
                RandomGeneratorUtils.getRandomInteger(rangeMinInteger, rangeMaxInteger)
            )
        ).substr(0, length)}`;

        if (RandomGeneratorUtils.randomVariableNameSet.has(randomVariableName)) {
            return RandomGeneratorUtils.getRandomVariableName(length);
        }

        RandomGeneratorUtils.randomVariableNameSet.add(randomVariableName);

        return randomVariableName;
    }
}
