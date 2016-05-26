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
        return (dec + Math.pow(16, 6)).toString(16).substr(-6).replace(Utils.hexRepetitiveZerosRegExp, '');
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
        return `'${string.replace(/[\s\S]/g, (escape) => {
            return `\\u${('0000' + escape.charCodeAt(0).toString(16)).slice(-4)}`;
        })}'`;
    }
}
Utils.hexRepetitiveZerosRegExp = new RegExp('^(0{2,})+(?!$)', '');
exports.Utils = Utils;
