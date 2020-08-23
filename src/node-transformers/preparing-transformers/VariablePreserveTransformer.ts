import { inject, injectable, } from 'inversify';
import * as ESTree from 'estree';
import * as eslintScope from 'eslint-scope';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierReplacer } from '../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IIdentifierReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeIdentifiersTraverser } from '../../interfaces/node/IScopeIdentifiersTraverser';
import { IScopeIdentifiersTraverserCallbackData } from '../../interfaces/node/IScopeIdentifiersTraverserCallbackData';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * Preserve non-replaceable variables
 */
@injectable()
export class VariablePreserveTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeTransformer.ParentificationTransformer[]}
     */
    public readonly runAfter: NodeTransformer[] = [
        NodeTransformer.ParentificationTransformer
    ];

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

        this.preserveScopeVariableIdentifiers = this.preserveScopeVariableIdentifiers.bind(this);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Preparing:
            case NodeTransformationStage.Converting:
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
        this.scopeIdentifiersTraverser.traverseScopeIdentifiers(
            programNode,
            parentNode,
            this.preserveScopeVariableIdentifiers
        );

        return programNode;
    }

    /**
     * @param {IScopeIdentifiersTraverserCallbackData} data
     */
    private preserveScopeVariableIdentifiers (data: IScopeIdentifiersTraverserCallbackData): void {
        const {
            isGlobalDeclaration,
            isBubblingDeclaration,
            variable,
            variableScope
        } = data;

        for (const identifier of variable.identifiers) {
            if (isGlobalDeclaration || isBubblingDeclaration) {
                this.preserveIdentifierNameForRootLexicalScope(identifier);
            } else {
                this.preserveIdentifierNameForLexicalScope(identifier, variableScope);
            }
        }
    }

    /**
     * @param {Identifier} identifierNode
     */
    private preserveIdentifierNameForRootLexicalScope (identifierNode: ESTree.Identifier): void {
        this.identifierReplacer.preserveName(identifierNode);
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Scope} variableScope
     */
    private preserveIdentifierNameForLexicalScope (
        identifierNode: ESTree.Identifier,
        variableScope: eslintScope.Scope
    ): void {
        const lexicalScopeNode: TNodeWithLexicalScope | null = NodeGuards.isNodeWithLexicalScope(variableScope.block)
            ? variableScope.block
            : null;

        if (!lexicalScopeNode) {
            return;
        }

        this.identifierReplacer.preserveNameForLexicalScope(identifierNode, lexicalScopeNode);
    }
}
