import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { TDictionary } from '../../../../src/types/TDictionary';
import { TIdentifierNamesCache } from '../../../../src/types/storages/TIdentifierNamesCache';

import { IIdentifierNamesCacheStorage } from '../../../../src/interfaces/storages/identifier-names-cache/IIdentifierNamesCacheStorage';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { IOptions } from '../../../../src/interfaces/options/IOptions';
import { IRandomGenerator } from '../../../../src/interfaces/utils/IRandomGenerator';

import { DEFAULT_PRESET } from '../../../../src/options/presets/Default';

import { IdentifierNamesCacheStorage } from '../../../../src/storages/identifier-names-cache/IdentifierNamesCacheStorage';
import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

/**
 * @returns {IIdentifierNamesCacheStorage}
 */
const getStorageInstance = <V>(options: Partial<IOptions> = DEFAULT_PRESET): IIdentifierNamesCacheStorage => {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();
    inversifyContainerFacade.load('', '', {});

    const storage: IIdentifierNamesCacheStorage = new IdentifierNamesCacheStorage (
        inversifyContainerFacade.get<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator),
        {
            ...DEFAULT_PRESET,
            ...options as IOptions
        }
    );

    storage.initialize();

    return storage;
};

describe('IdentifierNamesCacheStorage', () => {
    const storageKey: string = 'foo';
    const storageValue: string = 'bar';

    let storage: IIdentifierNamesCacheStorage;

    describe('initialize', () => {
        describe('Variant #1: `identifierNamesCache` option values is object', () => {
            const expectedDictionary: TDictionary<string> = {
                [storageKey]: storageValue
            };

            let dictionary: TDictionary<string>;

            before(() => {
                storage = getStorageInstance({
                    identifierNamesCache: {
                        [storageKey]: storageValue
                    }
                });

                dictionary = storage.getStorageAsDictionary();
            });

            it('should initialize storage with `identifierNamesStorage` option object', () => {
                assert.deepEqual(dictionary, expectedDictionary);
            });
        });

        describe('Variant #2: `identifierNamesCache` option values is empty object', () => {
            const expectedDictionary: TDictionary<string> = {};

            let dictionary: TDictionary<string>;

            before(() => {
                storage = getStorageInstance({
                    identifierNamesCache: {}
                });

                dictionary = storage.getStorageAsDictionary();
            });

            it('should initialize storage with `identifierNamesStorage` option object', () => {
                assert.deepEqual(dictionary, expectedDictionary);
            });
        });

        describe('Variant #3: `identifierNamesCache` option values is `null`', () => {
            const expectedDictionary: TDictionary<string> = {};

            let dictionary: TDictionary<string>;

            before(() => {
                storage = getStorageInstance({
                    identifierNamesCache: null
                });

                dictionary = storage.getStorageAsDictionary();
            });

            it('should initialize storage with `identifierNamesStorage` option object', () => {
                assert.deepEqual(dictionary, expectedDictionary);
            });
        });
    });

    describe('getCache', () => {
        describe('Variant #1: `identifierNamesCache` option values is object', () => {
            const expectedIdentifierNamesCache: TIdentifierNamesCache = {
                [storageKey]: storageValue
            };

            let identifierNamesCache: TIdentifierNamesCache;

            before(() => {
                storage = getStorageInstance({
                    identifierNamesCache: {
                        [storageKey]: storageValue
                    }
                });

                identifierNamesCache = storage.getCache();
            });

            it('should return cache object', () => {
                assert.deepEqual(identifierNamesCache, expectedIdentifierNamesCache);
            });
        });

        describe('Variant #2: `identifierNamesCache` option values is empty object', () => {
            const expectedIdentifierNamesCache: TIdentifierNamesCache = {};

            let identifierNamesCache: TIdentifierNamesCache;

            before(() => {
                storage = getStorageInstance({
                    identifierNamesCache: {}
                });

                identifierNamesCache = storage.getCache();
            });

            it('should return empty cache object', () => {
                assert.deepEqual(identifierNamesCache, expectedIdentifierNamesCache);
            });
        });

        describe('Variant #3: `identifierNamesCache` option values is `null`', () => {
            let identifierNamesCache: TIdentifierNamesCache;

            before(() => {
                storage = getStorageInstance({
                    identifierNamesCache: null
                });
                storage.set(storageKey, storageValue);

                identifierNamesCache = storage.getCache();
            });

            it('should return `null`', () => {
                assert.isNull(identifierNamesCache);
            });
        });
    });
});
