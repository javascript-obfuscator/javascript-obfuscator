import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';

import { IDeadCodeInjectionReplacer } from '../../../interfaces/node-transformers/IDeadCodeInjectionReplacer';
import { IOptions } from '../../../interfaces/options/IOptions';

@injectable()
export abstract class AbstractDeadCodeInjectionReplacer implements IDeadCodeInjectionReplacer {
    /**
     * @type {TCustomNodeFactory}
     */
    protected readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.customNodeFactory = customNodeFactory;
        this.options = options;
    }

    /**
     * @param node
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public abstract replace (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node;
}
