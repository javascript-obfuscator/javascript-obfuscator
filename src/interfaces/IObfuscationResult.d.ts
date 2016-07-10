export interface IObfuscationResult {
    /**
     * @return {string}
     */
    getObfuscatedCode (): string;

    /**
     * @return {string}
     */
    getSourceMap (): string;
}
