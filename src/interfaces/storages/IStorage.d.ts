import { IInitializable } from '../IInitializable';

export interface IStorage <T> extends IInitializable {
    get (key: string | number): T;
    getKeyOf (value: T): string | number | null;
    getLength (): number;
    getStorage (): any;
    initialize (...args: any[]): void;
    set (key: string | number | null, value: T): void;
    toString (): string;
}
