import { assert } from 'chai';

import { CryptUtils } from '../../../../src/utils/CryptUtils';

describe('CryptUtils', () => {
    describe('btoa (string: string): string', () => {
        const expectedString: string = 'c3RyaW5n';

        let string: string;

        before(() => {
            string = CryptUtils.btoa('string');
        });

        it('should create a base-64 encoded string from a given string', () => {
            assert.equal(string, expectedString);
        });
    });

    describe('hideString (str: string, length: number): [string, string]', () => {
        const originalString: string = 'example.com';
        const hiddenStringLength: number = 30;

        let hiddenString: string,
            diffString: string;

        before(() => {
            [hiddenString, diffString] = CryptUtils.hideString(originalString, hiddenStringLength);
        });

        describe('hidden string length check', () => {
            let originalStringActualLength: number,
                hiddenStringActualLength: number;

            before(() => {
                originalStringActualLength = originalString.length;
                hiddenStringActualLength = hiddenString.length;
            });

            it('should create hidden string with length equal or bigger than given length', () => {
                assert.isTrue(hiddenStringActualLength > originalStringActualLength);
            });
        });

        describe('hidden string content', () => {
            let hiddenStringWithoutDiff: string;

            before(() => {
                const regExp: RegExp = new RegExp(`[${diffString}]`, 'g');

                hiddenStringWithoutDiff = hiddenString.replace(regExp, '');
            });

            it('should return a hidden string with the original string within', () => {
                assert.equal(hiddenStringWithoutDiff, originalString);
            });
        });
    });

    describe('rc4 (string: string, key: string): string', () => {
        const string: string = 'test';
        const key: string = 'key';

        let encodedString: string,
            decodedString: string;

        before(() => {
            encodedString = CryptUtils.rc4(string, key);
            decodedString = CryptUtils.rc4(encodedString, key);
        });

        it('should encode string using the rc4 algorithm', () => {
            assert.notEqual(encodedString, string);
        });

        it('should encode and successfully decode string using the rc4 algorithm', () => {
            assert.equal(decodedString, string);
        });
    });
});
