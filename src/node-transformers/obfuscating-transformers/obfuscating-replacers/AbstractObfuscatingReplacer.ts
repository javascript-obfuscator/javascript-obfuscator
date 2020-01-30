import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';

import { IObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IObfuscatingReplacer';
import { IOptions } from '../../../interfaces/options/IOptions';

@injectable()
export abstract class AbstractObfuscatingReplacer implements IObfuscatingReplacer {
    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
    }

    /**
     * @param {Node} node
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @returns {Node}
     */
    public abstract replace (node: ESTree.Node, lexicalScopeNode?: TNodeWithLexicalScope): ESTree.Node;
}
