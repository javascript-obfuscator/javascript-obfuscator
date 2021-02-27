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
     * @returns {[number, (number | null)]}
     */
    public static extractIntegerAndDecimalParts (number: number): [number, number | null] {
        const integerPart: number = Math.trunc(number);
        const decimalPart: number | null = number !== integerPart
            ? number % 1
            : null;

        return [integerPart, decimalPart];
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

    /**
     * @param {number} number
     * @returns {boolean}
     */
    public static isPositive (number: number): boolean {
        if (isNaN(number)) {
            throw new Error('Given value is NaN');
        }

        if (number > 0) {
            return true;
        }

        if (number < 0) {
            return false;
        }

        if (1 / number === Number.POSITIVE_INFINITY) {
            return true;
        }

        return false;
    }

    /**
     * @param {number} number
     * @returns {boolean}
     */
    public static isUnsafeNumber (number: number): boolean {
        if (isNaN(number)) {
            throw new Error('Given value is NaN');
        }

        return number < Number.MIN_SAFE_INTEGER || number > Number.MAX_SAFE_INTEGER;
    }

    /**
     * Returns all factors of a number
     * Based on https://stackoverflow.com/a/43204663
     *
     * @param {number} number
     * @returns {number[]}
     */
    public static getFactors (number: number): number[] {
        if (number === 0) {
            throw new Error('Invalid number. Allowed only non-zero number');
        }

        number = Math.abs(number);

        // special case for 1
        if (number === 1) {
            return [-number, number];
        }

        const factors: number[] = [];

        const root: number = Math.sqrt(number);
        const isEven: boolean = number % 2 === 0;
        const incrementValue: number = isEven ? 1 : 2;

        for (
            let currentFactor = 1;
            currentFactor <= root;
            currentFactor += incrementValue
        ) {
            if (number % currentFactor !== 0) {
                continue;
            }

            factors.push(...[-currentFactor, currentFactor]);

            const compliment: number = number / currentFactor;

            if (compliment !== currentFactor) {
                factors.push(...[-compliment, compliment]);
            }
        }

        return factors.sort((a: number, b: number) => a - b);
    }
}
