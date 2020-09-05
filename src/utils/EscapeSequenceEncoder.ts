import { injectable } from 'inversify';

import { IEscapeSequenceEncoder } from '../interfaces/utils/IEscapeSequenceEncoder';

@injectable()
export class EscapeSequenceEncoder implements IEscapeSequenceEncoder {
    /**
     * @type {string}
     */
    private static readonly unicodeLeadingCharacter: string = '\\u';

    /**
     * @type {string}
     */
    private static readonly hexLeadingCharacter: string = '\\x';

    /**
     * @type {Map<string, string>}
     */
    private readonly stringsCache: Map <string, string> = new Map();

    /**
     * @param {string} string
     * @param {boolean} encodeAllSymbols
     * @returns {string}
     */
    public encode (string: string, encodeAllSymbols: boolean): string {
        const cacheKey: string = `${string}-${String(encodeAllSymbols)}`;

        if (this.stringsCache.has(cacheKey)) {
            return <string>this.stringsCache.get(cacheKey);
        }

        const encodedString: string = this.isEscapedString(string)
            ? this.encodeEscapedString(string)
            : this.encodeBaseString(string, encodeAllSymbols);

        this.stringsCache.set(cacheKey, encodedString);
        this.stringsCache.set(`${encodedString}-${String(encodeAllSymbols)}`, encodedString);

        return encodedString;
    }

    /**
     * Base string
     *
     * @param {string} string
     * @param {boolean} encodeAllSymbols
     * @returns {string}
     */
    public encodeBaseString (string: string, encodeAllSymbols: boolean): string {
        const radix: number = 16;
        const replaceRegExp: RegExp = new RegExp('[\\s\\S]', 'g');
        const escapeSequenceRegExp: RegExp = new RegExp('[\'\"\\\\\\s]');
        const regExp: RegExp = new RegExp('[\\x00-\\x7F]');

        let prefix: string;
        let template: string;

        return string.replace(replaceRegExp, (character: string): string => {
            if (!encodeAllSymbols && !escapeSequenceRegExp.exec(character)) {
                return character;
            }

            if (regExp.exec(character)) {
                prefix = EscapeSequenceEncoder.hexLeadingCharacter;
                template = '00';
            } else {
                prefix = EscapeSequenceEncoder.unicodeLeadingCharacter;
                template = '0000';
            }

            return `${prefix}${(template + character.charCodeAt(0).toString(radix)).slice(-template.length)}`;
        });
    }

    /**
     * String with escaped unicode escape sequence
     *
     * Example:
     * \\ud83d\\ude03
     *
     * @param {string} string
     * @returns {string}
     */
    public encodeEscapedString (string: string): string {
        return string;
    }

    /**
     * @param {string} string
     * @returns {boolean}
     */
    private isEscapedString (string: string): boolean {
        const unicodeLeadingCharacterRegExp: RegExp = new RegExp(`\\\\${EscapeSequenceEncoder.unicodeLeadingCharacter}`);
        const hexLeadingCharacterRegExp: RegExp = new RegExp(`\\\\${EscapeSequenceEncoder.hexLeadingCharacter}`);

        return unicodeLeadingCharacterRegExp.test(string) || hexLeadingCharacterRegExp.test(string);
    }
}
