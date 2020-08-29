import { assert } from 'chai';

import { OptionsPresetSanitizer } from '../../../../src/cli/sanitizers/OptionsPresetSanitizer';

describe('OptionsPresetSanitizer', () => {
    describe('Variant #1: valid options preset', () => {
        const inputValue: string = 'low-obfuscation';
        const expectedValue: string = inputValue;

        let value: string;

        before(() => {
            value = OptionsPresetSanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.equal(value, expectedValue);
        });
    });

    describe('Variant #2: invalid options preset', () => {
        const inputValue: string = 'foo';

        let testFunc: () => void;

        before(() => {
            testFunc = () => OptionsPresetSanitizer(inputValue);
        });

        it('should throw error', () => {
            assert.throw(testFunc, ReferenceError);
        });
    });
});
