import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/IOptions';
import { IReplacer } from '../../../interfaces/IReplacer';
import { IStorage } from '../../../interfaces/IStorage';

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
     * @param namesMap
     * @returns {string}
     */
    public abstract replace (nodeValue: any, namesMap?: Map <string, string>): string;
}
