import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

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
 * Renames all through identifiers. Now used directly from Dead Code Injection transformer
 */
@injectable()
export class ScopeThroughIdentifiersTransformer extends AbstractNodeTransformer {
    /**
     * @type {IIdentifierReplacer}
     */
    private readonly identifierReplacer: IIdentifierReplacer;

    /**
     * @type {IScopeIdentifiersTraverser}
     */
    private readonly scopeIdentifiersTraverser: IScopeIdentifiersTraverser;

    /**
     * @param {IIdentifierReplacer} identifierReplacer
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     * @param {IScopeIdentifiersTraverser} scopeIdentifiersTraverser
     */
    public constructor (
        @inject(ServiceIdentifiers.IIdentifierReplacer) identifierReplacer: IIdentifierReplacer,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
        @inject(ServiceIdentifiers.IScopeIdentifiersTraverser) scopeIdentifiersTraverser: IScopeIdentifiersTraverser
    ) {
        super(randomGenerator, options);

        this.identifierReplacer = identifierReplacer;
        this.scopeIdentifiersTraverser = scopeIdentifiersTraverser;
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
        this.identifierReplacer.storeLocalName(identifierNode, lexicalScopeNode);
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
        const newIdentifier: ESTree.Identifier = this.identifierReplacer
            .replace(identifierNode, lexicalScopeNode);

        // rename of identifier
        reference.identifier.name = newIdentifier.name;
    }
}
