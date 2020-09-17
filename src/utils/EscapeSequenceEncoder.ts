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

        const radix: number = 16;
        const replaceRegExp: RegExp = new RegExp('[\\s\\S]', 'g');

        let prefix: string;
        let template: string;

        const result: string = string.replace(replaceRegExp, (character: string): string => {
            const shouldEncodeCharacter: boolean = encodeAllSymbols
                || EscapeSequenceEncoder.forceEscapeCharactersRegExp.test(character);

            if (!shouldEncodeCharacter) {
                return character;
            }

            if (EscapeSequenceEncoder.ASCIICharactersRegExp.test(character)) {
                prefix = '\\x';
                template = '00';
            } else {
                prefix = '\\u';
                template = '0000';
            }

            return `${prefix}${(template + character.charCodeAt(0).toString(radix)).slice(-template.length)}`;
        });

        this.stringsCache.set(cacheKey, result);
        this.stringsCache.set(`${result}-${String(encodeAllSymbols)}`, result);

        return result;
    }
}
