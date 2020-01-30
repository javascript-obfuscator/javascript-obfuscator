import { inject, injectable, postConstruct } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import { IArrayStorage } from '../interfaces/storages/IArrayStorage';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';

import { initializable } from '../decorators/Initializable';

@injectable()
export abstract class ArrayStorage <V> implements IArrayStorage <V> {
    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {V[]}
     */
    @initializable()
    protected storage!: V[];

    /**
     * @type {string}
     */
    @initializable()
    protected storageId!: string;

    /**
     * @type {number}
     */
    private storageLength: number = 0;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    protected constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    @postConstruct()
    public initialize (): void {
        this.storage = [];
        this.storageId = this.randomGenerator.getRandomString(6);
    }

    /**
     * @param {number} key
     * @returns {V | undefined}
     */
    public get (key: number): V | undefined {
        return this.storage[key];
    }

    /**
     * @param {number} key
     * @returns {V}
     */
    public getOrThrow (key: number): V {
        const value: V | undefined = this.get(key);

        if (!value) {
            throw new Error(`No value found in array storage with key \`${key}\``);
        }

        return value;
    }

    /**
     * @param {V} value
     * @returns {number}
     */
    public getKeyOf (value: V): number | null {
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
     * @returns {V[]}
     */
    public getStorage (): V[] {
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
        this.storage = [...this.storage, ...storage.getStorage()];

        if (mergeId) {
            this.storageId = storage.getStorageId();
        }
    }

    /**
     * @param {number} key
     * @param {V} value
     */
    public set (key: number, value: V): void {
        if (key === this.storageLength) {
            this.storage.push(value);
        } else {
            this.storage.splice(key, 0, value);
        }

        this.storageLength++;
    }
}
