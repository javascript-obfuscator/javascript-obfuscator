import { assert } from 'chai';

import { IStorage } from '../../../src/interfaces/storages/IStorage';

import { ArrayStorage } from '../../../src/storages/ArrayStorage';

class ConcreteStorage extends ArrayStorage <string> {
    constructor () {
        super();
    }
}

describe('ArrayStorage', () => {
    describe('initialize (...args: any[]): void', () => {
        it('should throws an error when storage isn\'t initialized', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            assert.throws(() => storage.set(0, 'foo'), Error);
        });
    });

    describe('getStorage (): T[]', () => {
        it('should returns storage', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();

            assert.instanceOf(storage.getStorage(), Array);
        });
    });

    describe('get (key: number): T', () => {
        it('should returns value from storage by key', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();
            storage.set(0, 'foo');

            assert.equal(storage.get(0), 'foo');
        });

        it('should throw an error if value isn\'t exist', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();

            assert.throws(() => storage.get(0), Error);
        });
    });

    describe('getLength (): number', () => {
        it('should returns length of storage', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();
            storage.set(0, 'foo');

            assert.equal(storage.getLength(), 1);
        });
    });

    describe('getKeyOf (value: T): number | null', () => {
        it('should returns key of string value', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();
            storage.set(0, 'foo');

            assert.equal(storage.getKeyOf('foo'), 0);
        });

        it('should returns key of object if objects in `set` and `get` are two linked objects', () => {
            const storage: IStorage <Object> = new ConcreteStorage();
            const object: Object = {
                foo: 'bar'
            };

            storage.initialize();
            storage.set(0, object);

            assert.equal(storage.getKeyOf(object), 0);
        });

        it('should return `null` if objects in `set` and `get` are two equal objects', () => {
            const storage: IStorage <Object> = new ConcreteStorage();

            storage.initialize();
            storage.set(0, {
                foo: 'bar'
            });

            assert.equal(storage.getKeyOf({
                foo: 'bar'
            }), null);
        });
    });

    describe('set (key: number, value: T): void', () => {
        it('should set value to the storage', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();
            storage.set(0, 'foo');

            assert.equal(storage.get(0), 'foo');
            assert.equal(storage.getLength(), 1);
        });
    });

    describe('mergeWith (storage: this, mergeId: boolean = false): void', () => {
        it('should merge two storages', () => {
            const storage1: IStorage <string> = new ConcreteStorage();
            const storage2: IStorage <string> = new ConcreteStorage();

            storage1.initialize();
            storage1.set(0, 'foo');

            storage2.initialize();
            storage2.set(1, 'bar');

            storage1.mergeWith(storage2, false);

            assert.deepEqual(storage1.getStorage(), ['foo', 'bar']);
        });
    });
});
