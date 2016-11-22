export interface IStorage <T> {
    get (key: string | number): T;
    getKeyOf (value: T): string | number | null;
    getLength (): number;
    getStorage (): Map <string, T> | T[];
    set (key: string | null, value: T): void;
    toString (): string;
}
