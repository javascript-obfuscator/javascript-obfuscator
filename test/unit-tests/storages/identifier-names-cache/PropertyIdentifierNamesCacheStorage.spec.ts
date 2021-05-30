import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../../src/container/ServiceIdentifiers';

import { TDictionary } from '../../../../src/types/TDictionary';

import { IPropertyIdentifierNamesCacheStorage } from '../../../../src/interfaces/storages/identifier-names-cache/IPropertyIdentifierNamesCacheStorage';
import { IInversifyContainerFacade } from '../../../../src/interfaces/container/IInversifyContainerFacade';
import { IOptions } from '../../../../src/interfaces/options/IOptions';
import { IRandomGenerator } from '../../../../src/interfaces/utils/IRandomGenerator';

import { DEFAULT_PRESET } from '../../../../src/options/presets/Default';

import { InversifyContainerFacade } from '../../../../src/container/InversifyContainerFacade';
import { PropertyIdentifierNamesCacheStorage } from '../../../../src/storages/identifier-names-cache/PropertyIdentifierNamesCacheStorage';

/**
 * @returns {IPropertyIdentifierNamesCacheStorage}
 */
const getStorageInstance = <V>(options: Partial<IOptions> = DEFAULT_PRESET): IPropertyIdentifierNamesCacheStorage => {
    const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();
    inversifyContainerFacade.load('', '', {});

    const storage: IPropertyIdentifierNamesCacheStorage = new PropertyIdentifierNamesCacheStorage(
        inversifyContainerFacade.get<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator),
        {
            ...DEFAULT_PRESET,
            ...options as IOptions
        }
    );

    storage.initialize();

    return storage;
};

describe('PropertyIdentifierNamesCacheStorage', () => {
    const storageKey: string = 'foo';
    const storageValue: string = 'bar';

    let storage: IPropertyIdentifierNamesCacheStorage;

    describe('initialize', () => {
        describe('Variant #1: `identifierNamesCache` option values is object', () => {
            const expectedDictionary: TDictionary<string> = {
                [storageKey]: storageValue
            };

            let dictionary: TDictionary<string>;

            before(() => {
                storage = getStorageInstance({
                    identifierNamesCache: {
                        globalIdentifiers: {},
                        propertyIdentifiers: {
                            [storageKey]: storageValue
                        }
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
