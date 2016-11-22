import { TStorage } from '../types/TStorage';

import { IStorage } from '../interfaces/IStorage';

export abstract class AbstractStorage <T> implements IStorage <T> {
    /**
     * @type {TStorage <T>}
     */
    protected abstract storage: TStorage <T>;

    /**
     * @param key
     * @returns T
     */
    public abstract get (key: string | number): T;

    /**
     * @param value
     * @returns string | number | null
     */
    public abstract getKeyOf (value: T): string | number | null;

    /**
     * @returns {number}
     */
    public abstract getLength (): number;

    /**
     * @returns {TStorage <T>}
     */
    public getStorage (): TStorage <T> {
        return this.storage;
    }

    /**
     * @param key
     * @param value
     */
    public abstract set (key: string | number | null, value: T): void;

    /**
     * @returns {string}
     */
    public abstract toString (): string;
}
