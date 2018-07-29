import 'reflect-metadata';

import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IArrayStorage } from '../../../src/interfaces/storages/IArrayStorage';
import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IOptions } from '../../../src/interfaces/options/IOptions';
import { IRandomGenerator } from '../../../src/interfaces/utils/IRandomGenerator';


import { ArrayStorage } from '../../../src/storages/ArrayStorage';
import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';

class ConcreteStorage <V> extends ArrayStorage <V> {
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
 * @returns {IArrayStorage<V>}
 */
const getStorageInstance = <V> (): IArrayStorage <V> => {
    const storage: IArrayStorage <V> = new ConcreteStorage <V> ();

    storage.initialize();

    return storage;
};

describe('ArrayStorage', () => {
    const storageKey: number = 0;
    const storageValue: string = 'foo';

    let storage: IArrayStorage <any>;

    describe('initialize', () => {
        const expectedError: ErrorConstructor = Error;

        let testFunc: () => void;

        before(() => {
            storage = new ConcreteStorage<string>();
            testFunc = () => storage.set(storageKey, storageValue);
        });

        it('should throws an error when storage isn\'t initialized', () => {
            assert.throws(testFunc, expectedError);
        });
    });

    describe('getStorage', () => {
        const expectedInstanceOf: ArrayConstructor = Array;

        let arrayStorage: string[];

        before(() => {
            storage = getStorageInstance<string>();

            arrayStorage = storage.getStorage();
        });

        it('should return storage', () => {
            assert.instanceOf(arrayStorage, expectedInstanceOf);
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
                foo: 'bar'
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
                foo: 'bar'
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
        const secondStorageKey: number = 1;
        const secondStorageValue: string = 'bar';

        const expectedArray: string[] = [storageValue, secondStorageValue];

        let array: string[];

        before(() => {
            storage = getStorageInstance<string>();
            storage.set(storageKey, storageValue);

            const secondStorage: IArrayStorage <string> = getStorageInstance<string>();
            secondStorage.set(secondStorageKey, secondStorageValue);

            storage.mergeWith(secondStorage, false);

            array = storage.getStorage();
        });

        it('should merge two storages', () => {
            assert.deepEqual(array, expectedArray);
        });
    });
});
