export interface IArrayUtils {
    /**
     * @param length
     * @return {number[]}
     */
    createWithRange (length: number): number[];

    /**
     * @param {T[]} array
     * @returns {T | null}
     */
    findMostOccurringElement <T extends string | number> (array: T[]): T | null;

    /**
     * @param {T[]} array
     * @returns {T | undefined}
     */
    getLastElement <T> (array: T[]): T | undefined;

    /**
     * @param array
     * @param times
     * @returns {T[]}
     */
    rotate <T> (array: T[], times: number): T[];

    /**
     * @param array
     * @return {T[]}
     */
    shuffle <T> (array: T[]): T[];
}
