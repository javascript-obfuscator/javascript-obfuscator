export class Utils {
    /**
     * @type {RegExp}
     */
    private static hexRepetitiveZerosRegExp: RegExp = new RegExp('^(0{2,})+(?!$)', '');

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
     * @param reverse
     * @returns {T[]}
     */
    public static arrayRotate <T> (array: T[], times: number, reverse: boolean = false): T[] {
        if (times < 0) {
            return;
        }

        let newArray: T[] = array,
            temp: T;

        while (times--) {
            if (!reverse) {
                temp = newArray.pop();
                newArray.unshift(temp);
            } else {
                temp = newArray.shift();
                newArray.push(temp);
            }
        }

        return newArray;
    }

    /**
     * @param dec
     * @returns {string}
     */
    public static decToHex(dec: number): string {
        const decToHexSliceValue: number = -6,
            exponent: number = 6,
            radix: number = 16;

        return (dec + Math.pow(radix, exponent))
            .toString(radix)
            .substr(decToHexSliceValue)
            .replace(Utils.hexRepetitiveZerosRegExp, '');
    }

    /**
     * @param min
     * @param max
     * @returns {number}
     */
    public static getRandomInteger(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * @param length
     * @returns any
     */
    public static getRandomVariableName (length: number = 6): string {
        const rangeMinInteger: number = 10000,
            rangeMaxInteger: number = 99999999,
            prefix: string = '_0x';

        return `${prefix}${(Utils.decToHex(Utils.getRandomInteger(rangeMinInteger, rangeMaxInteger))).substr(0, length)}`;
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
    public static stringToUnicode (string: string): string {
        const radix: number = 16,
            unicodeSliceValue: number = -4;

        let regexp: RegExp = new RegExp('[\x00-\x7F]');

        return `'${string.replace(/[\s\S]/g, (escape: string): string => {
            if (regexp.test(escape)) {
                return '\\x' + escape.charCodeAt(0).toString(radix);
            }

            return `\\u${('0000' + escape.charCodeAt(0).toString(radix)).slice(unicodeSliceValue)}`;
        })}'`;
    }
}
