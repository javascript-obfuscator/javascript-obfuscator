import { injectable } from 'inversify';

import { ArrayStorage } from '../ArrayStorage';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';
import { Utils } from '../../utils/Utils';

@injectable()
export class StringArrayStorage extends ArrayStorage <string> {
    constructor () {
        super();

        this.initialize();
    }

    /**
     * @param args
     */
    public initialize (...args: any[]): void {
        super.initialize(args);

        this.storageId = RandomGeneratorUtils.getRandomVariableName(4, false, false);
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
