import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';

import { IGlobalIdentifierNamesCacheStorage } from '../../../interfaces/storages/identifier-names-cache/IGlobalIdentifierNamesCacheStorage';
import { IIdentifierNamesGenerator } from '../../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IIdentifierReplacer } from '../../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IIdentifierReplacer';
import { IOptions } from '../../../interfaces/options/IOptions';

import { NodeFactory } from '../../../node/NodeFactory';

@injectable()
export class IdentifierReplacer implements IIdentifierReplacer {
    /**
     * @type {IGlobalIdentifierNamesCacheStorage}
     */
    private readonly identifierNamesCacheStorage: IGlobalIdentifierNamesCacheStorage;

    /**
     * @type {IIdentifierNamesGenerator}
     */
    private readonly identifierNamesGenerator: IIdentifierNamesGenerator;

    /**
     * @type {WeakMap<TNodeWithLexicalScope, Map<string, string>>}
     */
    private readonly blockScopesMap: WeakMap<TNodeWithLexicalScope, Map<string, string>> = new WeakMap();

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IGlobalIdentifierNamesCacheStorage} identifierNamesCacheStorage
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IGlobalIdentifierNamesCacheStorage)
            identifierNamesCacheStorage: IGlobalIdentifierNamesCacheStorage,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.options = options;
        this.identifierNamesCacheStorage = identifierNamesCacheStorage;
        this.identifierNamesGenerator = identifierNamesGeneratorFactory(options);
    }

    /**
     * Store identifier node `name` of global identifiers as key in map with random name as value.
     * Reserved name will be ignored.
     *
     * @param {Node} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    public storeGlobalName (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void {
        const identifierName: string = identifierNode.name;

        if (this.isReservedName(identifierName)) {
            return;
        }

        const newIdentifierName: string = this.identifierNamesGenerator.generateForGlobalScope();

        const namesMap: Map<string, string> = this.blockScopesMap.get(lexicalScopeNode) ?? new Map();

        namesMap.set(identifierName, newIdentifierName);
        this.blockScopesMap.set(lexicalScopeNode, namesMap);

        // Have to write all global identifier names to the identifier names cache storage
        if (this.options.identifierNamesCache) {
            this.identifierNamesCacheStorage.set(identifierName, newIdentifierName);
        }
    }

    /**
     * Store identifier node `name` of local identifier as key in map with random name as value.
     * Reserved name will be ignored.
     *
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    public storeLocalName (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void {
        const identifierName: string = identifierNode.name;

        if (this.isReservedName(identifierName)) {
            return;
        }

        const newIdentifierName: string = this.identifierNamesGenerator.generateForLexicalScope(lexicalScopeNode);
        const namesMap: Map<string, string> | null = this.blockScopesMap.get(lexicalScopeNode) ?? new Map();

        namesMap.set(identifierName, newIdentifierName);
        this.blockScopesMap.set(lexicalScopeNode, namesMap);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @returns {Identifier}
     */
    public replace (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): ESTree.Identifier {
        const namesMap: Map<string, string> | null = this.blockScopesMap.get(lexicalScopeNode) ?? null;

        if (!namesMap) {
            return identifierNode;
        }

        const identifierName: string | null = namesMap.get(identifierNode.name) ?? null;

        if (!identifierName) {
            return identifierNode;
        }

        return NodeFactory.identifierNode(identifierName);
    }

    /**
     * Preserve `name` to protect it from further using
     *
     * @param {Identifier} identifierNode
     */
    public preserveName (identifierNode: ESTree.Identifier): void {
        this.identifierNamesGenerator.preserveName(identifierNode.name);
    }

    /**
     * Preserve `name` to protect it from further using
     *
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    public preserveNameForLexicalScope (identifierNode: ESTree.Identifier, lexicalScopeNode: TNodeWithLexicalScope): void {
        this.identifierNamesGenerator.preserveNameForLexicalScope(identifierNode.name, lexicalScopeNode);
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    private isReservedName (name: string): boolean {
        if (!this.options.reservedNames.length) {
            return false;
        }

        return this.options.reservedNames
            .some((reservedName: string) => {
                return new RegExp(reservedName, 'g').exec(name) !== null;
            });
    }
}
