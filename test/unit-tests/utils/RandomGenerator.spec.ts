import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IRandomGenerator } from '../../../src/interfaces/utils/IRandomGenerator';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

describe('RandomGenerator', () => {
    let randomGenerator: IRandomGenerator;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        randomGenerator = inversifyContainerFacade.get<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator);
    });

    describe('getRandomIntegerExcluding', () => {
        describe('Variant #1: avoid excluded values', () => {
            const samplesCount: number = 500;

            const minValue: number = 5;
            const maxValue: number = 10;
            const valuesToExclude: number[] = [6, 9];

            const expectedRandomIntegerValues: number[] = [5, 7, 8, 10];

            let isRandomIntegerInAllowedValuesRange: boolean = true;

            before(() => {
                for (let i = 0; i < samplesCount; i++) {
                    const randomInteger = randomGenerator.getRandomIntegerExcluding(minValue, maxValue, valuesToExclude);

                    if (!expectedRandomIntegerValues.includes(randomInteger)) {
                        isRandomIntegerInAllowedValuesRange = false;
                    }
                }
            });

            it('should return a random integer in allowed values range', () => {
                assert.isTrue(isRandomIntegerInAllowedValuesRange);
            });
        });

        describe('Variant #2: values boundaries', () => {
            const samplesCount: number = 500;

            const minValue: number = 5;
            const maxValue: number = 10;
            const valuesToExclude: number[] = [6, 9];

            const delta: number = 0.15;

            const expectedValueChance: number = 0.2

            let minValuesCount: number = 0;
            let maxValuesCount: number = 0;

            let minValueChance: number;
            let maxValueChance: number;

            before(() => {
                for (let i = 0; i < samplesCount; i++) {
                    const randomInteger: number = randomGenerator.getRandomIntegerExcluding(minValue, maxValue, valuesToExclude);

                    if (randomInteger === minValue) {
                        minValuesCount += 1;
                    }

                    if (randomInteger === maxValue) {
                        maxValuesCount += 1;
                    }

                    minValueChance = minValuesCount / samplesCount;
                    maxValueChance = maxValuesCount / samplesCount;
                }
            });

            it('should generate min values', () => {
                assert.closeTo(minValueChance, expectedValueChance, delta);
            });

            it('should generate max values', () => {
                assert.closeTo(maxValueChance, expectedValueChance, delta);
            });
        });
    });
});
