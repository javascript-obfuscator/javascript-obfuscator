import { Chance } from 'chance';

export interface IRandomGenerator {
    /**
     * @returns {number}
     */
    getMathRandom (): number;

    /**
     * @param min
     * @param max
     * @returns {number}
     */
    getRandomFloat (min: number, max: number): number;

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
     * @param length
     * @returns {string}
     */
    getRandomVariableName (length: number): string
}
