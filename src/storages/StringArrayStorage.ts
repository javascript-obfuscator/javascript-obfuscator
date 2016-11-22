import { AbstractStorage } from './AbstractStorage';
import { Utils } from '../Utils';

export class StringArrayStorage extends AbstractStorage <string> {
    /**
     * @type {string[]}
     */
    protected storage: string[] = [];

    /**
     * @param key
     * @returns {string}
     */
    public get (key: number): string {
        const value: string | undefined = this.storage[key];

        if (!value) {
            throw new Error(`No value found in StringArray with key \`${key}\``);
        }

        return value;
    }

    /**
     * @param value
     * @returns {string | number}
     */
    public getKeyOf (value: string): string | number {
        return this.storage.indexOf(value);
    }

    /**
     * @returns {number}
     */
    public getLength (): number {
        return this.storage.length;
    }

    /**
     * @param rotationValue
     */
    public rotateArray (rotationValue: number): void {
        this.storage = Utils.arrayRotate(this.storage, rotationValue);
    }

    /**
     * @param key
     * @param value
     */
    public set (key: string | null, value: string): void {
        this.storage.push(value);
    }

    /**
     * @returns {string}
     */
    public toString (): string {
        return this.storage.map((value: string) => {
            return `'${value}'`;
        }).toString();
    }
}
