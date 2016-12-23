import * as _ from 'lodash';
import { JSFuck } from '../enums/JSFuck';

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
     * @param dec
     * @returns {string}
     */
    public static decToHex (dec: number): string {
        const radix: number = 16;

        return Number(dec).toString(radix);
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
     * @param map
     * @param value
     * @returns {T | null}
     */
    public static mapGetFirstKeyOf <T, U> (map: Map <T, U>, value: U): T | null {
        for (const [key, storageValue] of map) {
            if (_.isEqual(value, storageValue)) {
                return key;
            }
        }

        return null;
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
                return JSFuck[character] || character;
            })
            .join(' + ');
    }

    /**
     * @param string
     * @param nonLatinAndNonDigitsOnly
     * @returns {string}
     */
    public static stringToUnicodeEscapeSequence (string: string, nonLatinAndNonDigitsOnly: boolean = false): string {
        const cacheKey: string = `${string}-${String(nonLatinAndNonDigitsOnly)}`;

        if (Utils.stringToUnicodeEscapeSequenceCache.has(cacheKey)) {
            return <string>Utils.stringToUnicodeEscapeSequenceCache.get(cacheKey);
        }

        const radix: number = 16;
        const replaceRegExp: RegExp = new RegExp('[\\s\\S]', 'g');
        const escapeRegExp: RegExp = new RegExp('[^a-zA-Z0-9]');
        const regexp: RegExp = new RegExp('[\\x00-\\x7F]');

        let prefix: string,
            template: string;

        const result: string = string.replace(replaceRegExp, (escape: string): string => {
            if (nonLatinAndNonDigitsOnly && !escapeRegExp.test(escape)) {
                return escape;
            }

            if (regexp.test(escape)) {
                prefix = '\\x';
                template = '0'.repeat(2);
            } else {
                prefix = '\\u';
                template = '0'.repeat(4);
            }
            
            return `${prefix}${(template + escape.charCodeAt(0).toString(radix)).slice(-template.length)}`;
        });

        Utils.stringToUnicodeEscapeSequenceCache.set(cacheKey, result);

        return result;
    }
}
