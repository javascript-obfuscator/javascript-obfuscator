import { IInitializable } from '../IInitializable';

export interface IStorage <T> extends IInitializable {
    /**
     * @param key
     * @returns T
     */
    get (key: string | number): T;

    /**
     * @param value
     * @returns string | number | null
     */
    getKeyOf (value: T): string | number | null;

    /**
     * @returns number
     */
    getLength (): number;

    /**
     * @returns any
     */
    getStorage (): any;

    /**
     * @returns string
     */
    getStorageId (): string;

    /**
     * @param args
     */
    initialize (...args: any[]): void;

    /**
     * @param storage
     * @param mergeId
     */
    mergeWith (storage: this, mergeId: boolean): void;

    /**
     * @param key
     * @param value
     */
    set (key: string | number | null, value: T): void;

    /**
     * @returns string
     */
    toString (): string;
}
