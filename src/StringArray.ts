import { Utils } from './Utils';

export class StringArray {
    /**
     * @type {string[]}
     */
    private array: string[] = [];

    /**
     * @param value
     */
    public addToArray (value: string): void {
        this.array.push(value);
    }

    /**
     * @returns {string[]}
     */
    public getArray (): string[] {
        return this.array;
    }

    /**
     * @param value
     * @returns {number}
     */
    public getIndexOf(value: string): number {
        return this.array.indexOf(value);
    }

    /**
     * @returns {number}
     */
    public getLength (): number {
        return this.array.length;
    }

    /**
     * @param rotationValue
     */
    public rotateArray (rotationValue: number): void {
        this.array = Utils.arrayRotate(this.array, rotationValue);
    }

    /**
     * @returns {string}
     */
    public toString (): string {
        return this.array.map((value: string) => {
            return `'${value}'`;
        }).toString()
    }
}
