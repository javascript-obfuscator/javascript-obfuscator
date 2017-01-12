import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IObfuscationReplacer } from '../../../interfaces/node-transformers/IObfuscationReplacer';

@injectable()
export abstract class AbstractReplacer implements IObfuscationReplacer {
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
     * @param nodeValue
     * @param nodeIdentifier
     * @returns {string}
     */
    public abstract replace (nodeValue: any, nodeIdentifier?: number): string;
}
