export interface IEscapeSequenceEncoder {
    /**
     * @param string
     * @param usingUnicodeEscapeSequence
     */
    encode (string: string, usingUnicodeEscapeSequence: boolean): string;
}
