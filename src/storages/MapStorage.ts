import { injectable } from 'inversify';

import { IStorage } from '../interfaces/storages/IStorage';

import { initializable } from '../decorators/Initializable';

import { RandomGeneratorUtils } from '../utils/RandomGeneratorUtils';
import { Utils } from '../utils/Utils';

@injectable()
export abstract class MapStorage <T> implements IStorage <T> {
    /**
     * @type {string}
     */
    @initializable()
    protected storageId: string;

    /**
     * @type {Map <string | number, T>}
     */
    @initializable()
    protected storage: Map <string | number, T>;

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
        return Utils.mapGetFirstKeyOf <string | number, T> (this.storage, value);
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
     * @returns {string}
     */
    public getStorageId (): string {
        return this.storageId;
    }

    /**
     * @param args
     */
    public initialize (...args: any[]): void {
        this.storage = new Map <string | number, T> ();
        this.storageId = RandomGeneratorUtils.getRandomString(6);
    }

    /**
     * @param storage
     * @param mergeId
     */
    public mergeWith (storage: this, mergeId: boolean = false): void {
        this.storage = new Map <string | number, T> ([...this.storage, ...storage.getStorage()]);

        if (mergeId) {
            this.storageId = storage.getStorageId();
        }
    }

    /**
     * @param key
     * @param value
     */
    public set (key: string | number, value: T): void {
        this.storage.set(key, value);
    }
}
