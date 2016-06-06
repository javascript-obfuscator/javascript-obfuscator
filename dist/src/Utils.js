"use strict";
const JSFuck_1 = require('./enums/JSFuck');
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
    static btoa(string) {
        return new Buffer(encodeURI(string)).toString('base64');
    }
    static decToHex(dec) {
        const decToHexSliceValue = -6, exponent = 6, radix = 16;
        return (dec + Math.pow(radix, exponent))
            .toString(radix)
            .substr(decToHexSliceValue)
            .replace(Utils.hexRepetitiveZerosRegExp, '');
    }
    static getRandomInteger(min, max) {
        return Math.round(Math.floor(Math.random() * (max - min + 1)) + min);
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
    static stringToJSFuck(string) {
        return Array
            .from(string)
            .map((character) => {
            return JSFuck_1.JSFuck[character] || character;
        })
            .join(' + ');
    }
    static stringToUnicode(string) {
        const radix = 16;
        let prefix, regexp = new RegExp('[\x00-\x7F]'), template;
        return `'${string.replace(/[\s\S]/g, (escape) => {
            if (regexp.test(escape)) {
                prefix = '\\x';
                template = '0'.repeat(2);
            }
            else {
                prefix = '\\u';
                template = '0'.repeat(4);
            }
            return `${prefix}${(template + escape.charCodeAt(0).toString(radix)).slice(-template.length)}`;
        })}'`;
    }
}
Utils.hexRepetitiveZerosRegExp = new RegExp('^(0{2,})+(?!$)', '');
exports.Utils = Utils;
