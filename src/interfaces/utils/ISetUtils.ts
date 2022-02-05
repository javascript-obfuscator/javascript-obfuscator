export interface ISetUtils {
    /**
     * @param {Set<T>} set
     * @returns {T | undefined}
     */
    getLastElement <T> (set: Set<T>): T | undefined;
}
