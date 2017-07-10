import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { IStorage } from '../interfaces/storages/IStorage';

import { initializable } from '../decorators/Initializable';

@injectable()
export abstract class ArrayStorage <T> implements IStorage <T> {
    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @type {T[]}
     */
    @initializable()
    protected storage: T[];

    /**
     * @type {string}
     */
    @initializable()
    protected storageId: string;

    /**
     * @type {number}
     */
    private storageLength: number = 0;

    /**
     * @param randomGenerator
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator
    ) {
        this.randomGenerator = randomGenerator;
    }

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
     * @returns {number | null}
     */
    public getKeyOf (value: T): number | null {
        const key: number = this.storage.indexOf(value);

        return key >= 0 ? key : null;
    }

    /**
     * @returns {number}
     */
    public getLength (): number {
        return this.storageLength;
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
        this.storageId = this.randomGenerator.getRandomString(6);
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
    public set (key: number, value: T): void {
        if (key === this.storageLength) {
            this.storage.push(value);
        } else {
            this.storage.splice(key, 0, value);
        }

        this.storageLength++;
    }
}
