import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IArrayUtils } from '../../../src/interfaces/utils/IArrayUtils';
import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

describe('ArrayUtils', () => {
    let arrayUtils: IArrayUtils;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        arrayUtils = inversifyContainerFacade.get<IArrayUtils>(ServiceIdentifiers.IArrayUtils);
    });

    describe('createWithRange', () => {
        describe('range length more than 0', () => {
            const rangeLength: number = 5;
            const expectedArray: number[] = [0, 1, 2, 3, 4];

            let array: number[];

            before(() => {
                array = arrayUtils.createWithRange(rangeLength);
            });

            it('should return array with range of numbers', () => {
                assert.deepEqual(array, expectedArray);
            });
        });

        describe('range length is 0', () => {
            const rangeLength: number = 0;
            const expectedArray: number[] = [];

            let array: number[];

            before(() => {
                array = arrayUtils.createWithRange(rangeLength);
            });

            it('should return empty array', () => {
                assert.deepEqual(array, expectedArray);
            });
        });

        describe('range length less than 0', () => {
            const rangeLength: number = -5;
            const expectedArray: number[] = [];

            let array: number[];

            before(() => {
                array = arrayUtils.createWithRange(rangeLength);
            });

            it('should return empty array', () => {
                assert.deepEqual(array, expectedArray);
            });
        });
    });

    describe('fillWithRange', () => {
        const valueFunction: (index: number) => string = (index: number) => `foo${index}`;

        describe('range length more than 0', () => {
            const rangeLength: number = 5;
            const expectedArray: string[] = [
                'foo0',
                'foo1',
                'foo2',
                'foo3',
                'foo4',
            ];

            let array: string[];

            before(() => {
                array = arrayUtils.fillWithRange(rangeLength, valueFunction);
            });

            it('should return array with range of strings', () => {
                assert.deepEqual(array, expectedArray);
            });
        });

        describe('range length is 0', () => {
            const rangeLength: number = 0;
            const expectedArray: string[] = [];

            let array: string[];

            before(() => {
                array = arrayUtils.fillWithRange(rangeLength, valueFunction);
            });

            it('should return empty array', () => {
                assert.deepEqual(array, expectedArray);
            });
        });

        describe('range length less than 0', () => {
            const rangeLength: number = -5;
            const expectedArray: string[] = [];

            let array: string[];

            before(() => {
                array = arrayUtils.fillWithRange(rangeLength, valueFunction);
            });

            it('should return empty array', () => {
                assert.deepEqual(array, expectedArray);
            });
        });
    });

    describe('findMostOccurringElement', () => {
        describe('empty array', () => {
            const array: string[] = [];
            const expectedMostOccurringElement: null = null;

            let mostOccurringElement: string | null;

            before(() => {
                mostOccurringElement = arrayUtils.findMostOccurringElement(array);
            });

            it('should return null if array is empty', () => {
                assert.equal(mostOccurringElement, expectedMostOccurringElement);
            });
        });

        describe('one elements is most occurring', () => {
            const array: string[] = ['foo', 'bar', 'bar', 'baz', 'bar', 'foo'];
            const expectedMostOccurringElement: string = 'bar';

            let mostOccurringElement: string | null;

            before(() => {
                mostOccurringElement = arrayUtils.findMostOccurringElement(array);
            });

            it('should return most occurring element', () => {
                assert.equal(mostOccurringElement, expectedMostOccurringElement);
            });
        });

        describe('few elements are most occurring', () => {
            const array: string[] = ['foo', 'bar', 'bar', 'baz', 'bar'];
            const expectedMostOccurringElement: string = 'bar';

            let mostOccurringElement: string | null;

            before(() => {
                mostOccurringElement = arrayUtils.findMostOccurringElement(array);
            });

            it('should return first most occurring element', () => {
                assert.equal(mostOccurringElement, expectedMostOccurringElement);
            });
        });
    });

    describe('getLastElement', () => {
        describe('empty array', () => {
            const array: string[] = [];
            const expectedLastElement: undefined = undefined;

            let lastElement: string | undefined;

            before(() => {
                lastElement = arrayUtils.getLastElement(array);
            });

            it('should return undefined if array is empty', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });

        describe('array length: `1`', () => {
            const array: string[] = ['foo'];
            const expectedLastElement: string = 'foo';

            let lastElement: string | undefined;

            before(() => {
                lastElement = arrayUtils.getLastElement(array);
            });

            it('should return first element for array with length: `1`', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });

        describe('array length: `3`', () => {
            const array: string[] = ['foo', 'bar', 'baz'];
            const expectedLastElement: string = 'baz';

            let lastElement: string | undefined;

            before(() => {
                lastElement = arrayUtils.getLastElement(array);
            });

            it('should return last element for array with length: `3`', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });
    });

    describe('getLastElementByIndex', () => {
        describe('empty array', () => {
            const array: string[] = [];
            const expectedLastElement: undefined = undefined;

            let lastElement: string | undefined;

            before(() => {
                lastElement = arrayUtils.getLastElementByIndex(array, 1);
            });

            it('should return undefined if array is empty', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });

        describe('array length: `1` and index is out of array boundary', () => {
            const array: string[] = ['foo'];
            const expectedLastElement: undefined = undefined;

            let lastElement: string | undefined;

            before(() => {
                lastElement = arrayUtils.getLastElementByIndex(array, 2);
            });

            it('should return undefined', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });

        describe('array length: `3` and index is `0`', () => {
            const array: string[] = ['foo', 'bar', 'baz'];
            const expectedLastElement: string = 'baz';

            let lastElement: string | undefined;

            before(() => {
                lastElement = arrayUtils.getLastElementByIndex(array, 0);
            });

            it('should return element with a correct index', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });

        describe('array length: `3` and index is `1`', () => {
            const array: string[] = ['foo', 'bar', 'baz'];
            const expectedLastElement: string = 'bar';

            let lastElement: string | undefined;

            before(() => {
                lastElement = arrayUtils.getLastElementByIndex(array, 1);
            });

            it('should return element with a correct index', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });
    });

    describe('rotate', () => {
        let array: number[],
            rotatedArray: number[];

        beforeEach(() => {
            array = [1, 2, 3, 4, 5, 6];
        });

        describe('value is not 0', () => {
            const rotateValue: number = 2;
            const expectedArray: number[] = [5, 6, 1, 2, 3, 4];

            beforeEach(() => {
                rotatedArray = arrayUtils.rotate(array, rotateValue);
            });

            it('should rotate (shift) array by a given value', () => {
                assert.deepEqual(rotatedArray, expectedArray);
            });
        });

        describe('value equals or less 0', () => {
            const rotateValue: number = 0;
            const expectedArray: number[] = [1, 2, 3, 4, 5, 6];

            beforeEach(() => {
                rotatedArray = arrayUtils.rotate(array, rotateValue);
            });

            it('shouldn\'t rotate array', () => {
                assert.deepEqual(rotatedArray, expectedArray);
            });
        });

        describe('empty array', () => {
            const emptyArray: number[] = [];
            const rotateValue: number = 5;
            const expectedError: ReferenceErrorConstructor = ReferenceError;

            let testFunc: () => void;

            beforeEach(() => {
                testFunc = () => arrayUtils.rotate(emptyArray, rotateValue);
            });

            it('should throw exception if array is empty', () => {
                assert.throws(testFunc, expectedError);
            });
        });
    });
});
