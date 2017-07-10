import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IRandomGenerator } from '../../../src/interfaces/utils/IRandomGenerator';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

describe('RandomGeneratorUtils', () => {
    describe('getRandomVariableName (length: number = 6): string', () => {
        let randomGenerator: IRandomGenerator,
            randomVariableName: string,
            regExp: RegExp;

        before(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', {});
            randomGenerator = inversifyContainerFacade.get<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator)
        });

        describe('variant #1: string with random variable of length `4`', () => {
            before(() => {
                randomVariableName = randomGenerator.getRandomVariableName(4);
                regExp = /^_0x(\w){4}$/;
            });

            it('should return random variable name', () => {
                assert.match(randomVariableName, regExp);
            })
        });

        describe('variant #2: string with random variable of length `6`', () => {
            before(() => {
                randomVariableName = randomGenerator.getRandomVariableName(6);
                regExp = /^_0x(\w){4,6}$/;
            });

            it('should return random variable name', () => {
                assert.match(randomVariableName, regExp);
            })
        });
    });
});
