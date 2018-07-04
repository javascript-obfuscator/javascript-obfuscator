import { Chance } from 'chance';

export interface IRandomGenerator {
    /**
     * @returns {number}
     */
    getMathRandom (): number;

    /**
     * @returns {Chance.Chance}
     */
    getRandomGenerator (): Chance.Chance;

    /**
     * @param min
     * @param max
     * @returns {number}
     */
    getRandomInteger (min: number, max: number): number;

    /**
     * @param length
     * @param pool
     * @returns {string}
     */
    getRandomString (length: number, pool?: string): string;

    /**
     * @returns {number}
     */
    getSeed (): number;
}
