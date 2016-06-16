import { Utils } from '../src/Utils';

import { JSFuck } from '../src/enums/JSFuck';

let assert: any = require('chai').assert;

describe('Utils', () => {
    describe('arrayContains ()', () => {
        it('should return boolean depends on condition if array is contains given value or not', () => {
            assert.equal(Utils.arrayContains(['1', '2', '3'], '2'), true);
            assert.equal(Utils.arrayContains([1, 2, 3], 2), true);
            assert.equal(Utils.arrayContains([1, 2, 3], 4), false);
        });
    });

    describe('arrayRotate ()', () => {
        let array: number[];

        beforeEach(() => {
            array = [1, 2, 3, 4, 5, 6];
        });

        it('should rotate (shift) array by a given value', () => {
            assert.deepEqual(Utils.arrayRotate(array, 2), [5, 6, 1, 2, 3, 4]);
        });

        it('should rotate (shift) array by a given value in reverse directions', () => {
            assert.deepEqual(Utils.arrayRotate(array, 2, true), [3, 4, 5, 6, 1, 2]);
        });
    });

    describe('btoa ()', () => {
        it('should creates a base-64 encoded string from a given string', () => {
            assert.equal(Utils.btoa('string'), 'c3RyaW5n');
        });
    });

    describe('decToHex ()', () => {
        it('should creates a string with hexadecimal value from a given decimal number', () => {
            assert.equal(Utils.decToHex(0), '0');
            assert.equal(Utils.decToHex(10), 'a');
            assert.equal(Utils.decToHex(17), '11');
        });
    });

    describe('getRandomInteger ()', () => {
        let values: number[] = [],
            randomValue: number;

        beforeEach(() => {
            for (let i = 0; i < 200; i++) {
                randomValue = Utils.getRandomInteger(0, 100);

                if (values.indexOf(randomValue) === -1) {
                    values.push(randomValue);
                }
            }

            values.sort((a, b) => {
                return a - b;
            });
        });

        it('should return a random integer between two ranges', () => {
            assert.isAtLeast(values[0], 0);
            assert.isAtMost(values[values.length - 1], 100);
        });
    });

    describe('getRandomVariableName ()', () => {
        it('should return a string of given length with random variable name', () => {
            assert.match(Utils.getRandomVariableName(4), /^_0x(\w){4}$/);
            assert.match(Utils.getRandomVariableName(6), /^_0x(\w){6}$/);
        });
    });

    describe('isInteger ()', () => {
        it('should return true if given number or string is integer', () => {
            assert.equal(Utils.isInteger(4), true);
            assert.equal(Utils.isInteger(<any>'4'), true);
            assert.equal(Utils.isInteger(<any>'a'), false);
        });
    });

    describe('stringToJSFuck ()', () => {
        let expected: string = `${JSFuck.s} + ${JSFuck.t} + ${JSFuck.r} + ${JSFuck.i} + ${JSFuck.n} + ${JSFuck.g}`;

        it('should creates a JSFuck encoded string from a given string', () => {
            assert.equal(Utils.stringToJSFuck('string'), expected);
        });
    });

    describe('stringToUnicode ()', () => {
        let expected: string = `'\\x73\\x74\\x72\\x69\\x6e\\x67'`;

        it('should return a unicode encoded string from a given string', () => {
            assert.equal(Utils.stringToUnicode('string'), expected);
        });
    });
});