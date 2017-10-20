import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { IStorage } from '../interfaces/storages/IStorage';

import { initializable } from '../decorators/Initializable';

@injectable()
export abstract class MapStorage <T> implements IStorage <T> {
    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

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
     * @param {IRandomGenerator} randomGenerator
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator
    ) {
        this.randomGenerator = randomGenerator;
    }

    @postConstruct()
    public initialize (): void {
        this.storage = new Map <string | number, T>();
        this.storageId = this.randomGenerator.getRandomString(6);
    }

    /**
     * @param {string | number} key
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
     * @param {T} value
     * @returns {string | number | null}
     */
    public getKeyOf (value: T): string | number | null {
        for (const [key, storageValue] of this.storage) {
            if (value === storageValue) {
                return key;
            }
        }

        return null;
    }

    /**
     * @returns {number}
     */
    public getLength (): number {
        return this.storage.size;
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
     * @param {this} storage
     * @param {boolean} mergeId
     */
    public mergeWith (storage: this, mergeId: boolean = false): void {
        this.storage = new Map <string | number, T>([...this.storage, ...storage.getStorage()]);

        if (mergeId) {
            this.storageId = storage.getStorageId();
        }
    }

    /**
     * @param {string | number} key
     * @param {T} value
     */
    public set (key: string | number, value: T): void {
        this.storage.set(key, value);
    }
}
