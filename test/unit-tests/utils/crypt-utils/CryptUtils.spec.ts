import { assert } from 'chai';

import { CryptUtils } from '../../../../src/utils/CryptUtils';

describe('CryptUtils', () => {
    describe('btoa (string: string): string', () => {
        it('should create a base-64 encoded string from a given string', () => {
            assert.equal(CryptUtils.btoa('string'), 'c3RyaW5n');
        });
    });

    describe('hideString (str: string, length: number): [string, string]', () => {
        let original1: string = 'example.com',
            [str1, diff] = CryptUtils.hideString(original1, 30);

        it('should return a string with the original string within', () => {
            assert.isTrue(str1.length > original1.length);
            assert.equal(str1.replace(new RegExp('[' + diff + ']', 'g'), ''), original1);
        });

    });

    describe('rc4 (string: string, key: string): string', () => {
        it('should encode string using the rc4 algorithm', () => {
            const string: string = 'test';
            const key: string = 'key';

            assert.notEqual(CryptUtils.rc4(string, key), string);
        });

        it('should encode and successfully decode string using the rc4 algorithm', () => {
            const string: string = 'test';
            const key: string = 'key';

            assert.equal(CryptUtils.rc4(CryptUtils.rc4(string, key), key), string);
        });
    });
});
