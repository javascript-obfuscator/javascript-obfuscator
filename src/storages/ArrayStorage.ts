import { injectable } from 'inversify';

import { IStorage } from '../interfaces/storages/IStorage';

import { initializable } from '../decorators/Initializable';

@injectable()
export abstract class ArrayStorage <T> implements IStorage <T> {
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
     * @param args
     */
    public initialize (...args: any[]): void {
        this.storage = [];
    }

    /**
     * @param key
     * @param value
     */
    public set (key: string | null, value: T): void {
        this.storage.push(value);
    }
}
