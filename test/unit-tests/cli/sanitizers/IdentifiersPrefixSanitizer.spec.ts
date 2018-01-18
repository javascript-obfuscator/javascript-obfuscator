import { assert } from 'chai';

import { IdentifiersPrefixSanitizer } from '../../../../src/cli/sanitizers/IdentifiersPrefixSanitizer';

describe('IdentifiersPrefixSanitizer', () => {
    describe('IdentifiersPrefixSanitizer: TCLISanitizer = (value: string): string | boolean', () => {
        describe('variant #1: identifiers prefix `true`', () => {
            const inputValue: string = 'true';
            const expectedValue: boolean = true;

            let value: boolean | string;

            before(() => {
                value = IdentifiersPrefixSanitizer(inputValue);
            });

            it('should sanitize value', () => {
                assert.equal(value, expectedValue);
            });
        });

        describe('variant #2: identifiers prefix `1`', () => {
            const inputValue: string = '1';
            const expectedValue: boolean = true;

            let value: boolean | string;

            before(() => {
                value = IdentifiersPrefixSanitizer(inputValue);
            });

            it('should sanitize value', () => {
                assert.equal(value, expectedValue);
            });
        });

        describe('variant #3: identifiers prefix `false`', () => {
            const inputValue: string = 'false';
            const expectedValue: boolean = false;

            let value: boolean | string;

            before(() => {
                value = IdentifiersPrefixSanitizer(inputValue);
            });

            it('should sanitize value', () => {
                assert.equal(value, expectedValue);
            });
        });

        describe('variant #4: identifiers prefix `0`', () => {
            const inputValue: string = '0';
            const expectedValue: boolean = false;

            let value: boolean | string;

            before(() => {
                value = IdentifiersPrefixSanitizer(inputValue);
            });

            it('should sanitize value', () => {
                assert.equal(value, expectedValue);
            });
        });

        describe('variant #5: string identifiers prefix', () => {
            const inputValue: string = 'foo';
            const expectedValue: string = 'foo';

            let value: boolean | string;

            before(() => {
                value = IdentifiersPrefixSanitizer(inputValue);
            });

            it('should sanitize value', () => {
                assert.equal(value, expectedValue);
            });
        });
    });
});
