import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';
import { TNodeWithLexicalScopeStatements } from '../../types/node/TNodeWithLexicalScopeStatements';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeUtils } from '../../node/NodeUtils';

/**
 * It's easier to fix "use strict"; placement after obfuscation as a separate stage
 * than ignore this directive in other transformers like control flow and dead code injection transformers
 */
@injectable()
export class DirectivePlacementTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeTransformer[]}
     */
    public readonly runAfter: NodeTransformer[] = [
        NodeTransformer.CustomCodeHelpersTransformer
    ];

    /**
     * @type {WeakMap<TNodeWithLexicalScope, Directive>}
     */
    private readonly lexicalScopeDirectives: WeakMap<
        TNodeWithLexicalScope,
        ESTree.Directive
    > = new WeakMap<TNodeWithLexicalScope, ESTree.Directive>();

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions,
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Preparing:
                return {
                    enter: (
                        node: ESTree.Node,
                        parentNode: ESTree.Node | null
                    ): ESTree.Node | estraverse.VisitorOption | undefined => {
                        if (parentNode && NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode)) {
                            return this.analyzeNode(node, parentNode);
                        }
                    }
                };

            case NodeTransformationStage.Finalizing:
                return {
                    enter: (
                        node: ESTree.Node,
                        parentNode: ESTree.Node | null
                    ): ESTree.Node | estraverse.VisitorOption | undefined => {
                        if (parentNode && NodeGuards.isNodeWithLexicalScopeStatements(node, parentNode)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {TNodeWithLexicalScopeStatements} nodeWithLexicalScopeStatements
     * @param {Node} parentNode
     * @returns {TNodeWithLexicalScopeStatements}
     */
    public analyzeNode (
        nodeWithLexicalScopeStatements: TNodeWithLexicalScopeStatements,
        parentNode: ESTree.Node
    ): TNodeWithLexicalScopeStatements {
        if (!NodeGuards.isNodeWithLexicalScope(parentNode)) {
            return nodeWithLexicalScopeStatements;
        }

        const firstStatementNode = nodeWithLexicalScopeStatements.body[0] ?? null;

        if (firstStatementNode && NodeGuards.isDirectiveNode(firstStatementNode)) {
            this.lexicalScopeDirectives.set(parentNode, firstStatementNode);
        }

        return nodeWithLexicalScopeStatements;
    }

    /**
     * @param {TNodeWithLexicalScopeStatements} nodeWithLexicalScopeStatements
     * @param {Node | null} parentNode
     * @returns {TNodeWithLexicalScope}
     */
    public transformNode (
        nodeWithLexicalScopeStatements: TNodeWithLexicalScopeStatements,
        parentNode: ESTree.Node
    ): TNodeWithLexicalScopeStatements {
        if (!NodeGuards.isNodeWithLexicalScope(parentNode)) {
            return nodeWithLexicalScopeStatements;
        }

        const directiveNode: ESTree.Directive | undefined = this.lexicalScopeDirectives.get(parentNode);

        if (directiveNode) {
            const newDirectiveNode: ESTree.Directive = NodeUtils.clone(directiveNode);

            // append new directive node at the top of lexical scope statements
            NodeAppender.prepend(nodeWithLexicalScopeStatements, [newDirectiveNode]);

            // remove found directive node
            let isDirectiveNodeRemoved: boolean = false;
            estraverse.replace(nodeWithLexicalScopeStatements, {
                enter: (node: ESTree.Node): estraverse.VisitorOption | undefined => {
                    if (isDirectiveNodeRemoved) {
                        return estraverse.VisitorOption.Break;
                    }

                    if (node === directiveNode) {
                        isDirectiveNodeRemoved = true;

                        return estraverse.VisitorOption.Remove;
                    }
                }
            });
        }

        return nodeWithLexicalScopeStatements;
    }
}
