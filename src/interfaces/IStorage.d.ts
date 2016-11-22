export interface IStorage <T> {
    get (key: string | number): T;
    getKeyOf (value: T): string | number | null;
    getLength (): number;
    getStorage (): Map <string | number, T> | T[];
    set (key: string | number | null, value: T): void;
    toString (): string;
}
