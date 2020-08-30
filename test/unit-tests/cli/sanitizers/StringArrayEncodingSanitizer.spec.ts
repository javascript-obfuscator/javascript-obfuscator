import { assert } from 'chai';

import { TStringArrayEncoding } from '../../../../src/types/options/TStringArrayEncoding';

import { StringArrayEncoding } from '../../../../src/enums/StringArrayEncoding';

import { StringArrayEncodingSanitizer } from '../../../../src/cli/sanitizers/StringArrayEncodingSanitizer';

describe('StringArrayEncodingSanitizer', () => {
    describe('Variant #1: string array encoding `base64`', () => {
        const inputValue: string = 'base64';
        const expectedValue: TStringArrayEncoding[] = [StringArrayEncoding.Base64];

        let value: TStringArrayEncoding[];

        before(() => {
            value = StringArrayEncodingSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.deepEqual(value, expectedValue);
        });
    });

    describe('Variant #2: string array encoding `base64, rc4`', () => {
        const inputValue: string = 'base64,rc4';
        const expectedValue: TStringArrayEncoding[] = [
            StringArrayEncoding.Base64,
            StringArrayEncoding.Rc4
        ];

        let value: TStringArrayEncoding[];

        before(() => {
            value = StringArrayEncodingSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.deepEqual(value, expectedValue);
        });
    });

    describe('Variant #3: string array encoding `foo`', () => {
        const inputValue: string = 'foo';

        let testFunc: () => TStringArrayEncoding[];

        before(() => {
            testFunc = () => StringArrayEncodingSanitizer(inputValue);
        });

        it('should throw an error for invalid encoding', () => {
            assert.throws(testFunc, 'Invalid value');
        });
    });

    describe('Variant #4: string array encoding `base64,foo`', () => {
        const inputValue: string = 'base64,foo';

        let testFunc: () => TStringArrayEncoding[];

        before(() => {
            testFunc = () => StringArrayEncodingSanitizer(inputValue);
        });

        it('should throw an error for invalid encoding', () => {
            assert.throws(testFunc, 'Invalid value');
        });
    });
});
