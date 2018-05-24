export class NumberUtils {
    /**
     * @param {number} dec
     * @returns {string}
     */
    public static toHex (dec: number): string {
        const radix: number = 16;

        return dec.toString(radix);
    }

    /**
     * @param {number} number
     * @returns {boolean}
     */
    public static isCeil (number: number): boolean {
        return number % 1 === 0;
    }
}
