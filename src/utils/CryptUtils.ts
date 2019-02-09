import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { ICryptUtils } from '../interfaces/utils/ICryptUtils';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { RandomGenerator } from './RandomGenerator';
import { Utils } from './Utils';

@injectable()
export class CryptUtils implements ICryptUtils {
    /**
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator
    ) {
        this.randomGenerator = randomGenerator;
    }

    // tslint:disable
    /**
     * @param {string} string
     * @returns {string}
     */
    public btoa (string: string): string {
        const chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        let output: string = '';

        string = encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, (match, p1) => {
            return String.fromCharCode(parseInt(`${Utils.hexadecimalPrefix}${p1}`));
        });

        for (
            let block: number | undefined, charCode: number, idx: number = 0, map: string = chars;
            string.charAt(idx | 0) || (map = '=', idx % 1);
            output += map.charAt(63 & block >> 8 - idx % 1 * 8)
        ) {
            charCode = string.charCodeAt(idx += 3/4);

            if (charCode > 0xFF) {
                throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            }

            block = <number>block << 8 | charCode;
        }

        return output;
    }
    // tslint:enable

    /**
     * Hides string inside a other random string with larger length
     *
     * @param {string} str
     * @param {number} length
     * @returns {[string , string]}
     */
    public hideString (str: string, length: number): [string, string] {
        const escapeRegExp: (s: string) => string = (s: string) =>
            s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

        const randomMerge: (s1: string, s2: string) => string = (s1: string, s2: string): string => {
            let i1: number = -1;
            let i2: number = -1;
            let result: string = '';

            while (i1 < s1.length || i2 < s2.length) {
                if (this.randomGenerator.getMathRandom() < 0.5 && i2 < s2.length) {
                    result += s2.charAt(++i2);
                } else {
                    result += s1.charAt(++i1);
                }
            }

            return result;
        };

        const randomString: string = this.randomGenerator.getRandomGenerator().string({
            length: length,
            pool: RandomGenerator.randomGeneratorPool
        });

        let randomStringDiff: string = randomString.replace(
            new RegExp(`[${escapeRegExp(str)}]`, 'g'),
            ''
        );

        const randomStringDiffArray: string[] = randomStringDiff.split('');

        this.randomGenerator.getRandomGenerator().shuffle(randomStringDiffArray);
        randomStringDiff = randomStringDiffArray.join('');

        return [randomMerge(str, randomStringDiff), randomStringDiff];
    }

    // tslint:disable
    /**
     * RC4 symmetric cipher encryption/decryption
     * https://gist.github.com/farhadi/2185197
     *
     * @param {string} string
     * @param {string} key
     * @returns {string}
     */
    public rc4 (string: string, key: string): string {
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
    // tslint:enable

    // tslint:disable
    /**
     * Encode utf8 multibyte characters
     * https://gist.github.com/revolunet/843889#gistcomment-2795911
     *
     * @param {string} s
     * @returns {string}
     */
    public encode_utf8(s: string) {
        return encodeURIComponent(s).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match: string, p1: string) {
                return String.fromCharCode(('0x' + p1) as unknown as number);
            });
    }
    // tslint:enable

    // tslint:disable
    /**
     * LZW Encoding/decoding
     * https://gist.github.com/revolunet/843889#gistcomment-2795911
     *
     * @param {string} s
     * @returns {string}
     */
    public lzw_encode(s: string): string {
        if (!s) return s;
        const dict: Map<string,number> = new Map();
        const data: string[] = s.toString().split("");
        const out: number[] = [];
        let phrase: string = data[0];
        let charCode: number = 256;
        for (let i: number = 1; i < data.length; i++) {
            const currChar: string = data[i];
            if (dict.has(phrase + currChar)) {
                phrase += currChar;
            } else {
                out.push(phrase.length > 1 ? (dict.get(phrase) as number) : phrase.charCodeAt(0));
                dict.set(phrase + currChar, charCode);
                charCode++;
                phrase = currChar;
            }
        }
        out.push(phrase.length > 1 ? (dict.get(phrase) as number) : phrase.charCodeAt(0));
        return out.map((code: number)=>{
            return String.fromCharCode(code);
        }).join("");
    }
    // tslint:enable
}
