export interface IRandomGenerator {
    /**
     * @returns {number}
     */
    getMathRandom (): number;

    /**
     * @returns {R}
     */
    getRandomGenerator (): any;

    /**
     * @param min
     * @param max
     * @returns {number}
     */
    getRandomInteger (min: number, max: number): number;

    /**
     * @param {number} min
     * @param {number} max
     * @param {number[]} valuesToExclude
     * @returns {number}
     */
    getRandomIntegerExcluding (min: number, max: number, valuesToExclude: number[]): number;

    /**
     * @param length
     * @param pool
     * @returns {string}
     */
    getRandomString (length: number, pool?: string): string;

    /**
     * @returns {string}
     */
    getInputSeed (): string;

    /**
     * @returns {string}
     */
    getRawSeed (): string;
}
