import { inject, injectable, } from 'inversify';
import * as ESTree from 'estree';
import * as eslintScope from 'eslint-scope';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IScopeIdentifiersTraverser } from '../../interfaces/node/IScopeIdentifiersTraverser';
import { IScopeIdentifiersTraverserCallbackData } from '../../interfaces/node/IScopeIdentifiersTraverserCallbackData';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { IdentifierObfuscatingReplacer } from '../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * Preserve non-replaceable variables
 */
@injectable()
export class VariablePreserveTransformer extends AbstractNodeTransformer {
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
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Preparing:
            case TransformationStage.Converting:
            case TransformationStage.Obfuscating:
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
        this.scopeIdentifiersTraverser.traverse(
            programNode,
            parentNode,
            (data: IScopeIdentifiersTraverserCallbackData) => {
                const {
                    isGlobalDeclaration,
                    variable,
                    variableScope
                } = data;

                this.preserveScopeVariableIdentifiers(
                    variable,
                    variableScope,
                    isGlobalDeclaration
                );
            }
        );

        return programNode;
    }

    /**
     * @param {Variable} variable
     * @param {Scope} variableScope
     * @param {boolean} isGlobalDeclaration
     */
    private preserveScopeVariableIdentifiers (
        variable: eslintScope.Variable,
        variableScope: eslintScope.Scope,
        isGlobalDeclaration: boolean
    ): void {
        for (const identifier of variable.identifiers) {
            if (isGlobalDeclaration) {
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
        this.identifierObfuscatingReplacer.preserveName(identifierNode);
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

        this.identifierObfuscatingReplacer.preserveNameForLexicalScope(identifierNode, lexicalScopeNode);
    }
}
