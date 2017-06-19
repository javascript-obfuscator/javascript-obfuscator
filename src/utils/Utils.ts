import { JSFuck } from '../enums/JSFuck';

import { RandomGeneratorUtils } from './RandomGeneratorUtils';

export class Utils {
    /**
     * @type {string}
     */
    public static readonly hexadecimalPrefix: string = '0x';

    /**
     * @type {Map<string, string>}
     */
    private static readonly stringToUnicodeEscapeSequenceCache: Map <string, string> = new Map();

    /**
     * @param length
     * @return {number[]}
     */
    public static arrayRange (length: number): number[] {
        const range: number[] = [];

        for (let i: number = 0; i < length; i++) {
            range.push(i);
        }

        return range;
    }

    /**
     * @param array
     * @param times
     * @returns {T[]}
     */
    public static arrayRotate <T> (array: T[], times: number): T[] {
        if (!array.length) {
            throw new ReferenceError(`Cannot rotate empty array.`);
        }

        if (times <= 0) {
            return array;
        }

        const newArray: T[] = array;

        let temp: T | undefined;

        while (times--) {
            temp = newArray.pop()!;
            newArray.unshift(temp);
        }

        return newArray;
    }

    /**
     * @param array
     * @return {T[]}
     */
    public static arrayShuffle <T> (array: T[]): T[] {
        const shuffledArray: T[] = [...array];

        for (let i: number = shuffledArray.length; i; i--) {
            const j: number = Math.floor(RandomGeneratorUtils.getMathRandom() * i);

            [shuffledArray[i - 1], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i - 1]];
        }

        return shuffledArray;
    }

    /**
     * @param dec
     * @returns {string}
     */
    public static decToHex (dec: number): string {
        const radix: number = 16;

        return dec.toString(radix);
    }

    /**
     * @param url
     * @returns {string}
     */
    public static extractDomainFromUrl (url: string): string {
        let domain: string;

        if (url.indexOf('://') > -1 || url.indexOf('//') === 0) {
            domain = url.split('/')[2];
        } else {
            domain = url.split('/')[0];
        }

        domain = domain.split(':')[0];

        return domain;
    }

    /**
     * @param number
     * @returns {boolean}
     */
    public static isCeilNumber (number: number): boolean {
        return number % 1 === 0;
    }

    /**
     * @param obj
     * @returns {T}
     */
    public static strEnumify <T extends {[prop: string]: ''|string}> (obj: T): T {
        return obj;
    }

    /**
     * @param string
     * @param times
     * @returns {string}
     */
    public static stringRotate (string: string, times: number): string {
        if (!string) {
            throw new ReferenceError(`Cannot rotate empty string.`);
        }

        for (let i: number = 0; i < times; i++) {
            string = string[string.length - 1] + string.substring(0, string.length - 1);
        }

        return string;
    }

    /**
     * @param string
     * @returns {string}
     */
    public static stringToJSFuck (string: string): string {
        return Array
            .from(string)
            .map((character: string): string => {
                return JSFuck[<any>character] || character;
            })
            .join(' + ');
    }

    /**
     * @param string
     * @param usingUnicodeEscapeSequence
     * @returns {string}
     */
    public static stringToUnicodeEscapeSequence (string: string, usingUnicodeEscapeSequence: boolean): string {
        const cacheKey: string = `${string}-${String(usingUnicodeEscapeSequence)}`;

        if (Utils.stringToUnicodeEscapeSequenceCache.has(cacheKey)) {
            return <string>Utils.stringToUnicodeEscapeSequenceCache.get(cacheKey);
        }

        const radix: number = 16;
        const replaceRegExp: RegExp = new RegExp('[\\s\\S]', 'g');
        const escapeSequenceRegExp: RegExp = new RegExp('[\'\"\\\\\\s]');
        const regExp: RegExp = new RegExp('[\\x00-\\x7F]');

        let prefix: string,
            template: string;

        const result: string = string.replace(replaceRegExp, (character: string): string => {
            if (!usingUnicodeEscapeSequence && !escapeSequenceRegExp.exec(character)) {
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

        Utils.stringToUnicodeEscapeSequenceCache.set(cacheKey, result);

        return result;
    }
}
