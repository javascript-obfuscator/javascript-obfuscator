import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { IArrayUtils } from '../../interfaces/utils/IArrayUtils';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { ArrayStorage } from '../ArrayStorage';
import { RandomGenerator } from '../../utils/RandomGenerator';

@injectable()
export class StringArrayStorage extends ArrayStorage <string> {
    /**
     * @type {IArrayUtils}
     */
    private readonly arrayUtils: IArrayUtils;

    /**
     * @param {IArrayUtils} arrayUtils
     * @param {IRandomGenerator} randomGenerator
     */
    constructor (
        @inject(ServiceIdentifiers.IArrayUtils) arrayUtils: IArrayUtils,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator
    ) {
        super(randomGenerator);

        this.arrayUtils = arrayUtils;

        this.initialize();
    }

    /**
     * @param {any[]} args
     */
    public initialize (...args: any[]): void {
        super.initialize(args);

        this.storageId = this.randomGenerator.getRandomString(4, RandomGenerator.randomGeneratorPoolHexadecimal);
    }

    /**
     * @param {number} rotationValue
     */
    public rotateArray (rotationValue: number): void {
        this.storage = this.arrayUtils.arrayRotate(this.storage, rotationValue);
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
