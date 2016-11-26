import { injectable } from 'inversify';

import { IStorage } from '../interfaces/IStorage';

import { Utils } from '../Utils';

@injectable()
export abstract class MapStorage <T> implements IStorage <T> {
    /**
     * @type {Map <string | number, T>}
     */
    protected storage: Map <string | number, T> = new Map <string | number, T> ();

    /**
     * @param key
     * @returns {T}
     */
    public get (key: string | number): T {
        const value: T | undefined = this.storage.get(key);

        if (!value) {
            throw new Error(`No value found in map storage with key \`${key}\``);
        }

        return value;
    }

    /**
     * @param value
     * @returns {string | number | null}
     */
    public getKeyOf (value: T): string | number | null {
        return Utils.mapGetFirstKeyOf(this.storage, value);
    }

    /**
     * @returns {number}
     */
    public getLength (): number {
        return Array.from(this.storage).length;
    }

    /**
     * @returns {Map <string | number, T>}
     */
    public getStorage (): Map <string | number, T> {
        return this.storage;
    }

    /**
     * @param args
     */
    public initialize (...args: any[]): void {}

    /**
     * @param key
     * @param value
     */
    public set (key: string | number, value: T): void {
        this.storage.set(key, value);
    }
}
