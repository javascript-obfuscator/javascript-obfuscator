import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IReplacer } from '../../../interfaces/node-transformers/IReplacer';
import { IStorage } from '../../../interfaces/storages/IStorage';

@injectable()
export abstract class AbstractReplacer implements IReplacer {
    /**
     * @type IStorage<ICustomNode>
     */
    protected readonly customNodesStorage: IStorage<ICustomNode>;

    /**
     * @type {IOptions}
     */
    protected readonly options : IOptions;

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
     * @param nodeValue
     * @returns {string}
     */
    public abstract replace (nodeValue: any): string;
}
