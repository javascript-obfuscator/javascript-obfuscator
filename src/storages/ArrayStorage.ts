import { injectable } from 'inversify';

import { IStorage } from '../interfaces/storages/IStorage';

import { initializable } from '../decorators/Initializable';

import { RandomGeneratorUtils } from '../utils/RandomGeneratorUtils';

@injectable()
export abstract class ArrayStorage <T> implements IStorage <T> {
    /**
     * @type {string}
     */
    @initializable()
    protected storageId: string;

    /**
     * @type {T[]}
     */
    @initializable()
    protected storage: T[];

    /**
     * @param key
     * @returns {T}
     */
    public get (key: number): T {
        const value: T | undefined = this.storage[key];

        if (!value) {
            throw new Error(`No value found in array storage with key \`${key}\``);
        }

        return value;
    }

    /**
     * @param value
     * @returns {string | number}
     */
    public getKeyOf (value: T): string | number {
        return this.storage.indexOf(value);
    }

    /**
     * @returns {number}
     */
    public getLength (): number {
        return this.storage.length;
    }

    /**
     * @returns {T[]}
     */
    public getStorage (): T[] {
        return this.storage;
    }

    /**
     * @returns {string}
     */
    public getStorageId (): string {
        return this.storageId;
    }

    /**
     * @param args
     */
    public initialize (...args: any[]): void {
        this.storage = [];
        this.storageId = RandomGeneratorUtils.getRandomString(6);
    }

    /**
     * @param storage
     * @param mergeId
     */
    public mergeWith (storage: this, mergeId: boolean = false): void {
        this.storage = [...this.storage, ...storage.getStorage()];

        if (mergeId) {
            this.storageId = storage.getStorageId();
        }
    }

    /**
     * @param key
     * @param value
     */
    public set (key: string | null, value: T): void {
        this.storage.push(value);
    }
}
