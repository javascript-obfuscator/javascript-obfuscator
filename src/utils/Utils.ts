import { JSFuck } from '../enums/JSFuck';

export class Utils {
    /**
     * @type {string}
     */
    public static readonly hexadecimalPrefix: string = '0x';

    /**
     * @param {number} dec
     * @returns {string}
     */
    public static decToHex (dec: number): string {
        const radix: number = 16;

        return dec.toString(radix);
    }

    /**
     * @param {string} url
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
     * @param {number} number
     * @returns {boolean}
     */
    public static isCeilNumber (number: number): boolean {
        return number % 1 === 0;
    }

    /**
     * @param {string} string
     * @param {number} times
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
     * @param {string} string
     * @returns {string}
     */
    public static stringToJSFuck (string: string): string {
        return Array
            .from(string)
            .map((character: string): string => {
                return JSFuck[<keyof typeof JSFuck>character] || character;
            })
            .join(' + ');
    }
}
