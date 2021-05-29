import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierNamesCacheStorage } from '../../interfaces/storages/identifier-names-cache/IIdentifierNamesCacheStorage';
import { IIdentifierReplacer } from '../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IIdentifierReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeIdentifiersTraverser } from '../../interfaces/node/IScopeIdentifiersTraverser';
import { IScopeThroughIdentifiersTraverserCallbackData } from '../../interfaces/node/IScopeThroughIdentifiersTraverserCallbackData';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * Renames all through identifiers
 */
@injectable()
export class ScopeThroughIdentifiersTransformer extends AbstractNodeTransformer {
    /**
     * @type {IIdentifierNamesCacheStorage}
     */
    protected readonly identifierNamesCacheStorage: IIdentifierNamesCacheStorage;

    /**
     * @type {IIdentifierReplacer}
     */
    protected readonly identifierReplacer: IIdentifierReplacer;

    /**
     * @type {IScopeIdentifiersTraverser}
     */
    protected readonly scopeIdentifiersTraverser: IScopeIdentifiersTraverser;

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
        super(randomGenerator, options);

        this.identifierReplacer = identifierReplacer;
        this.scopeIdentifiersTraverser = scopeIdentifiersTraverser;
        this.identifierNamesCacheStorage = identifierNamesCacheStorage;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.RenameIdentifiers:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isProgramNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {VariableDeclaration} programNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (programNode: ESTree.Program, parentNode: ESTree.Node): ESTree.Node {
        this.scopeIdentifiersTraverser.traverseScopeThroughIdentifiers(
            programNode,
            parentNode,
            (data: IScopeThroughIdentifiersTraverserCallbackData) => {
                const {
                    isGlobalDeclaration,
                    reference,
                    variableLexicalScopeNode
                } = data;

                const identifier: ESTree.Identifier = reference.identifier;
                const identifierName: string = identifier.name;
                const hasIdentifierNameInIdentifierNamesCache: boolean = this.identifierNamesCacheStorage.has(identifierName);

                if (!hasIdentifierNameInIdentifierNamesCache) {
                    return;
                }

                this.transformScopeThroughIdentifiers(
                    reference,
                    variableLexicalScopeNode,
                    isGlobalDeclaration
                );
            }
        );

        return programNode;
    }

    /**
     * Have to store names only for identifiers that are existing in identifier names cache
     * All other global and local `through` identifiers are expecting to be defined in
     * other files without using identifier names cache or in third-party packages
     * and these identifiers should not be renamed
     *
     * @param {Reference} reference
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {boolean} isGlobalDeclaration
     */
    protected transformScopeThroughIdentifiers (
        reference: eslintScope.Reference,
        lexicalScopeNode: TNodeWithLexicalScope,
        isGlobalDeclaration: boolean
    ): void {
        if (reference.resolved) {
            return;
        }

        const identifier: ESTree.Identifier = reference.identifier;

        this.storeIdentifierName(identifier, lexicalScopeNode, isGlobalDeclaration);
        this.replaceIdentifierName(identifier, lexicalScopeNode, reference);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {boolean} isGlobalDeclaration
     */
    protected storeIdentifierName (
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope,
        isGlobalDeclaration: boolean
    ): void {
        if (isGlobalDeclaration) {
            this.identifierReplacer.storeGlobalName(identifierNode, lexicalScopeNode);
        } else {
            this.identifierReplacer.storeLocalName(identifierNode, lexicalScopeNode);
        }
    }

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {Variable} reference
     */
    protected replaceIdentifierName (
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope,
        reference: eslintScope.Reference
    ): void {
        const newIdentifier: ESTree.Identifier = this.identifierReplacer
            .replace(identifierNode, lexicalScopeNode);

        // rename of identifier
        reference.identifier.name = newIdentifier.name;
    }
}
