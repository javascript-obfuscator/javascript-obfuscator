export interface IIdentifierNameGenerator {
    /**
     * @param {number} length
     * @returns {string}
     */
    generate (length: number): string;
}
