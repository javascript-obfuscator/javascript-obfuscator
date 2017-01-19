import { assert } from 'chai';

import { IStorage } from '../../../src/interfaces/storages/IStorage';

import { MapStorage } from '../../../src/storages/MapStorage';

class ConcreteStorage extends MapStorage <string> {
    constructor () {
        super();
    }
}

describe('MapStorage', () => {
    describe('initialize (...args: any[]): void', () => {
        it('should throws an error when storage isn\'t initialized', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            assert.throws(() => storage.set('foo', 'bar'), Error);
        });
    });

    describe('getStorage (): Map <string | number, T>', () => {
        it('should returns storage', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();

            assert.instanceOf(storage.getStorage(), Map);
        });
    });

    describe('get (key: string | number): T', () => {
        it('should returns value from storage by key', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();
            storage.set('foo', 'bar');

            assert.equal(storage.get('foo'), 'bar');
        });

        it('should throw an error if value isn\'t exist', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();

            assert.throws(() => storage.get('foo'), Error);
        });
    });

    describe('getLength (): number', () => {
        it('should returns length of storage', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();
            storage.set('foo', 'bar');

            assert.equal(storage.getLength(), 1);
        });
    });

    describe('getKeyOf (value: T): string | number | null', () => {
        it('should returns key of string value', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();
            storage.set('foo', 'bar');

            assert.equal(storage.getKeyOf('bar'), 'foo');
        });

        it('should returns key of object if objects in `set` and `get` are two linked objects', () => {
            const storage: IStorage <Object> = new ConcreteStorage();
            const object: Object = {
                bar: 'baz'
            };

            storage.initialize();
            storage.set('foo', object);

            assert.equal(storage.getKeyOf(object), 'foo');
        });

        it('should return `null` if objects in `set` and `get` are two equal objects', () => {
            const storage: IStorage <Object> = new ConcreteStorage();

            storage.initialize();
            storage.set('foo', {
                bar: 'baz'
            });

            assert.equal(storage.getKeyOf({
                bar: 'baz'
            }), null);
        });
    });

    describe('set (key: string | number, value: T): void', () => {
        it('should set value to the storage', () => {
            const storage: IStorage <string> = new ConcreteStorage();

            storage.initialize();
            storage.set('foo', 'bar');

            assert.equal(storage.get('foo'), 'bar');
            assert.equal(storage.getLength(), 1);
        });
    });

    describe('mergeWith (storage: this, mergeId: boolean = false): void', () => {
        it('should merge two storages', () => {
            const storage1: IStorage <string> = new ConcreteStorage();
            const storage2: IStorage <string> = new ConcreteStorage();

            storage1.initialize();
            storage1.set('foo', 'bar');

            storage2.initialize();
            storage2.set('baz', 'quux');

            storage1.mergeWith(storage2, false);

            assert.deepEqual(Array.from(storage1.getStorage()), [['foo', 'bar'], ['baz', 'quux']]);
        });
    });
});
