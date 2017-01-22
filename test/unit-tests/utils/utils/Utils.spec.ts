import { assert } from 'chai';

import { Utils } from '../../../../src/utils/Utils';

import { JSFuck } from '../../../../src/enums/JSFuck';

describe('Utils', () => {
    describe('arrayRange (length: number): number[]', () => {
        it('should return array with range of numbers', () => {
            assert.deepEqual(Utils.arrayRange(5), [0, 1, 2, 3, 4]);
        });


        it('should return empty array if length is 0', () => {
            assert.deepEqual(Utils.arrayRange(0), []);
        });

        it('should return empty array if length less then 0', () => {
            assert.deepEqual(Utils.arrayRange(-5), []);
        });
    });

    describe('arrayRotate <T> (array: T[], times: number): T[]', () => {
        let array: number[];

        beforeEach(() => {
            array = [1, 2, 3, 4, 5, 6];
        });

        it('should rotate (shift) array by a given value', () => {
            assert.deepEqual(Utils.arrayRotate(array, 2), [5, 6, 1, 2, 3, 4]);
        });


        it('should do nothing if value <= 0', () => {
            assert.deepEqual(Utils.arrayRotate(array, 0), [1, 2, 3, 4, 5, 6]);
            assert.deepEqual(Utils.arrayRotate(array, -1), [1, 2, 3, 4, 5, 6]);
        });

        it('should throw exception if array is empty', () => {
            assert.throws(() => Utils.arrayRotate([], 5), ReferenceError);
        });
    });

    describe('decToHex (dec: number): string', () => {
        it('should creates a string with hexadecimal value from a given decimal number', () => {
            assert.equal(Utils.decToHex(0), '0');
            assert.equal(Utils.decToHex(10), 'a');
            assert.equal(Utils.decToHex(17), '11');
            assert.equal(Utils.decToHex(536870912), '20000000');
        });
    });

    describe('extractDomainFromUrl (url: string): string', () => {
        it('should extract domain from the given URL', () => {
            assert.equal(Utils.extractDomainFromUrl('http://google.ru'), 'google.ru');
            assert.equal(Utils.extractDomainFromUrl('http://www.google.ru'), 'www.google.ru');
            assert.equal(Utils.extractDomainFromUrl('https://www.google.ru:9000'), 'www.google.ru');
            assert.equal(Utils.extractDomainFromUrl('//google.ru/abc'), 'google.ru');
            assert.equal(Utils.extractDomainFromUrl('//localhost:9000'), 'localhost');
        });
    });

    describe('isCeilNumber (number: number): boolean', () => {
        it('should return true if given number is a ceil', () => {
            assert.equal(Utils.isCeilNumber(4), true);
            assert.equal(Utils.isCeilNumber(4.5), false);
        });
    });

    describe('stringRotate (string: string, times: number): string', () => {
        let string: string;

        beforeEach(() => {
            string = 'abcdefg';
        });

        it('should rotate string by a given value', () => {
            assert.deepEqual(Utils.stringRotate(string, 2), 'fgabcde');
        });


        it('should do nothing if value <= 0', () => {
            assert.deepEqual(Utils.stringRotate(string, 0), 'abcdefg');
            assert.deepEqual(Utils.stringRotate(string, -1), 'abcdefg');
        });

        it('should throw exception if string is empty', () => {
            assert.throws(() => Utils.stringRotate('', 5), ReferenceError);
        });
    });

    describe('stringToJSFuck (string: string): string', () => {
        let expected: string = `${JSFuck.s} + ${JSFuck.t} + ${JSFuck.r} + ${JSFuck.i} + ${JSFuck.n} + ${JSFuck.g}`;

        it('should creates a JSFuck encoded string from a given string', () => {
            assert.equal(Utils.stringToJSFuck('string'), expected);
        });
    });

    describe('stringToUnicodeEscapeSequence (string: string, nonLatinAndNonDigitsOnly: boolean = false): string', () => {
        const expected1: string = '\\x73\\x74\\x72\\x69\\x6e\\x67';
        const expected2: string = 'abc\\x21\\u0434\\u0435';

        it('should return a unicode escape sequence based on a given string', () => {
            assert.equal(Utils.stringToUnicodeEscapeSequence('string'), expected1);
        });

        it('should return a string where only non-digits and non-latin letters are escaped', () => {
            assert.equal(Utils.stringToUnicodeEscapeSequence('abc!де', true), expected2);
        });
    });
});
