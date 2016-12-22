import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { INodeTransformer } from '../interfaces/node-transformers/INodeTransformer';
import { IOptions } from '../interfaces/options/IOptions';

import { RandomGeneratorUtils } from '../utils/RandomGeneratorUtils';

@injectable()
export abstract class AbstractNodeTransformer implements INodeTransformer {
    /**
     * @type {number}
     */
    protected nodeIdentifier: number = RandomGeneratorUtils.getRandomInteger(0, 10000);

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
    }

    /**
     * @param node
     * @param parentNode
     */
    public abstract transformNode (node: ESTree.Node, parentNode?: ESTree.Node): void;
}
