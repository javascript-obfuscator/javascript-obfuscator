export interface IArrayUtils {
    /**
     * @param length
     * @return {number[]}
     */
    arrayRange (length: number): number[];

    /**
     * @param array
     * @param times
     * @returns {T[]}
     */
    arrayRotate <T> (array: T[], times: number): T[];

    /**
     * @param array
     * @return {T[]}
     */
    arrayShuffle <T> (array: T[]): T[];
}
