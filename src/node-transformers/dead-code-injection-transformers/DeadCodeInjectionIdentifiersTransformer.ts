import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierNamesCacheStorage } from '../../interfaces/storages/identifier-names-cache/IIdentifierNamesCacheStorage';
import { IIdentifierReplacer } from '../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IIdentifierReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeIdentifiersTraverser } from '../../interfaces/node/IScopeIdentifiersTraverser';

import { ScopeThroughIdentifiersTransformer } from '../rename-identifiers-transformers/ScopeThroughIdentifiersTransformer';

/**
 * Renames all scope through identifiers for Dead Code Injection
 */
@injectable()
export class DeadCodeInjectionIdentifiersTransformer extends ScopeThroughIdentifiersTransformer {
    /**
     * @param {IIdentifierReplacer} identifierReplacer
     * @param {IRandomGenerator} randomGenerator
     * @param {IScopeIdentifiersTraverser} scopeIdentifiersTraverser
     * @param {IIdentifierNamesCacheStorage} identifierNamesCacheStorage
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IIdentifierReplacer) identifierReplacer: IIdentifierReplacer,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IScopeIdentifiersTraverser)
            scopeIdentifiersTraverser: IScopeIdentifiersTraverser,
        @inject(ServiceIdentifiers.IIdentifierNamesCacheStorage)
            identifierNamesCacheStorage: IIdentifierNamesCacheStorage,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            identifierReplacer,
            randomGenerator,
            scopeIdentifiersTraverser,
            identifierNamesCacheStorage,
            options
        );
    }

    /**
     * Override parent method, because we have to store only local scope names
     *
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    protected override storeIdentifierName (
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope
    ): void {
        this.identifierReplacer.storeLocalName(identifierNode, lexicalScopeNode);
    }
}
