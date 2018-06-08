import { assert } from 'chai';

import { ObfuscationTargetSanitizer } from '../../../../src/cli/sanitizers/ObfuscatingTargetSanitizer';

describe('ObfuscationTargetSanitizer', () => {
    describe('Variant #1: valid obfuscation target', () => {
        const inputValue: string = 'browser';
        const expectedValue: string = inputValue;

        let value: string;

        before(() => {
            value = ObfuscationTargetSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #2: invalid obfuscation target', () => {
        const inputValue: string = 'foo';

        let testFunc: () => void;

        before(() => {
            testFunc = () => ObfuscationTargetSanitizer(inputValue);
        });

        it('should throw error', () => {
            assert.throw(testFunc, ReferenceError);
        });
    });
});
