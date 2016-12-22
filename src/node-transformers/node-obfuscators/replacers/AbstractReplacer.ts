import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IObfuscatorReplacer } from '../../../interfaces/node-transformers/IObfuscatorReplacer';

@injectable()
export abstract class AbstractReplacer implements IObfuscatorReplacer {
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
