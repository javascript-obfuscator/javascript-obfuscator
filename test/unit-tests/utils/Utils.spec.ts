import { assert } from 'chai';

import { JSFuck } from '../../../src/enums/JSFuck';

import { Utils } from '../../../src/utils/Utils';

describe('Utils', () => {
    describe('decToHex (dec: number): string', () => {
        describe('Variant #1: number `0`', () => {
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

        describe('Variant #2: number `10`', () => {
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

        describe('Variant #3: number `17`', () => {
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

        describe('Variant #4: number `536870912`', () => {
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
        describe('Variant #1: simple url', () => {
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

        describe('Variant #2: url with `www` part', () => {
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

        describe('Variant #3: url with `https` protocol and port', () => {
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

        describe('Variant #4: protocol-wide url and route', () => {
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

        describe('Variant #5: protocol-wide url, `localhost` and port', () => {
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
});
