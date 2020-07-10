import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { ICryptUtils } from '../interfaces/utils/ICryptUtils';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { base64alphabet } from '../constants/Base64Alphabet';

import { RandomGenerator } from './RandomGenerator';
import { Utils } from './Utils';

@injectable()
export class CryptUtils implements ICryptUtils {
    /**
     * @type {string}
     */
    protected readonly base64Alphabet: string = base64alphabet;

    /**
     * @type {IRandomGenerator}
     */
    private readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator
    ) {
        this.randomGenerator = randomGenerator;
    }

    /**
     * @param {string} string
     * @returns {string}
     */
    public btoa (string: string): string {
        const chars: string = this.base64Alphabet;

        let output: string = '';

        string = encodeURIComponent(string).replace(/%([0-9A-F]{2})/g, (match: string, p1: string) => {
            return String.fromCharCode(parseInt(`${Utils.hexadecimalPrefix}${p1}`, 16));
        });

        for (
            let block: number | undefined, charCode: number, idx: number = 0, map: string = chars;
            string.charAt(idx | 0) || (map = '=', idx % 1);
            output += map.charAt(63 & block >> 8 - idx % 1 * 8)
        ) {
            charCode = string.charCodeAt(idx += 3/4);

            if (charCode > 0xFF) {
                throw new Error('\'btoa\' failed: The string to be encoded contains characters outside of the Latin1 range.');
            }

            block = <number>block << 8 | charCode;
        }

        return output;
    }

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

    /**
     * RC4 symmetric cipher encryption/decryption
     * https://gist.github.com/farhadi/2185197
     *
     * @param {string} string
     * @param {string} key
     * @returns {string}
     */
    public rc4 (string: string, key: string): string {
        const s: number[] = [];

        let j: number = 0;
        let x: number;
        let result: string = '';

        // eslint-disable-next-line no-var
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
}
