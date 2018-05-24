export interface IArrayUtils {
    /**
     * @param length
     * @return {number[]}
     */
    createWithRange (length: number): number[];

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
