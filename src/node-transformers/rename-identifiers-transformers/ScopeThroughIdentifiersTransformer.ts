import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as eslintScope from 'eslint-scope';
import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeIdentifiersTraverser } from '../../interfaces/node/IScopeIdentifiersTraverser';
import { IScopeThroughIdentifiersTraverserCallbackData } from '../../interfaces/node/IScopeThroughIdentifiersTraverserCallbackData';
import { IThroughIdentifierReplacer } from '../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IThroughIdentifierReplacer';
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
     * @type {IScopeIdentifiersTraverser}
     */
    protected readonly scopeIdentifiersTraverser: IScopeIdentifiersTraverser;

    /**
     * @type {IThroughIdentifierReplacer}
     */
    protected readonly throughIdentifierReplacer: IThroughIdentifierReplacer;

    /**
     * @param {IThroughIdentifierReplacer} throughIdentifierReplacer
     * @param {IScopeIdentifiersTraverser} scopeIdentifiersTraverser
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IThroughIdentifierReplacer) throughIdentifierReplacer: IThroughIdentifierReplacer,
        @inject(ServiceIdentifiers.IScopeIdentifiersTraverser) scopeIdentifiersTraverser: IScopeIdentifiersTraverser,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.throughIdentifierReplacer = throughIdentifierReplacer;
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

                this.transformScopeThroughIdentifiers(
                    reference,
                    variableLexicalScopeNode
                );
            }
        );

        return programNode;
    }

    /**
     * @param {Reference} reference
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    protected transformScopeThroughIdentifiers (
        reference: eslintScope.Reference,
        lexicalScopeNode: TNodeWithLexicalScope
    ): void {
        if (reference.resolved) {
            return;
        }

        const identifier: ESTree.Identifier = reference.identifier;

        this.storeIdentifierName(identifier);
        this.replaceIdentifierName(identifier, reference);
    }

    /**
     * @param {Identifier} identifierNode
     */
    protected storeIdentifierName (
        identifierNode: ESTree.Identifier
    ): void {
        this.throughIdentifierReplacer.store(identifierNode);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Variable} reference
     */
    protected replaceIdentifierName (
        identifierNode: ESTree.Identifier,
        reference: eslintScope.Reference
    ): void {
        const newIdentifier: ESTree.Identifier = this.throughIdentifierReplacer.replace(identifierNode);

        // rename of identifier
        reference.identifier.name = newIdentifier.name;
    }
}
