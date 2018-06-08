import { assert } from 'chai';

import { SourceMapModeSanitizer } from '../../../../src/cli/sanitizers/SourceMapModeSanitizer';

describe('SourceMapModeSanitizer', () => {
    describe('Variant #1: valid source map mode', () => {
        const inputValue: string = 'inline';
        const expectedValue: string = inputValue;

        let value: string;

        before(() => {
            value = SourceMapModeSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #2: invalid source map mode', () => {
        const inputValue: string = 'foo';

        let testFunc: () => void;

        before(() => {
            testFunc = () => SourceMapModeSanitizer(inputValue);
        });

        it('should throw error', () => {
            assert.throw(testFunc, ReferenceError);
        });
    });
});
