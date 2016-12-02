import { ArrayStorage } from '../ArrayStorage';
import { Utils } from '../../Utils';

export class StringArrayStorage extends ArrayStorage <string> {
    constructor () {
        super();

        this.initialize();
    }

    /**
     * @param rotationValue
     */
    public rotateArray (rotationValue: number): void {
        this.storage = Utils.arrayRotate(this.storage, rotationValue);
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
