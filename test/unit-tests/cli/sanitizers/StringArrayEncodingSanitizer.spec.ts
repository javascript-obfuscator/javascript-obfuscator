import { assert } from 'chai';

import { TStringArrayEncoding } from '../../../../src/types/options/TStringArrayEncoding';

import { StringArrayEncoding } from '../../../../src/enums/StringArrayEncoding';

import { StringArrayEncodingSanitizer } from '../../../../src/cli/sanitizers/StringArrayEncodingSanitizer';

describe('StringArrayEncodingSanitizer', () => {
    describe('Variant #1: string array encoding `base64`', () => {
        const inputValue: string = 'base64';
        const expectedValue: TStringArrayEncoding = true;

        let value: TStringArrayEncoding;

        before(() => {
            value = StringArrayEncodingSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #2: string array encoding `true`', () => {
        const inputValue: string = 'true';
        const expectedValue: TStringArrayEncoding = true;

        let value: TStringArrayEncoding;

        before(() => {
            value = StringArrayEncodingSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #3: string array encoding `1`', () => {
        const inputValue: string = '1';
        const expectedValue: TStringArrayEncoding = true;

        let value: TStringArrayEncoding;

        before(() => {
            value = StringArrayEncodingSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #4: string array encoding `rc4`', () => {
        const inputValue: string = 'rc4';
        const expectedValue: TStringArrayEncoding = StringArrayEncoding.Rc4;

        let value: TStringArrayEncoding;

        before(() => {
            value = StringArrayEncodingSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #5: string array encoding `foo`', () => {
        const inputValue: string = 'foo';
        const expectedValue: TStringArrayEncoding = false;

        let value: TStringArrayEncoding;

        before(() => {
            value = StringArrayEncodingSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });
});
