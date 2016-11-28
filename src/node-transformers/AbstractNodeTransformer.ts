import { injectable, inject } from 'inversify';

import * as ESTree from 'estree';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { INodeTransformer } from '../interfaces/INodeTransformer';
import { IOptions } from '../interfaces/IOptions';
import { IStorage } from '../interfaces/IStorage';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

@injectable()
export abstract class AbstractNodeTransformer implements INodeTransformer {
    /**
     * @type IStorage<ICustomNode>
     */
    protected readonly customNodesStorage: IStorage<ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @param customNodesStorage
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.customNodesStorage = customNodesStorage;
        this.options = options;
    }

    /**
     * @param node
     * @param parentNode
     */
    public abstract transformNode (node: ESTree.Node, parentNode?: ESTree.Node): void;
}
