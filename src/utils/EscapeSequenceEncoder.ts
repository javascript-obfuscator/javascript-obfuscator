import { injectable } from 'inversify';

import { IEscapeSequenceEncoder } from '../interfaces/utils/IEscapeSequenceEncoder';

@injectable()
export class EscapeSequenceEncoder implements IEscapeSequenceEncoder {
    /**
     * https://bytefreaks.net/gnulinux/regular-expression-to-match-any-ascii-character
     *
     * @type {RegExp}
     */
    private static readonly ASCIICharactersRegExp: RegExp = /[\x00-\x7F]/;

    /**
     * https://en.wikipedia.org/wiki/List_of_Unicode_characters
     * \x00-\x1F\x7F-\x9F are the control unicode characters
     *
     * @type {RegExp}
     */
    private static readonly forceEscapeCharactersRegExp: RegExp = /[\x00-\x1F\x7F-\x9F'"\\\s]/;

    /**
     * @type {RegExp}
     */
    private static readonly replaceRegExp: RegExp = /[\s\S]/g;

    /**
     * @type {RegExp}
     */
    private static readonly hexDigitRegExp: RegExp = /[0-9a-fA-F]/;

    /**
     * @type {RegExp}
     */
    private static readonly octalDigitRegExp: RegExp = /[0-7]/;

    /**
     * @type {Map<string, string>}
     */
    private readonly stringsCache: Map<string, string> = new Map();

    /**
     * @param {string} string
     * @param {boolean} encodeAllSymbols
     * @returns {string}
     */
    public encode(string: string, encodeAllSymbols: boolean): string {
        const cacheKey: string = `${string}-${String(encodeAllSymbols)}`;

        if (this.stringsCache.has(cacheKey)) {
            return <string>this.stringsCache.get(cacheKey);
        }

        const result: string = string.replace(
            EscapeSequenceEncoder.replaceRegExp,
            (character: string): string => this.encodeCharacter(character, encodeAllSymbols)
        );

        this.stringsCache.set(cacheKey, result);
        this.stringsCache.set(`${result}-${String(encodeAllSymbols)}`, result);

        return result;
    }

    /**
     * @param {string} value - decoded literal value
     * @param {string | undefined} rawValue - original source representation of the literal (with quotes)
     * @param {boolean} encodeAllSymbols
     * @returns {string}
     */
    public encodeLiteral(value: string, rawValue: string | undefined, encodeAllSymbols: boolean): string {
        // when all symbols are being encoded every character becomes an escape sequence anyway,
        // so there is nothing to preserve
        if (encodeAllSymbols || rawValue === undefined) {
            return this.encode(value, encodeAllSymbols);
        }

        const cacheKey: string = `literal-${value}-${rawValue}-${String(encodeAllSymbols)}`;

        if (this.stringsCache.has(cacheKey)) {
            return <string>this.stringsCache.get(cacheKey);
        }

        const preservedResult: string | null = this.encodePreservingUnicodeEscapes(value, rawValue);
        const result: string = preservedResult ?? this.encode(value, encodeAllSymbols);

        this.stringsCache.set(cacheKey, result);

        return result;
    }

    /**
     * @param {string} character
     * @param {boolean} encodeAllSymbols
     * @returns {string}
     */
    private encodeCharacter(character: string, encodeAllSymbols: boolean): string {
        const shouldEncodeCharacter: boolean =
            encodeAllSymbols || EscapeSequenceEncoder.forceEscapeCharactersRegExp.test(character);

        if (!shouldEncodeCharacter) {
            return character;
        }

        const radix: number = 16;

        let prefix: string;
        let template: string;

        if (EscapeSequenceEncoder.ASCIICharactersRegExp.test(character)) {
            prefix = '\\x';
            template = '00';
        } else {
            prefix = '\\u';
            template = '0000';
        }

        return `${prefix}${(template + character.charCodeAt(0).toString(radix)).slice(-template.length)}`;
    }

    /**
     * @param {string} value
     * @param {string} rawValue
     * @returns {string | null}
     */
    private encodePreservingUnicodeEscapes(value: string, rawValue: string): string | null {
        const rawBody: string = rawValue.slice(1, -1);

        let result: string = '';
        let decoded: string = '';
        let index: number = 0;

        while (index < rawBody.length) {
            const character: string = rawBody[index];

            if (character !== '\\') {
                result += this.encodeCharacter(character, false);
                decoded += character;
                index++;

                continue;
            }

            const nextCharacter: string | undefined = rawBody[index + 1];

            if (nextCharacter === undefined) {
                // dangling backslash - malformed, cannot trust the raw value
                return null;
            }

            if (nextCharacter === 'u' || nextCharacter === 'x') {
                const unicodeEscape: { raw: string; decoded: string } | null = this.readUnicodeEscapeSequence(
                    rawBody,
                    index
                );

                if (!unicodeEscape) {
                    return null;
                }

                // keep the unicode/hex escape sequence exactly as it was in the source
                result += unicodeEscape.raw;
                decoded += unicodeEscape.decoded;
                index += unicodeEscape.raw.length;

                continue;
            }

            // any other escape sequence is decoded and re-encoded as a regular character
            const simpleEscape: { raw: string; decoded: string } = this.readSimpleEscapeSequence(rawBody, index);

            for (const decodedCharacter of simpleEscape.decoded) {
                result += this.encodeCharacter(decodedCharacter, false);
            }

            decoded += simpleEscape.decoded;
            index += simpleEscape.raw.length;
        }

        return decoded === value ? result : null;
    }

    /**
     * @param {string} rawBody
     * @param {number} startIndex - index of the leading backslash
     * @returns {{raw: string, decoded: string} | null}
     */
    private readUnicodeEscapeSequence(
        rawBody: string,
        startIndex: number
    ): { raw: string; decoded: string } | null {
        // `\xXX`
        if (rawBody[startIndex + 1] === 'x') {
            return this.readFixedLengthHexEscapeSequence(rawBody, startIndex, 2);
        }

        // `\u{XXXX}`
        if (rawBody[startIndex + 2] === '{') {
            return this.readCodePointEscapeSequence(rawBody, startIndex);
        }

        // `\uXXXX`
        return this.readFixedLengthHexEscapeSequence(rawBody, startIndex, 4);
    }

    /**
     * @param {string} rawBody
     * @param {number} startIndex - index of the leading backslash
     * @param {number} hexLength - amount of the hex digits (2 for `\xXX`, 4 for `\uXXXX`)
     * @returns {{raw: string, decoded: string} | null}
     */
    private readFixedLengthHexEscapeSequence(
        rawBody: string,
        startIndex: number,
        hexLength: number
    ): { raw: string; decoded: string } | null {
        const hexDigits: string = rawBody.slice(startIndex + 2, startIndex + 2 + hexLength);

        if (hexDigits.length !== hexLength || !this.isHexString(hexDigits)) {
            return null;
        }

        return {
            raw: rawBody.slice(startIndex, startIndex + 2 + hexLength),
            decoded: String.fromCharCode(parseInt(hexDigits, 16))
        };
    }

    /**
     * @param {string} rawBody
     * @param {number} startIndex - index of the leading backslash
     * @returns {{raw: string, decoded: string} | null}
     */
    private readCodePointEscapeSequence(
        rawBody: string,
        startIndex: number
    ): { raw: string; decoded: string } | null {
        const closingBraceIndex: number = rawBody.indexOf('}', startIndex + 3);

        if (closingBraceIndex === -1) {
            return null;
        }

        const hexDigits: string = rawBody.slice(startIndex + 3, closingBraceIndex);
        const codePoint: number = parseInt(hexDigits, 16);

        const maxCodePoint: number = 0x10_ff_ff;

        if (!hexDigits.length || !this.isHexString(hexDigits) || codePoint > maxCodePoint) {
            return null;
        }

        return {
            raw: rawBody.slice(startIndex, closingBraceIndex + 1),
            decoded: String.fromCodePoint(codePoint)
        };
    }

    /**
     * @param {string} rawBody
     * @param {number} startIndex - index of the leading backslash
     * @returns {{raw: string, decoded: string}}
     */
    // eslint-disable-next-line complexity
    private readSimpleEscapeSequence(rawBody: string, startIndex: number): { raw: string; decoded: string } {
        const escapeCharacter: string = rawBody[startIndex + 1];

        switch (escapeCharacter) {
            case 'n':
                return { raw: '\\n', decoded: '\n' };

            case 'r':
                return { raw: '\\r', decoded: '\r' };

            case 't':
                return { raw: '\\t', decoded: '\t' };

            case 'b':
                return { raw: '\\b', decoded: '\b' };

            case 'f':
                return { raw: '\\f', decoded: '\f' };

            case 'v':
                return { raw: '\\v', decoded: '\v' };

            case '\r': {
                // line continuation (`\` followed by a line terminator)
                const isCarriageReturnLineFeed: boolean = rawBody[startIndex + 2] === '\n';

                return { raw: isCarriageReturnLineFeed ? '\\\r\n' : '\\\r', decoded: '' };
            }

            case '\n':
                return { raw: '\\\n', decoded: '' };

            default:
                break;
        }

        // legacy octal escape sequence (e.g. `\0`, `\12`, `\101`)
        if (EscapeSequenceEncoder.octalDigitRegExp.test(escapeCharacter)) {
            let octalDigits: string = escapeCharacter;
            const maxOctalLength: number = escapeCharacter <= '3' ? 3 : 2;

            while (
                octalDigits.length < maxOctalLength &&
                EscapeSequenceEncoder.octalDigitRegExp.test(rawBody[startIndex + 1 + octalDigits.length] ?? '')
            ) {
                octalDigits += rawBody[startIndex + 1 + octalDigits.length];
            }

            return {
                raw: `\\${octalDigits}`,
                decoded: String.fromCharCode(parseInt(octalDigits, 8))
            };
        }

        // identity escape (`\\`, `\'`, `\"`, `` \` ``, `\/`, etc.)
        return { raw: `\\${escapeCharacter}`, decoded: escapeCharacter };
    }

    /**
     * @param {string} string
     * @returns {boolean}
     */
    private isHexString(string: string): boolean {
        for (const character of string) {
            if (!EscapeSequenceEncoder.hexDigitRegExp.test(character)) {
                return false;
            }
        }

        return true;
    }
}
