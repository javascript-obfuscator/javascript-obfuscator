import { IInitializable } from '../IInitializable';

export interface IMapStorage <K, V> extends IInitializable {
    /**
     * @param {K} key
     * @returns {V}
     */
    get (key: K): V;

    /**
     * @param {V} value
     * @returns {K | null}
     */
    getKeyOf (value: V): K | null;

    /**
     * @returns number
     */
    getLength (): number;

    /**
     * @returns {Map<K, V>}
     */
    getStorage (): Map <K, V>;

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
     * @param storage
     * @param mergeId
     */
    mergeWith (storage: this, mergeId: boolean): void;

    /**
     * @param {K} key
     * @param {V} value
     */
    set (key: K, value: V): void;

    /**
     * @returns string
     */
    toString (): string;
}
