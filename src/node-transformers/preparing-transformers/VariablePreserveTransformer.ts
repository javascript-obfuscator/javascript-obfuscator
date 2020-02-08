import { inject, injectable, } from 'inversify';
import * as ESTree from 'estree';

import { TIdentifierObfuscatingReplacerFactory } from '../../types/container/node-transformers/TIdentifierObfuscatingReplacerFactory';
import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierObfuscatingReplacer } from '../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';
import { IdentifierObfuscatingReplacer } from '../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer';

import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';
import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

/**
 * Preserve non-replaceable variables
 */
@injectable()
export class VariablePreserveTransformer extends AbstractNodeTransformer {
    /**
     * @type {TNodeWithLexicalScope[]}
     */
    private readonly enteredLexicalScopesStack: TNodeWithLexicalScope[] = [];

    /**
     * @type {IIdentifierObfuscatingReplacer}
     */
    private readonly identifierObfuscatingReplacer: IIdentifierObfuscatingReplacer;

    /**
     * @param {TIdentifierObfuscatingReplacerFactory} identifierObfuscatingReplacerFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)
            identifierObfuscatingReplacerFactory: TIdentifierObfuscatingReplacerFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.identifierObfuscatingReplacer = identifierObfuscatingReplacerFactory(
            IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer
        );
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Preparing:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (NodeGuards.isNodeWithLexicalScope(node)) {
                            this.addLexicalScopeToEnteredLexicalScopesStack(node);
                        }

                        if (
                            NodeGuards.isIdentifierNode(node)
                            && parentNode
                        ) {
                            this.preserveIdentifierNameForLexicalScope(node);

                            return this.transformNode(node, parentNode);
                        }
                    },
                    leave: (node: ESTree.Node): void => {
                        if (NodeGuards.isNodeWithLexicalScope(node)) {
                            this.removeLexicalScopeFromEnteredLexicalScopesStack(node);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Identifier} identifierNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (identifierNode: ESTree.Identifier, parentNode: ESTree.Node): ESTree.Node {
        return identifierNode;
    }

    /**
     * @param {Identifier} identifierNode
     */
    private preserveIdentifierNameForLexicalScope (identifierNode: ESTree.Identifier): void {
        for (const lexicalScope of this.enteredLexicalScopesStack) {
            this.identifierObfuscatingReplacer.preserveName(identifierNode, lexicalScope);
        }
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private addLexicalScopeToEnteredLexicalScopesStack (lexicalScopeNode: TNodeWithLexicalScope): void {
        this.enteredLexicalScopesStack.push(lexicalScopeNode);
    }

    /**
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private removeLexicalScopeFromEnteredLexicalScopesStack (lexicalScopeNode: TNodeWithLexicalScope): void {
        this.enteredLexicalScopesStack.pop();
    }
}
