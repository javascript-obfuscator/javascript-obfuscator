import { assert } from 'chai';

import { ArraySanitizer } from '../../../../src/cli/sanitizers/ArraySanitizer';

describe('ArraySanitizer', () => {
    describe('Variant #1: input value `foo`', () => {
        const inputValue: string = 'foo';
        const expectedValue: string[] = ['foo'];

        let value: string[];

        before(() => {
            value = ArraySanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.deepEqual(value, expectedValue);
        });
    });

    describe('Variant #2: input value `foo, bar`', () => {
        const inputValue: string = 'foo, bar';
        const expectedValue: string[] = ['foo', 'bar'];

        let value: string[];

        before(() => {
            value = ArraySanitizer(inputValue);
        });

        it('should sanitize value', () => {
            assert.deepEqual(value, expectedValue);
        });
    });

    describe('Variant #3: input value `foo,`', () => {
        const inputValue: string = 'foo,';

        const testFunc: () => void = () => {
            ArraySanitizer(inputValue);
        };

        it('should sanitize value', () => {
            assert.throw(testFunc, SyntaxError);
        });
    });
});
