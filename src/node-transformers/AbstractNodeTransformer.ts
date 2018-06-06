import { inject, injectable } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { INodeTransformer } from '../interfaces/node-transformers/INodeTransformer';
import { IOptions } from '../interfaces/options/IOptions';
import { IRandomGenerator } from '../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../interfaces/node-transformers/IVisitor';

import { TransformationStage } from '../enums/node-transformers/TransformationStage';

@injectable()
export abstract class AbstractNodeTransformer implements INodeTransformer {
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
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public abstract getVisitor (transformationStage: TransformationStage): IVisitor | null;

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {Node | VisitorOption}
     */
    public abstract transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node | estraverse.VisitorOption;
}
