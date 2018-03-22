export interface IIdentifierNamesGenerator {
    /**
     * @returns {string}
     */
    generate (): string;

    /**
     * @returns {string}
     */
    generateWithPrefix (): string;

    /**
     * @param {string} identifierName
     * @returns {boolean}
     */
    isValidIdentifierName (identifierName: string): boolean;
}
