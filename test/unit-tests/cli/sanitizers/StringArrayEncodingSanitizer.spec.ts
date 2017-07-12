import { assert } from 'chai';

import { StringArrayEncodingSanitizer } from '../../../../src/cli/sanitizers/StringArrayEncodingSanitizer';

describe('StringArrayEncodingSanitizer', () => {
    describe('StringArrayEncodingSanitizer: TCLISanitizer = (value: string): TStringArrayEncoding', () => {
        describe('variant #1: string array encoding `base64`', () => {
            const inputValue: string = 'base64';
            const expectedValue: boolean = true;

            let value: boolean;

            before(() => {
                value = StringArrayEncodingSanitizer(inputValue);
            });

            it('should sanitize value', () => {
                assert.equal(value, expectedValue);
            });
        });

        describe('variant #2: string array encoding `true`', () => {
            const inputValue: string = 'true';
            const expectedValue: boolean = true;

            let value: boolean;

            before(() => {
                value = StringArrayEncodingSanitizer(inputValue);
            });

            it('should sanitize value', () => {
                assert.equal(value, expectedValue);
            });
        });

        describe('variant #3: string array encoding `1`', () => {
            const inputValue: string = '1';
            const expectedValue: boolean = true;

            let value: boolean;

            before(() => {
                value = StringArrayEncodingSanitizer(inputValue);
            });

            it('should sanitize value', () => {
                assert.equal(value, expectedValue);
            });
        });

        describe('variant #4: string array encoding `rc4`', () => {
            const inputValue: string = 'rc4';
            const expectedValue: string = 'rc4';

            let value: string;

            before(() => {
                value = StringArrayEncodingSanitizer(inputValue);
            });

            it('should sanitize value', () => {
                assert.equal(value, expectedValue);
            });
        });

        describe('variant #5: string array encoding `foo`', () => {
            const inputValue: string = 'foo';
            const expectedValue: boolean = false;

            let value: boolean;

            before(() => {
                value = StringArrayEncodingSanitizer(inputValue);
            });

            it('should sanitize value', () => {
                assert.equal(value, expectedValue);
            });
        });
    });
});
