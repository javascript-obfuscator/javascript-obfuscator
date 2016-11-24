import { Chance } from 'chance';

import { JSFuck } from './enums/JSFuck';

const isEqual = require('is-equal');

export class Utils {
    /**
     * @type {string}
     */
    public static readonly randomGeneratorPool: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    /**
     * @type {Chance.Chance | Chance.SeededChance}
     */
    private static randomGenerator: Chance.Chance | Chance.SeededChance = new Chance();

    /**
     * @param array
     * @param searchElement
     * @returns {boolean}
     */
    public static arrayContains (array: any[], searchElement: any): boolean {
        return array.indexOf(searchElement) >= 0;
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

        let newArray: T[] = array,
            temp: T | undefined;

        while (times--) {
            temp = newArray.pop()!;
            newArray.unshift(temp);
        }

        return newArray;
    }

    /**
     * @param string
     */
    public static btoa (string: string): string {
        const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        let output: string = '';

        string = encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt('0x' + p1));
        });

        for (
            let block: number|undefined, charCode: number, idx: number = 0, map: string = chars;
            string.charAt(idx | 0) || (map = '=', idx % 1);
            output += map.charAt(63 & block >> 8 - idx % 1 * 8)
        ) {
            charCode = string.charCodeAt(idx += 3/4);

            if (charCode > 0xFF) {
                throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }

            block = block << 8 | charCode;
        }

        return output;
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
     * @param min
     * @param max
     * @returns {number}
     */
    public static getRandomFloat (min: number, max: number): number {
        return Utils.getRandomGenerator().floating({
            min: min,
            max: max,
            fixed: 7
        });
    }

    /**
     * @returns {Chance.Chance}
     */
    public static getRandomGenerator (): Chance.Chance {
        const randomGenerator: Chance.Chance = Utils.randomGenerator;

        if (!randomGenerator) {
            throw new Error(`\`randomGenerator\` static property is undefined`);
        }

        return Utils.randomGenerator;
    }

    /**
     * @param min
     * @param max
     * @returns {number}
     */
    public static getRandomInteger (min: number, max: number): number {
        return Utils.getRandomGenerator().integer({
            min: min,
            max: max
        });
    }

    /**
     * @param length
     * @returns {string}
     */
    public static getRandomVariableName (length: number = 6): string {
        const rangeMinInteger: number = 10000,
            rangeMaxInteger: number = 99999999,
            prefix: string = '_0x';

        return `${prefix}${(
            Utils.decToHex(
                Utils.getRandomInteger(rangeMinInteger, rangeMaxInteger)
            )
        ).substr(0, length)}`;
    }

    /**
     * @param str
     * @param length
     * @returns {string[]}
     */
    public static hideString(str: string, length: number): [string, string] {
        const escapeRegExp: (s: string) => string = (s: string) =>
            s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        const randomMerge: (s1: string, s2: string) => string = function (s1: string, s2: string): string {
            let i1: number = -1,
                i2: number = -1,
                result: string = '';

            while (i1 < s1.length || i2 < s2.length) {
                if (Utils.getRandomFloat(0, 1) < 0.5 && i2 < s2.length) {
                    result += s2.charAt(++i2);
                } else {
                    result += s1.charAt(++i1);
                }
            }

            return result;
        };

        const randomString: string = Utils.randomGenerator.string({
            length: length,
            pool: Utils.randomGeneratorPool
        });

        let randomStringDiff: string = randomString.replace(
            new RegExp('[' + escapeRegExp(str) + ']', 'g'),
        '');

        const randomStringDiffArray: string[] = randomStringDiff.split('');

        Utils.randomGenerator.shuffle(randomStringDiffArray);
        randomStringDiff = randomStringDiffArray.join('');

        return [randomMerge(str, randomStringDiff), randomStringDiff];

    }

    /**
     * @param number
     * @returns {boolean}
     */
    public static isInteger (number: number): boolean {
        return number % 1 === 0;
    }

    /**
     * @param map
     * @param value
     * @returns {any}
     */
    public static mapGetFirstKeyOf(map: Map <any, any>, value: any): any {
        for (var [key, storageValue] of map) {
            if (isEqual(value, storageValue)) {
                return key;
            }
        }

        return null;
    }

    /**
     * RC4 symmetric cipher encryption/decryption
     * https://gist.github.com/farhadi/2185197
     *
     * @param key
     * @param string
     * @returns {string}
     */
    public static rc4 (string: string, key: string) {
        let s: number[] = [],
            j: number = 0,
            x: number,
            result: string = '';

        for (var i = 0; i < 256; i++) {
            s[i] = i;
        }

        for (i = 0; i < 256; i++) {
            j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
        }

        i = 0;
        j = 0;

        for (let y = 0; y < string.length; y++) {
            i = (i + 1) % 256;
            j = (j + s[i]) % 256;
            x = s[i];
            s[i] = s[j];
            s[j] = x;
            result += String.fromCharCode(string.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
        }

        return result;
    }

    /**
     * @param randomGenerator
     */
    public static setRandomGenerator (randomGenerator: Chance.Chance | Chance.SeededChance): void {
        Utils.randomGenerator = randomGenerator;
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
     * @returns {string}
     */
    public static stringToUnicodeEscapeSequence (string: string): string {
        const radix: number = 16;

        let prefix: string,
            regexp: RegExp = new RegExp('[\x00-\x7F]'),
            template: string;

        return `${string.replace(/[\s\S]/g, (escape: string): string => {
            if (regexp.test(escape)) {
                prefix = '\\x';
                template = '0'.repeat(2);
            } else {
                prefix = '\\u';
                template = '0'.repeat(4);
            }

            return `${prefix}${(template + escape.charCodeAt(0).toString(radix)).slice(-template.length)}`;
        })}`;
    }
}
