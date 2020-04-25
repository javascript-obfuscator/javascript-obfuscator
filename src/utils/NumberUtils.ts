import { Utils } from './Utils';

export class NumberUtils {
    /**
     * @param {number} number
     * @returns {string}
     */
    public static toHex (number: number | bigint): string {
        const radix: number = 16;

        const basePart: string = typeof number === 'number'
            ? number.toString(radix)
            : `${number.toString(radix)}n`;

        return `${Utils.hexadecimalPrefix}${basePart}`;
    }

    /**
     * @param {number} number
     * @returns {boolean}
     */
    public static isCeil (number: number | bigint): boolean {
        return typeof number === 'number'
            ? number % 1 === 0
            : true;
    }
}
