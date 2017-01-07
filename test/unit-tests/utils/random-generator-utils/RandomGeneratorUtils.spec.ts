import { assert } from 'chai';

import { RandomGeneratorUtils } from '../../../../src/utils/RandomGeneratorUtils';

describe('RandomGeneratorUtils', () => {
    describe('getRandomVariableName (length: number = 6): string', () => {
        it('should return a string of given length with random variable name', () => {
            assert.match(RandomGeneratorUtils.getRandomVariableName(4, true, false), /^_0x(\w){4}$/);
            assert.match(RandomGeneratorUtils.getRandomVariableName(6, true, true), /^_0x(\w){4,6}$/);
        });
    });
});
