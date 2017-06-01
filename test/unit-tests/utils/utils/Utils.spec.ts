import { assert } from 'chai';

import { Utils } from '../../../../src/utils/Utils';

import { JSFuck } from '../../../../src/enums/JSFuck';

describe('Utils', () => {
    describe('arrayRange (length: number): number[]', () => {
        describe('range length more than 0', () => {
            const rangeLength: number = 5;
            const expectedArray: number[] = [0, 1, 2, 3, 4];

            let array: number[];

            before(() => {
                array = Utils.arrayRange(rangeLength);
            });

            it('should return array with range of numbers', () => {
                assert.deepEqual(array, expectedArray);
            });
        });

        describe('range length is 0', () => {
            const rangeLength: number = 0;
            const expectedArray: number[] = [];

            let array: number[];

            before(() => {
                array = Utils.arrayRange(rangeLength);
            });

            it('should return empty array', () => {
                assert.deepEqual(array, expectedArray);
            });
        });

        describe('range length less than 0', () => {
            const rangeLength: number = -5;
            const expectedArray: number[] = [];

            let array: number[];

            before(() => {
                array = Utils.arrayRange(rangeLength);
            });

            it('should return empty array', () => {
                assert.deepEqual(array, expectedArray);
            });
        });
    });

    describe('arrayRotate <T> (array: T[], times: number): T[]', () => {
        let array: number[],
            rotatedArray: number[];

        beforeEach(() => {
            array = [1, 2, 3, 4, 5, 6];
        });

        describe('value is not 0', () => {
            const rotateValue: number = 2;
            const expectedArray: number[] = [5, 6, 1, 2, 3, 4];

            beforeEach(() => {
                rotatedArray = Utils.arrayRotate(array, rotateValue);
            });

            it('should rotate (shift) array by a given value', () => {
                assert.deepEqual(rotatedArray, expectedArray);
            });
        });

        describe('value equals or less 0', () => {
            const rotateValue: number = 0;
            const expectedArray: number[] = [1, 2, 3, 4, 5, 6];

            beforeEach(() => {
                rotatedArray = Utils.arrayRotate(array, rotateValue);
            });

            it('shouldn\'t rotate array', () => {
                assert.deepEqual(rotatedArray, expectedArray);
            });
        });

        describe('empty array', () => {
            const emptyArray: number[] = [];
            const rotateValue: number = 5;
            const expectedError: ReferenceErrorConstructor = ReferenceError;

            let testFunc: () => void;

            beforeEach(() => {
                testFunc = () => Utils.arrayRotate(emptyArray, rotateValue);
            });

            it('should throw exception if array is empty', () => {
                assert.throws(testFunc, expectedError);
            });
        });
    });

    describe('decToHex (dec: number): string', () => {
        describe('variant #1: number `0`', () => {
            const number: number = 0;
            const expectedHexString = '0';

            let hexString: string;

            before(() => {
                hexString = Utils.decToHex(number);
            });

            it('should create a string with hexadecimal value from a given decimal number', () => {
                assert.equal(hexString, expectedHexString);
            });
        });

        describe('variant #2: number `10`', () => {
            const number: number = 10;
            const expectedHexString = 'a';

            let hexString: string;

            before(() => {
                hexString = Utils.decToHex(number);
            });

            it('should create a string with hexadecimal value from a given decimal number', () => {
                assert.equal(hexString, expectedHexString);
            });
        });

        describe('variant #3: number `17`', () => {
            const number: number = 17;
            const expectedHexString = '11';

            let hexString: string;

            before(() => {
                hexString = Utils.decToHex(number);
            });

            it('should create a string with hexadecimal value from a given decimal number', () => {
                assert.equal(hexString, expectedHexString);
            });
        });

        describe('variant #4: number `536870912`', () => {
            const number: number = 536870912;
            const expectedHexString = '20000000';

            let hexString: string;

            before(() => {
                hexString = Utils.decToHex(number);
            });

            it('should create a string with hexadecimal value from a given decimal number', () => {
                assert.equal(hexString, expectedHexString);
            });
        });
    });

    describe('extractDomainFromUrl (url: string): string', () => {
        describe('variant #1: simple url', () => {
            const url: string = 'http://google.ru';
            const expectedDomain: string = 'google.ru';

            let domain: string;

            before(() => {
                domain = Utils.extractDomainFromUrl(url);
            });

            it('should extract domain from the given URL', () => {
                assert.equal(domain, expectedDomain);
            });
        });

        describe('variant #2: url with `www` part', () => {
            const url: string = 'http://www.google.ru';
            const expectedDomain: string = 'www.google.ru';

            let domain: string;

            before(() => {
                domain = Utils.extractDomainFromUrl(url);
            });

            it('should extract domain from the given URL', () => {
                assert.equal(domain, expectedDomain);
            });
        });

        describe('variant #3: url with `https` protocol and port', () => {
            const url: string = 'https://www.google.ru:9000';
            const expectedDomain: string = 'www.google.ru';

            let domain: string;

            before(() => {
                domain = Utils.extractDomainFromUrl(url);
            });

            it('should extract domain from the given URL', () => {
                assert.equal(domain, expectedDomain);
            });
        });

        describe('variant #4: protocol-wide url and route', () => {
            const url: string = '//google.ru/abc';
            const expectedDomain: string = 'google.ru';

            let domain: string;

            before(() => {
                domain = Utils.extractDomainFromUrl(url);
            });

            it('should extract domain from the given URL', () => {
                assert.equal(domain, expectedDomain);
            });
        });

        describe('variant #5: protocol-wide url, `localhost` and port', () => {
            const url: string = '//localhost:9000';
            const expectedDomain: string = 'localhost';

            let domain: string;

            before(() => {
                domain = Utils.extractDomainFromUrl(url);
            });

            it('should extract domain from the given URL', () => {
                assert.equal(domain, expectedDomain);
            });
        });
    });

    describe('isCeilNumber (number: number): boolean', () => {
        describe('given number is a ceil', () => {
            const number: number = 4;
            const expectedResult: boolean = true;

            let result: boolean;

            before(() => {
                result = Utils.isCeilNumber(number);
            });

            it('should return true', () => {
                assert.equal(result, expectedResult);
            });
        });

        describe('given number is a float', () => {
            const number: number = 4.5;
            const expectedResult: boolean = false;

            let result: boolean;

            before(() => {
                result = Utils.isCeilNumber(number);
            });

            it('should return false', () => {
                assert.equal(result, expectedResult);
            });
        });
    });

    describe('stringRotate (string: string, times: number): string', () => {
        const string: string = 'abcdefg';

        let rotatedString: string;

        describe('value is not 0', () => {
            const rotateValue: number = 2;
            const expectedString: string = 'fgabcde';

            before(() => {
                rotatedString = Utils.stringRotate(string, rotateValue);
            });

            it('should rotate string by a given value', () => {
                assert.deepEqual(rotatedString, expectedString);
            });
        });

        describe('value equals or less 0', () => {
            const rotateValue: number = 0;
            const expectedString: string = 'abcdefg';

            before(() => {
                rotatedString = Utils.stringRotate(string, rotateValue);
            });

            it('shouldn\'t rotate string', () => {
                assert.deepEqual(rotatedString, expectedString);
            });
        });

        describe('empty array', () => {
            const emptyString: string = '';
            const rotateValue: number = 5;
            const expectedError: ReferenceErrorConstructor = ReferenceError;

            let testFunc: () => void ;

            before(() => {
                testFunc = () => Utils.stringRotate(emptyString, rotateValue);
            });

            it('should throw exception if string is empty', () => {
                assert.throws(testFunc, expectedError);
            });
        });
    });

    describe('stringToJSFuck (string: string): string', () => {
        const string: string = 'string';
        const expectedString: string = `${JSFuck.s} + ${JSFuck.t} + ${JSFuck.r} + ${JSFuck.i} + ${JSFuck.n} + ${JSFuck.g}`;

        let actualString: string;

        before(() => {
            actualString = Utils.stringToJSFuck(string);
        });

        it('should create a JSFuck encoded string from a given string', () => {
            assert.equal(actualString, expectedString);
        });
    });

    describe('stringToUnicodeEscapeSequence (string: string, nonLatinAndNonDigitsOnly: boolean = false): string', () => {
        describe('variant #1: default', () => {
            const string: string = 'string';
            const expectedString: string = '\\x73\\x74\\x72\\x69\\x6e\\x67';

            let actualString: string;

            before(() => {
                actualString = Utils.stringToUnicodeEscapeSequence(string);
            });

            it('should return a unicode escape sequence based on a given string', () => {
                assert.equal(actualString, expectedString);
            });
        });

        describe('variant #2: escape non-digits and non-latin letters', () => {
            const string: string = 'abc!де';
            const expectedString: string = 'abc\\x21\\u0434\\u0435';

            let actualString: string;

            before(() => {
                actualString = Utils.stringToUnicodeEscapeSequence(string, true);
            });

            it('should return a string where only non-digits and non-latin letters are escaped', () => {
                assert.equal(actualString, expectedString);
            });
        });
    });
});
