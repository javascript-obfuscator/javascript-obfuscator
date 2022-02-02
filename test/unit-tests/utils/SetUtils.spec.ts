import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { ISetUtils } from '../../../src/interfaces/utils/ISetUtils';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

describe('SetUtils', () => {
    let setUtils: ISetUtils;

    before(() => {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});
        setUtils = inversifyContainerFacade.get<ISetUtils>(ServiceIdentifiers.ISetUtils);
    });

    describe('getLastElement', () => {
        describe('empty set', () => {
            const set: Set<string> = new Set();
            const expectedLastElement: undefined = undefined;

            let lastElement: string | undefined;

            before(() => {
                lastElement = setUtils.getLastElement(set);
            });

            it('should return undefined if set is empty', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });

        describe('set length: `1`', () => {
            const set: Set<string> = new Set(['foo']);
            const expectedLastElement: string = 'foo';

            let lastElement: string | undefined;

            before(() => {
                lastElement = setUtils.getLastElement(set);
            });

            it('should return first element for set with length: `1`', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });

        describe('set length: `3`', () => {
            const set: Set<string> = new Set(['foo', 'bar', 'baz']);
            const expectedLastElement: string = 'baz';

            let lastElement: string | undefined;

            before(() => {
                lastElement = setUtils.getLastElement(set);
            });

            it('should return last element for set with length: `3`', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });

        describe('changed set with length: `2`', () => {
            const set: Set<string> = new Set(['foo', 'bar', 'baz']);
            set.add('bark');
            set.delete('bark');
            set.delete('bar');

            const expectedLastElement: string = 'baz';

            let lastElement: string | undefined;

            before(() => {
                lastElement = setUtils.getLastElement(set);
            });

            it('should return last element for changed set with length: `2`', () => {
                assert.equal(lastElement, expectedLastElement);
            });
        });
    });
});
