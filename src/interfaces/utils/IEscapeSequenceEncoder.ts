export interface IEscapeSequenceEncoder {
    /**
     * @param {string} string
     * @param {boolean} encodeAllSymbols
     * @returns {string}
     */
    encode(string: string, encodeAllSymbols: boolean): string;

    /**
     * @param {string} value
     * @param {string | undefined} rawValue
     * @param {boolean} encodeAllSymbols
     * @returns {string}
     */
    encodeLiteral(value: string, rawValue: string | undefined, encodeAllSymbols: boolean): string;
}
