import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { IMapStorage } from '../interfaces/storages/IMapStorage';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { initializable } from '../decorators/Initializable';

@injectable()
export abstract class MapStorage <K, V> implements IMapStorage <K, V> {
    /**
     * @type {string}
     */
    @initializable()
    protected storageId!: string;

    /**
     * @type {Map <K, V>}
     */
    @initializable()
    protected storage!: Map <K, V>;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    @postConstruct()
    public initialize (): void {
        this.storage = new Map <K, V>();
        this.storageId = this.randomGenerator.getRandomString(6);
    }

    /**
     * @param {K} key
     * @returns {V | undefined}
     */
    public get (key: K): V | undefined {
        return this.storage.get(key);
    }

    /**
     * @param {K} key
     * @returns {V}
     */
    public getOrThrow (key: K): V {
        const value: V | undefined = this.get(key);

        if (!value) {
            throw new Error(`No value found in map storage with key \`${key}\``);
        }

        return value;
    }

    /**
     * @param {V} value
     * @returns {K | null}
     */
    public getKeyOf (value: V): K | null {
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
     * @returns {Map<K, V>}
     */
    public getStorage (): Map <K, V> {
        return this.storage;
    }

    /**
     * @returns {string}
     */
    public getStorageId (): string {
        return this.storageId;
    }

    /**
     * @param {K} key
     * @returns {boolean}
     */
    public has (key: K): boolean {
        return this.storage.has(key);
    }

    /**
     * @param {this} storage
     * @param {boolean} mergeId
     */
    public mergeWith (storage: this, mergeId: boolean = false): void {
        this.storage = new Map <K, V>([...this.storage, ...storage.getStorage()]);

        if (mergeId) {
            this.storageId = storage.getStorageId();
        }
    }

    /**
     * @param {K} key
     * @param {V} value
     */
    public set (key: K, value: V): void {
        this.storage.set(key, value);
    }
}
