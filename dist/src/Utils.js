"use strict";
class Utils {
    static arrayContains(array, searchElement) {
        return array.indexOf(searchElement) >= 0;
    }
    static arrayRotate(array, times, reverse = false) {
        if (times < 0) {
            return;
        }
        let newArray = array, temp;
        while (times--) {
            if (!reverse) {
                temp = newArray.pop();
                newArray.unshift(temp);
            }
            else {
                temp = newArray.shift();
                newArray.push(temp);
            }
        }
        return newArray;
    }
    static decToHex(dec) {
        const decToHexSliceValue = -6, exponent = 6, radix = 16;
        return (dec + Math.pow(radix, exponent))
            .toString(radix)
            .substr(decToHexSliceValue)
            .replace(Utils.hexRepetitiveZerosRegExp, '');
    }
    static getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    static getRandomVariableName(length = 6) {
        const rangeMinInteger = 10000, rangeMaxInteger = 99999999, prefix = '_0x';
        return `${prefix}${(Utils.decToHex(Utils.getRandomInteger(rangeMinInteger, rangeMaxInteger))).substr(0, length)}`;
    }
    static isInteger(number) {
        return number % 1 === 0;
    }
    static strEnumify(obj) {
        return obj;
    }
    static stringToUnicode(string) {
        const radix = 16, unicodeSliceValue = -4;
        let regexp = new RegExp('[a-zA-Z]');
        return `'${string.replace(/[\s\S]/g, (escape) => {
            if (regexp.test(escape)) {
                return '\\x' + escape.charCodeAt(0).toString(radix);
            }
            return `\\u${('0000' + escape.charCodeAt(0).toString(radix)).slice(unicodeSliceValue)}`;
        })}'`;
    }
}
Utils.hexRepetitiveZerosRegExp = new RegExp('^(0{2,})+(?!$)', '');
exports.Utils = Utils;
