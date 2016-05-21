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
     * @returns any[]
     */
    public static arrayRotate (array: any[], times: number, reverse: boolean = false): any[] {
        if (times < 0) {
            return;
        }

        let newArray: any[] = array,
            temp: any;

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
        return (dec + Math.pow(16, 6)).toString(16).substr(-6).replace(Utils.hexRepetitiveZerosRegExp, '');
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
        return `'${string.replace(/[\s\S]/g, (escape: string): string => {
            return `\\u${('0000' + escape.charCodeAt(0).toString(16)).slice(-4)}`;
        })}'`;
    }
}
