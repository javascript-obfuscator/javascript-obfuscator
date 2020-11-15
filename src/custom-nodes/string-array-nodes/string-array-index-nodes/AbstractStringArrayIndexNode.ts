import { inject, injectable } from 'inversify';

import * as ESTree from 'estree';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStringArrayIndexNode } from '../../../interfaces/custom-nodes/string-array-nodes/IStringArrayIndexNode';

import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

@injectable()
export abstract class AbstractStringArrayIndexNode implements IStringArrayIndexNode {
    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {IRandomGenerator}
     */
    protected readonly randomGenerator: IRandomGenerator;

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    protected constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;
    }

    /**
     * @param {number} index
     * @returns {Expression}
     */
    public abstract getNode (index: number): ESTree.Expression;
}
