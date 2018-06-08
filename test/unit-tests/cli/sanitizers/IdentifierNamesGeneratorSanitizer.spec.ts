import { assert } from 'chai';

import { IdentifierNamesGeneratorSanitizer } from '../../../../src/cli/sanitizers/IdentifierNamesGeneratorSanitizer';

describe('IdentifierNamesGeneratorSanitizer', () => {
    describe('Variant #1: valid identifier names generator', () => {
        const inputValue: string = 'mangled';
        const expectedValue: string = inputValue;

        let value: string;

        before(() => {
            value = IdentifierNamesGeneratorSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #2: invalid identifier names generator', () => {
        const inputValue: string = 'foo';

        let testFunc: () => void;

        before(() => {
            testFunc = () => IdentifierNamesGeneratorSanitizer(inputValue);
        });

        it('should throw error', () => {
            assert.throw(testFunc, ReferenceError);
        });
    });
});
