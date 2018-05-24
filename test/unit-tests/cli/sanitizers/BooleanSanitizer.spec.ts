import { assert } from 'chai';

import { BooleanSanitizer } from '../../../../src/cli/sanitizers/BooleanSanitizer';


describe('BooleanSanitizer', () => {
    describe('Variant #1: input value `true`', () => {
        const inputValue: string = 'true';
        const expectedValue: boolean = true;

        let value: boolean;

        before(() => {
            value = BooleanSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #2: input value `1`', () => {
        const inputValue: string = '1';
        const expectedValue: boolean = true;

        let value: boolean;

        before(() => {
            value = BooleanSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #3: input value `false`', () => {
        const inputValue: string = 'false';
        const expectedValue: boolean = false;

        let value: boolean;

        before(() => {
            value = BooleanSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #4: input value `foo`', () => {
        const inputValue: string = 'foo';
        const expectedValue: boolean = false;

        let value: boolean;

        before(() => {
            value = BooleanSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });
});
