import { assert } from 'chai';

import { IStorage } from '../../../src/interfaces/storages/IStorage';

import { ArrayStorage } from '../../../src/storages/ArrayStorage';

class ConcreteStorage extends ArrayStorage <string> {
    constructor () {
        super();
    }
}

/**
 * @type {IStorage<any>}
 */
const getStorageInstance = (): IStorage <any> => {
    const storage: IStorage<any> = new ConcreteStorage();

    storage.initialize();

    return storage;
};

describe('ArrayStorage', () => {
    const storageKey: number = 0;
    const storageValue: string = 'foo';

    let storage: IStorage <any>;

    describe('initialize (...args: any[]): void', () => {
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

    describe('getStorage (): T[]', () => {
        const expectedInstanceOf: ArrayConstructor = Array;

        let arrayStorage: string[];

        before(() => {
            storage = getStorageInstance();

            arrayStorage = storage.getStorage();
        });

        it('should return storage', () => {
            assert.instanceOf(arrayStorage, expectedInstanceOf);
        });
    });

    describe('get (key: number): T', () => {
        describe('variant #1: value exist', () => {
            const expectedValue: string = storageValue;

            let value: string;

            before(() => {
                storage = getStorageInstance();
                storage.set(storageKey, storageValue);

                value = storage.get(storageKey);
            });

            it('should return value from storage by key', () => {
                assert.equal(value, expectedValue);
            });
        });

        describe('variant #2: value isn\'t exist', () => {
            const expectedError: ErrorConstructor = Error;

            let testFunc: () => void;

            before(() => {
                storage = getStorageInstance();

                testFunc = () => storage.get(storageKey);
            });

            it('should throw an error', () => {
                assert.throws(testFunc, expectedError);
            });
        });
    });

    describe('getLength (): number', () => {
        const expectedStorageLength: number = 1;

        let storageLength: number;

        before(() => {
            storage = getStorageInstance();
            storage.set(storageKey, storageValue);

            storageLength = storage.getLength();
        });

        it('should return length of storage', () => {
            assert.equal(storageLength, expectedStorageLength);
        });
    });

    describe('getKeyOf (value: T): number | null', () => {
        let key: string | number | null;

        describe('variant #1', () => {
            before(() => {
                storage = getStorageInstance();
                storage.set(storageKey, storageValue);

                key = storage.getKeyOf(storageValue);
            });

            it('should return key of string value', () => {
                assert.equal(key, storageKey);
            });
        });

        describe('variant #2', () => {
            const object: Object = {
                foo: 'bar'
            };

            before(() => {
                storage = getStorageInstance();
                storage.set(storageKey, object);

                key = storage.getKeyOf(object);
            });

            it('should return key of object if objects in `set` and `get` are two same objects', () => {
                assert.equal(key, storageKey);
            });
        });

        describe('variant #3', () => {
            const expectedKey: null = null;
            const object: Object = {
                foo: 'bar'
            };

            before(() => {
                storage = getStorageInstance();
                storage.set(storageKey, object);

                key = storage.getKeyOf({...object});
            });

            it('should return `null` if objects in `set` and `get` are two different objects', () => {
                assert.equal(key, expectedKey);
            });
        });
    });

    describe('set (key: number, value: T): void', () => {
        let value: string;

        before(() => {
            storage = getStorageInstance();
            storage.set(storageKey, storageValue);

            value = storage.get(storageKey);
        });

        it('should set value to the storage', () => {
            assert.equal(value, storageValue);
        });
    });

    describe('mergeWith (storage: this, mergeId: boolean = false): void', () => {
        const secondStorageKey: number = 1;
        const secondStorageValue: string = 'bar';

        const expectedArray: string[] = [storageValue, secondStorageValue];

        let array: string[];

        before(() => {
            storage = getStorageInstance();
            storage.set(storageKey, storageValue);

            const secondStorage: IStorage <string> = getStorageInstance();
            secondStorage.set(secondStorageKey, secondStorageValue);

            storage.mergeWith(secondStorage, false);

            array = storage.getStorage();
        });

        it('should merge two storages', () => {
            assert.deepEqual(array, expectedArray);
        });
    });
});
