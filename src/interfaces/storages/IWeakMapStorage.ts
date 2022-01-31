import { IInitializable } from '../IInitializable';

export interface IWeakMapStorage <K extends object, V> extends IInitializable {
    /**
     * @param {K} key
     * @returns {V | undefined}
     */
    get (key: K): V | undefined;

    /**
     * @param {K} key
     * @returns {V}
     */
    getOrThrow (key: K): V;

    /**
     * @returns {WeakMap<K, V>}
     */
    getStorage (): WeakMap <K, V>;

    /**
     * @returns string
     */
    getStorageId (): string;

    /**
     * @param {K} key
     * @returns {boolean}
     */
    has (key: K): boolean;

    /**
     * @param {K} key
     * @param {V} value
     */
    set (key: K, value: V): void;
}
