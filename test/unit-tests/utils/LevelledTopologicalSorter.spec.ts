import 'reflect-metadata';

import { assert } from 'chai';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';
import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { ILevelledTopologicalSorter } from '../../../src/interfaces/utils/ILevelledTopologicalSorter';


describe('EscapeSequenceEncoder', () => {
    describe('encode', () => {
        let levelledTopologicalSorter: ILevelledTopologicalSorter;

        beforeEach(() => {
            const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

            inversifyContainerFacade.load('', '', {});
            levelledTopologicalSorter = inversifyContainerFacade
                .get<ILevelledTopologicalSorter>(ServiceIdentifiers.ILevelledTopologicalSorter);
        });

        describe('Base sort', () => {
            beforeEach(() => {
                levelledTopologicalSorter.add('A', 'B');
                levelledTopologicalSorter.add('B');
                levelledTopologicalSorter.add('C', 'B');
                levelledTopologicalSorter.add('D');
                levelledTopologicalSorter.add('E');
                levelledTopologicalSorter.add('F', 'A');
                levelledTopologicalSorter.add('F', 'E');
            });

            describe('Variant #1: Base linear sort', () => {
                const expectedSortedItems: string[] = [
                    'F',
                    'A',
                    'C',
                    'B',
                    'D',
                    'E',
                ];

                let sortedItems: string[];

                beforeEach(() => {
                    sortedItems = levelledTopologicalSorter.sort();
                });

                it('should topologically linear sort items', () => {
                    assert.deepEqual(sortedItems, expectedSortedItems);
                });
            });

            describe('Variant #2: Base sort with grouping', () => {
                const expectedSortedItems: string[][] = [
                    ['C', 'D', 'F'],
                    ['A', 'E'],
                    ['B']
                ];

                let sortedItems: string[][];

                beforeEach(() => {
                    sortedItems = levelledTopologicalSorter.sortByGroups();
                });

                it('should topologically linear sort items', () => {
                    assert.deepEqual(sortedItems, expectedSortedItems);
                });
            });
        });

        describe('Sort without relations', () => {
            beforeEach(() => {
                levelledTopologicalSorter.add('A');
                levelledTopologicalSorter.add('B');
                levelledTopologicalSorter.add('C');
                levelledTopologicalSorter.add('D');
                levelledTopologicalSorter.add('E');
                levelledTopologicalSorter.add('F');
            });

            describe('Variant #1: Should sort items without relations', () => {
                const expectedSortedItems: string[] = [
                    'A',
                    'B',
                    'C',
                    'D',
                    'E',
                    'F'
                ];

                let sortedItems: string[];

                beforeEach(() => {
                    sortedItems = levelledTopologicalSorter.sort();
                });

                it('should topologically linear sort items', () => {
                    assert.deepEqual(sortedItems, expectedSortedItems);
                });
            });

            describe('Variant #2: Should sort items without relations with grouping', () => {
                const expectedSortedItems: string[][] = [
                    ['A', 'B', 'C', 'D', 'E', 'F']
                ];

                let sortedItems: string[][];

                beforeEach(() => {
                    sortedItems = levelledTopologicalSorter.sortByGroups();
                });

                it('should topologically linear sort items', () => {
                    assert.deepEqual(sortedItems, expectedSortedItems);
                });
            });
        });
    });
});
