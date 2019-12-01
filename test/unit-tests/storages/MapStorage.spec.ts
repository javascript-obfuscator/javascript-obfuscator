import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IMapStorage } from '../../../src/interfaces/storages/IMapStorage';
import { IOptions } from '../../../src/interfaces/options/IOptions';
import { IRandomGenerator } from '../../../src/interfaces/utils/IRandomGenerator';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';
import { MapStorage } from '../../../src/storages/MapStorage';

class ConcreteStorage <V> extends MapStorage <string, V> {
    constructor () {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', '', {});

        super(
            inversifyContainerFacade.get<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator),
            inversifyContainerFacade.get<IOptions>(ServiceIdentifiers.IOptions)
        );
    }
}

/**
 * @returns {IMapStorage<string, V>}
 */
const getStorageInstance = <V>(): IMapStorage <string, V> => {
    const storage: IMapStorage <string, V> = new ConcreteStorage <V> ();

    storage.initialize();

    return storage;
};

describe('MapStorage', () => {
    const storageKey: string = 'foo';
    const storageValue: string = 'bar';

    let storage: IMapStorage <string, any>;

    describe('initialize', () => {
        const expectedError: ErrorConstructor = Error;

        let testFunc: () => void;

        before(() => {
            storage = new ConcreteStorage();
            testFunc = () => storage.set(storageKey, storageValue);
        });

        it('should throws an error when storage isn\'t initialized', () => {
            assert.throws(testFunc, expectedError);
        });
    });

    describe('getStorage', () => {
        const expectedInstanceOf: MapConstructor = Map;

        let mapStorage: Map <string, string>;

        before(() => {
            storage = getStorageInstance<string>();

            mapStorage = storage.getStorage();
        });

        it('should return storage', () => {
            assert.instanceOf(mapStorage, expectedInstanceOf);
        });
    });

    describe('get', () => {
        describe('Variant #1: value exist', () => {
            const expectedValue: string = storageValue;

            let value: string;

            before(() => {
                storage = getStorageInstance<string>();
                storage.set(storageKey, storageValue);

                value = storage.get(storageKey);
            });

            it('should return value from storage by key', () => {
                assert.equal(value, expectedValue);
            });
        });

        describe('Variant #2: value isn\'t exist', () => {
            const expectedError: ErrorConstructor = Error;

            let testFunc: () => void;

            before(() => {
                storage = getStorageInstance<string>();

                testFunc = () => storage.get(storageKey);
            });

            it('should throw an error', () => {
                assert.throws(testFunc, expectedError);
            });
        });
    });

    describe('getLength', () => {
        const expectedStorageLength: number = 1;

        let storageLength: number;

        before(() => {
            storage = getStorageInstance<string>();
            storage.set(storageKey, storageValue);

            storageLength = storage.getLength();
        });

        it('should return length of storage', () => {
            assert.equal(storageLength, expectedStorageLength);
        });
    });

    describe('getKeyOf', () => {
        let key: string | number | null;

        describe('Variant #1', () => {
            before(() => {
                storage = getStorageInstance<string>();
                storage.set(storageKey, storageValue);

                key = storage.getKeyOf(storageValue);
            });

            it('should return key of string value', () => {
                assert.equal(key, storageKey);
            });
        });

        describe('Variant #2', () => {
            const object: Object = {
                bar: 'baz'
            };

            before(() => {
                storage = getStorageInstance<string>();
                storage.set(storageKey, object);

                key = storage.getKeyOf(object);
            });

            it('should return key of object if objects in `set` and `get` are two same objects', () => {
                assert.equal(key, storageKey);
            });
        });

        describe('Variant #3', () => {
            const expectedKey: null = null;
            const object: Object = {
                bar: 'baz'
            };

            before(() => {
                storage = getStorageInstance<string>();
                storage.set(storageKey, object);

                key = storage.getKeyOf({...object});
            });

            it('should return `null` if objects in `set` and `get` are two different objects', () => {
                assert.equal(key, expectedKey);
            });
        });
    });

    describe('has', () => {
        describe('Variant #1: item is presenting in storage', () => {
            const expectedItemExistence: boolean = true;

            let itemExistence: boolean;

            before(() => {
                storage = getStorageInstance<string>();
                storage.set(storageKey, storageValue);

                itemExistence = storage.has(storageKey);
            });

            it('should return `true` if item is presenting in storage', () => {
                assert.equal(itemExistence, expectedItemExistence);
            });
        });

        describe('Variant #2: item isn\'t presenting in storage', () => {
            const expectedItemExistence: boolean = false;

            let itemExistence: boolean;

            before(() => {
                storage = getStorageInstance<string>();

                itemExistence = storage.has(storageKey);
            });

            it('should return `false` if item isn\'t presenting in storage', () => {
                assert.equal(itemExistence, expectedItemExistence);
            });
        });
    });

    describe('set', () => {
        let value: string;

        before(() => {
            storage = getStorageInstance<string>();
            storage.set(storageKey, storageValue);

            value = storage.get(storageKey);
        });

        it('should set value to the storage', () => {
            assert.equal(value, storageValue);
        });
    });

    describe('mergeWith', () => {
        const secondStorageKey: string = 'baz';
        const secondStorageValue: string = 'quux';

        const expectedArray: string[][] = [
            [storageKey, storageValue],
            [secondStorageKey, secondStorageValue]
        ];

        let array: string[][];

        before(() => {
            storage = getStorageInstance<string>();
            storage.set(storageKey, storageValue);

            const secondStorage: IMapStorage <string, string> = getStorageInstance<string>();
            secondStorage.set(secondStorageKey, secondStorageValue);

            storage.mergeWith(secondStorage, false);

            array = Array.from(storage.getStorage());
        });

        it('should merge two storages', () => {
            assert.deepEqual(array, expectedArray);
        });
    });
});
