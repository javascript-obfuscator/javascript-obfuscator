export interface IIdentifierNamesGenerator {
    /**
     * @param {number} nameLength
     * @returns {string}
     */
    generate (nameLength?: number): string;

    /**
     * @param {number} nameLength
     * @returns {string}
     */
    generateWithPrefix (nameLength?: number): string;

    /**
     * @param {string} identifierName
     * @returns {boolean}
     */
    isValidIdentifierName (identifierName: string): boolean;
}
