import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { IWeakMapStorage } from '../interfaces/storages/IWeakMapStorage';

import { initializable } from '../decorators/Initializable';

@injectable()
export abstract class WeakMapStorage <K extends object, V> implements IWeakMapStorage <K, V> {
    /**
     * @type {string}
     */
    @initializable()
    protected storageId!: string;

    /**
     * @type {WeakMap <K, V>}
     */
    @initializable()
    protected storage!: WeakMap <K, V>;

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
            throw new Error(`No value found in weak map storage with key \`${key}\``);
        }

        return value;
    }

    /**
     * @returns {WeakMap<K, V>}
     */
    public getStorage (): WeakMap <K, V> {
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
     * @param {K} key
     * @param {V} value
     */
    public set (key: K, value: V): void {
        this.storage.set(key, value);
    }
}
