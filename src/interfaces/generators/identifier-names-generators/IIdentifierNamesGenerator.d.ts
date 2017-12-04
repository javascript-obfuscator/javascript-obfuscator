export interface IIdentifierNamesGenerator {
    /**
     * @param {number} length
     * @returns {string}
     */
    generate (length: number): string;
}
