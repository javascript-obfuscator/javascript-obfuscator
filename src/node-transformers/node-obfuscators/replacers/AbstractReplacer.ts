import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IReplacer } from '../../../interfaces/node-transformers/IReplacer';

@injectable()
export abstract class AbstractReplacer implements IReplacer {
    /**
     * @type {IOptions}
     */
    protected readonly options : IOptions;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
    }

    /**
     * @param nodeValue
     * @returns {string}
     */
    public abstract replace (nodeValue: any): string;
}
