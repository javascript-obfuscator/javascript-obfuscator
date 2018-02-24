import { assert } from 'chai';

import { ServiceIdentifiers } from '../../../src/container/ServiceIdentifiers';

import { IInversifyContainerFacade } from '../../../src/interfaces/container/IInversifyContainerFacade';
import { IOptions } from '../../../src/interfaces/options/IOptions';
import { IRandomGenerator } from '../../../src/interfaces/utils/IRandomGenerator';
import { IStorage } from '../../../src/interfaces/storages/IStorage';

import { InversifyContainerFacade } from '../../../src/container/InversifyContainerFacade';
import { MapStorage } from '../../../src/storages/MapStorage';

class ConcreteStorage extends MapStorage <string> {
    constructor () {
        const inversifyContainerFacade: IInversifyContainerFacade = new InversifyContainerFacade();

        inversifyContainerFacade.load('', {});

        super(
            inversifyContainerFacade.get<IRandomGenerator>(ServiceIdentifiers.IRandomGenerator),
            inversifyContainerFacade.get<IOptions>(ServiceIdentifiers.IOptions)
        );
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

describe('MapStorage', () => {
    const storageKey: string = 'foo';
    const storageValue: string = 'bar';

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

    describe('getStorage (): Map <string | number, T>', () => {
        const expectedInstanceOf: MapConstructor = Map;

        let mapStorage: string[];

        before(() => {
            storage = getStorageInstance();

            mapStorage = storage.getStorage();
        });

        it('should return storage', () => {
            assert.instanceOf(mapStorage, expectedInstanceOf);
        });
    });

    describe('get (key: string | number): T', () => {
        describe('Variant #1: value exist', () => {
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

        describe('Variant #2: value isn\'t exist', () => {
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

    describe('getKeyOf (value: T): string | number | null', () => {
        let key: string | number | null;

        describe('Variant #1', () => {
            before(() => {
                storage = getStorageInstance();
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
                storage = getStorageInstance();
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
                storage = getStorageInstance();
                storage.set(storageKey, object);

                key = storage.getKeyOf({...object});
            });

            it('should return `null` if objects in `set` and `get` are two different objects', () => {
                assert.equal(key, expectedKey);
            });
        });
    });

    describe('set (key: string | number, value: T): void', () => {
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
        const secondStorageKey: string = 'baz';
        const secondStorageValue: string = 'quux';

        const expectedArray: string[][] = [
            [storageKey, storageValue],
            [secondStorageKey, secondStorageValue]
        ];

        let array: string[][];

        before(() => {
            storage = getStorageInstance();
            storage.set(storageKey, storageValue);

            const secondStorage: IStorage <string> = getStorageInstance();
            secondStorage.set(secondStorageKey, secondStorageValue);

            storage.mergeWith(secondStorage, false);

            array = <any>Array.from(storage.getStorage());
        });

        it('should merge two storages', () => {
            assert.deepEqual(array, expectedArray);
        });
    });
});
