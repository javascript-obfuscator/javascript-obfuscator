import { IInitializable } from '../IInitializable';

export interface IArrayStorage <V> extends IInitializable {
    /**
     * @param {number} key
     * @returns {V | undefined}
     */
    delete (key: number): V | undefined;

    /**
     * @param {number} key
     * @returns {V | undefined}
     */
    get (key: number): V | undefined;

    /**
     * @param {number} key
     * @returns {V}
     */
    getOrThrow (key: number): V;

    /**
     * @param value
     * @returns number | null
     */
    getKeyOf (value: V): number | null;

    /**
     * @returns number
     */
    getLength (): number;

    /**
     * @returns {V[]}
     */
    getStorage (): V[];

    /**
     * @returns string
     */
    getStorageId (): string;

    /**
     * @param storage
     * @param mergeId
     */
    mergeWith (storage: this, mergeId: boolean): void;

    /**
     * @param {number} key
     * @param {V} value
     */
    set (key: number, value: V): void;

    /**
     * @returns string
     */
    toString (): string;
}
