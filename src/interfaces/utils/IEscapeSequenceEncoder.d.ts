export interface IEscapeSequenceEncoder {
    /**
     * @param {string} string
     * @param {boolean} encodeAllSymbols
     * @returns {string}
     */
    encode (string: string, encodeAllSymbols: boolean): string;
}
