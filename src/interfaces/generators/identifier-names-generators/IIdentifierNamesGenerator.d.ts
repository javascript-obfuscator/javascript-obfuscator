export interface IIdentifierNamesGenerator {
    /**
     * @returns {string}
     */
    generate (): string;

    /**
     * @returns {string}
     */
    generateWithPrefix (): string;
}
