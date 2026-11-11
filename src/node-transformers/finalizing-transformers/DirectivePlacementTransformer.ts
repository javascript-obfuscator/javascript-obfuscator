import { inject, injectable, injectFromBase } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from '@javascript-obfuscator/estraverse';
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
 *
 * Directives are collected after custom code helpers are appended at the preparing stage,
 * so they are looked up across the whole scope body rather than at its top.
 * It's safe, because the parser marks as directives only statements of the directive prologue
 */
@injectFromBase()
@injectable()
export class DirectivePlacementTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeTransformer[]}
     */
    public override readonly runAfter: NodeTransformer[] = [NodeTransformer.CustomCodeHelpersTransformer];

    /**
     * @type {WeakMap<TNodeWithLexicalScope, Directive[]>}
     */
    private readonly lexicalScopeDirectives: WeakMap<TNodeWithLexicalScope, ESTree.Directive[]> = new WeakMap<
        TNodeWithLexicalScope,
        ESTree.Directive[]
    >();

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor(
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null {
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
    public analyzeNode(
        nodeWithLexicalScopeStatements: TNodeWithLexicalScopeStatements,
        parentNode: ESTree.Node
    ): TNodeWithLexicalScopeStatements {
        if (!NodeGuards.isNodeWithLexicalScope(parentNode)) {
            return nodeWithLexicalScopeStatements;
        }

        const directiveNodes: ESTree.Directive[] = [];

        for (const statementNode of nodeWithLexicalScopeStatements.body) {
            if (NodeGuards.isDirectiveNode(statementNode)) {
                directiveNodes.push(statementNode);
            }
        }

        if (directiveNodes.length) {
            this.lexicalScopeDirectives.set(parentNode, directiveNodes);
        }

        return nodeWithLexicalScopeStatements;
    }

    /**
     * @param {TNodeWithLexicalScopeStatements} nodeWithLexicalScopeStatements
     * @param {Node | null} parentNode
     * @returns {TNodeWithLexicalScope}
     */
    public transformNode(
        nodeWithLexicalScopeStatements: TNodeWithLexicalScopeStatements,
        parentNode: ESTree.Node
    ): TNodeWithLexicalScopeStatements {
        if (!NodeGuards.isNodeWithLexicalScope(parentNode)) {
            return nodeWithLexicalScopeStatements;
        }

        const directiveNodes: ESTree.Directive[] | undefined = this.lexicalScopeDirectives.get(parentNode);

        if (directiveNodes) {
            const newDirectiveNodes: ESTree.Directive[] = directiveNodes.map((directiveNode: ESTree.Directive) => {
                const newDirectiveNode: ESTree.Directive = NodeUtils.clone(directiveNode);

                // the code generator prints the cooked value of a literal,
                // so `'use\x20strict'` would become an actual `'use strict'` directive
                if (newDirectiveNode.expression.raw !== undefined) {
                    NodeUtils.addXVerbatimPropertyTo(newDirectiveNode.expression);
                }

                return newDirectiveNode;
            });

            nodeWithLexicalScopeStatements.body = nodeWithLexicalScopeStatements.body.filter(
                (node: ESTree.Statement | ESTree.ModuleDeclaration) =>
                    !directiveNodes.includes(<ESTree.Directive>node)
            );

            NodeAppender.prepend(nodeWithLexicalScopeStatements, newDirectiveNodes);
        }

        return nodeWithLexicalScopeStatements;
    }
}
