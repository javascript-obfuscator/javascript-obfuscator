export interface IStorage <T> {
    get (key: string | number): T;
    getKeyOf (value: T): string | number | null;
    getLength (): number;
    getStorage (): any;
    set (key: string | number | null, value: T): void;
    toString (): string;
}
