import { Chance } from 'chance';

import { JSFuck } from './enums/JSFuck';

export class Utils {
    /**
     * @type {Chance.Chance}
     */
    private static randomGenerator: Chance.Chance = new Chance();

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
     * @param encode
     */
    public static btoa (string: string, encode: boolean = true): string {
        return new Buffer(
            encode ? encodeURI(string) : string
        ).toString('base64');
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
     * @returns {Chance.Chance}
     */
    public static getRandomGenerator (): Chance.Chance {
        return Utils.randomGenerator;
    }

    /**
     * @param length
     * @returns any
     */
    public static getRandomVariableName (length: number = 6): string {
        const rangeMinInteger: number = 10000,
            rangeMaxInteger: number = 99999999,
            prefix: string = '_0x';

        return `${prefix}${(
            Utils.decToHex(
                Utils.getRandomGenerator().integer({
                    min: rangeMinInteger,
                    max: rangeMaxInteger
                })
            )
        ).substr(0, length)}`;
    }

    /**
     * @param length
     * @param charSet
     * @returns string
     */
    public static hideString(str: string, length: number): [string, string] {

      // from http://stackoverflow.com/a/3561711
      const escapeRegExp = (s: string) =>
        s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

      const randomMerge = function (s1: string, s2: string): string {
        let i1 = -1, i2 = -1, result = '';
        while (i1 < s1.length || i2 < s2.length) {
          if (Math.random() < 0.5 && i2 < s2.length) {
            result += s2.charAt(++i2);
          } else {
            result += s1.charAt(++i1);
          }
        }
        return result;
      }

      // here we need a custom pool parameter because the default on from Change.string
      // can return chars that break the RegExp
      const customPool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let randomString = Utils.randomGenerator.string({length: length, pool: customPool});

      let randomStringDiff = randomString.replace(
                              new RegExp('[' + escapeRegExp(str) + ']', 'g'),
                              '');

      let randomStringDiffArray = randomStringDiff.split('');
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
    public static stringToUnicode (string: string): string {
        const radix: number = 16;

        let prefix: string,
            regexp: RegExp = new RegExp('[\x00-\x7F]'),
            template: string;

        return `'${string.replace(/[\s\S]/g, (escape: string): string => {
            if (regexp.test(escape)) {
                prefix = '\\x';
                template = '0'.repeat(2);
            } else {
                prefix = '\\u';
                template = '0'.repeat(4);
            }

            return `${prefix}${(template + escape.charCodeAt(0).toString(radix)).slice(-template.length)}`;
        })}'`;
    }
}
