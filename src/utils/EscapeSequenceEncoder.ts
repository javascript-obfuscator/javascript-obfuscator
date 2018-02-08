import { injectable } from 'inversify';

import { IEscapeSequenceEncoder } from '../interfaces/utils/IEscapeSequenceEncoder';

@injectable()
export class EscapeSequenceEncoder implements IEscapeSequenceEncoder {
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
        const escapeSequenceRegExp: RegExp = new RegExp('[\'\"\\\\\\s]');
        const regExp: RegExp = new RegExp('[\\x00-\\x7F]');

        let prefix: string;
        let template: string;

        const result: string = string.replace(replaceRegExp, (character: string): string => {
            if (!encodeAllSymbols && !escapeSequenceRegExp.exec(character)) {
                return character;
            }

            if (regExp.exec(character)) {
                prefix = '\\x';
                template = '00';
            } else {
                prefix = '\\u';
                template = '0000';
            }

            return `${prefix}${(template + character.charCodeAt(0).toString(radix)).slice(-template.length)}`;
        });

        this.stringsCache.set(cacheKey, result);

        return result;
    }
}
