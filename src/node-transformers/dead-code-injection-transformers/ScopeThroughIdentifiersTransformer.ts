import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeIdentifiersTraverser } from '../../interfaces/node/IScopeIdentifiersTraverser';
import { IScopeThroughIdentifiersTraverserCallbackData } from '../../interfaces/node/IScopeThroughIdentifiersTraverserCallbackData';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { IdentifierObfuscatingReplacer } from '../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * Renames all through identifiers for Dead Code Injection
 */
@injectable()
export class ScopeThroughIdentifiersTransformer extends AbstractNodeTransformer {
    /**
     * @type {IIdentifierObfuscatingReplacer}
     */
    private readonly identifierObfuscatingReplacer: IIdentifierObfuscatingReplacer;

    /**
     * @type {IScopeIdentifiersTraverser}
     */
    private readonly scopeIdentifiersTraverser: IScopeIdentifiersTraverser;

    /**
     * @param {TIdentifierObfuscatingReplacerFactory} identifierObfuscatingReplacerFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IScopeIdentifiersTraverser} scopeIdentifiersTraverser
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)
            identifierObfuscatingReplacerFactory: TIdentifierObfuscatingReplacerFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IScopeIdentifiersTraverser) scopeIdentifiersTraverser: IScopeIdentifiersTraverser
    ) {
        super(randomGenerator, options);

        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(
            IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer
        );
        this.scopeIdentifiersTraverser = scopeIdentifiersTraverser;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.DeadCodeInjection:
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
                    reference,
                    variableLexicalScopeNode
                } = data;

                this.transformScopeThroughIdentifiers(reference, variableLexicalScopeNode);
            }
        );

        return programNode;
    }

    /**
     * @param {Reference} reference
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private transformScopeThroughIdentifiers (
        reference: eslintScope.Reference,
        lexicalScopeNode: TNodeWithLexicalScope,
    ): void {
        if (reference.resolved) {
            return;
        }

        const identifier: ESTree.Identifier = reference.identifier;

        this.storeIdentifierName(identifier, lexicalScopeNode);
        this.replaceIdentifierName(identifier, lexicalScopeNode, reference);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private storeIdentifierName (
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope
    ): void {
        this.identifierObfuscatingReplacer.storeLocalName(identifierNode, lexicalScopeNode);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     * @param {Variable} reference
     */
    private replaceIdentifierName (
        identifierNode: ESTree.Identifier,
        lexicalScopeNode: TNodeWithLexicalScope,
        reference: eslintScope.Reference
    ): void {
        const newIdentifier: ESTree.Identifier = this.identifierObfuscatingReplacer
            .replace(identifierNode, lexicalScopeNode);

        // rename of identifier
        reference.identifier.name = newIdentifier.name;
    }
}
