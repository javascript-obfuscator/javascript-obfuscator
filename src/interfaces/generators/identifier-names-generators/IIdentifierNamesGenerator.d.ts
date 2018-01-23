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
     * @returns {string}
     */
    getPrefix (): string;
}
