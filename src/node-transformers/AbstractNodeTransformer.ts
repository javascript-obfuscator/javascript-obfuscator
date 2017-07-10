import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { INodeTransformer } from '../interfaces/node-transformers/INodeTransformer';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../interfaces/IVisitor';

@injectable()
export abstract class AbstractNodeTransformer implements INodeTransformer {
    /**
     * @type {number}
     */
    protected nodeIdentifier: number;

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
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.randomGenerator = randomGenerator;
        this.options = options;

        this.nodeIdentifier = this.randomGenerator.getRandomInteger(0, 10000);
    }

    /**
     * @returns {IVisitor}
     */
    public abstract getVisitor (): IVisitor;

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {Node}
     */
    public abstract transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node;
}
