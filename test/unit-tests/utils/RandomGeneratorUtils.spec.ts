import { RandomGeneratorUtils } from '../../../src/utils/RandomGeneratorUtils';

const assert: Chai.AssertStatic = require('chai').assert;

describe('RandomGeneratorUtils', () => {
    describe('getRandomVariableName (length: number = 6): string', () => {
        it('should return a string of given length with random variable name', () => {
            assert.match(RandomGeneratorUtils.getRandomVariableName(4), /^_0x(\w){4}$/);
            assert.match(RandomGeneratorUtils.getRandomVariableName(6), /^_0x(\w){4,6}$/);
        });
    });
});
