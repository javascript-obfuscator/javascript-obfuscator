import { assert } from 'chai';

import { RandomGeneratorUtils } from '../../../../src/utils/RandomGeneratorUtils';

describe('RandomGeneratorUtils', () => {
    describe('getRandomVariableName (length: number = 6): string', () => {
        let randomVariableName: string,
            regExp: RegExp;

        describe('variant #1: string with random variable of length `4`', () => {
            before(() => {
                randomVariableName = RandomGeneratorUtils.getRandomVariableName(4);
                regExp = /^_0x(\w){4}$/;
            });

            it('should return random variable name', () => {
                assert.match(randomVariableName, regExp);
            })
        });

        describe('variant #2: string with random variable of length `6`', () => {
            before(() => {
                randomVariableName = RandomGeneratorUtils.getRandomVariableName(6);
                regExp = /^_0x(\w){4,6}$/;
            });

            it('should return random variable name', () => {
                assert.match(randomVariableName, regExp);
            })
        });
    });
});
