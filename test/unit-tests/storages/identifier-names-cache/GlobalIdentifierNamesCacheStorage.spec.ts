import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { TDictionary } from '../../../../src/types/TDictionary';

import { IGlobalIdentifierNamesCacheStorage } from '../../../../src/interfaces/storages/identifier-names-cache/IGlobalIdentifierNamesCacheStorage';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { IOptions } from '../../../../src/interfaces/options/IOptions';
import { IRandomGenerator } from '../../../../src/interfaces/utils/IRandomGenerator';

import { DEFAULT_PRESET } from '../../../../src/options/presets/Default';

import { GlobalIdentifierNamesCacheStorage } from '../../../../src/storages/identifier-names-cache/GlobalIdentifierNamesCacheStorage';
import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';

/**
 * @returns {IGlobalIdentifierNamesCacheStorage}
 */
const getStorageInstance = <V>(options: Partial<IOptions> = DEFAULT_PRESET): IGlobalIdentifierNamesCacheStorage => {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();
    inversifyContainerFacade.load('', '', {});

    const storage: IGlobalIdentifierNamesCacheStorage = new GlobalIdentifierNamesCacheStorage (
        inversifyContainerFacade.get<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator),
        {
            ...DEFAULT_PRESET,
            ...options as IOptions
        }
    );

    storage.initialize();

    return storage;
};

describe('GlobalIdentifierNamesCacheStorage', () => {
    const storageKey: string = 'foo';
    const storageValue: string = 'bar';

    let storage: IGlobalIdentifierNamesCacheStorage;

    describe('initialize', () => {
        describe('Variant #1: `identifierNamesCache` option values is object', () => {
            const expectedDictionary: TDictionary<string> = {
                [storageKey]: storageValue
            };

            let dictionary: TDictionary<string>;

            before(() => {
                storage = getStorageInstance({
                    identifierNamesCache: {
                        globalIdentifiers: {
                            [storageKey]: storageValue
                        },
                        propertyIdentifiers: {}
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
                    identifierNamesCache: {
                        globalIdentifiers: {},
                        propertyIdentifiers: {}
                    }
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
});
