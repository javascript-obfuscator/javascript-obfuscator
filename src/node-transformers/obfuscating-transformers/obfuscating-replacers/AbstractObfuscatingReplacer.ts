import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IObfuscatingReplacer';
import { IOptions } from '../../../interfaces/options/IOptions';

@injectable()
export abstract class AbstractObfuscatingReplacer implements IObfuscatingReplacer {
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
     * @returns {ESTree.Node}
     */
    public abstract replace (nodeValue: any, nodeIdentifier?: number): ESTree.Node;
}
