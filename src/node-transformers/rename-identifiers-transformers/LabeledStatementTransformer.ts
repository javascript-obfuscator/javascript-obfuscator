import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithLexicalScope } from '../../types/node/TNodeWithLexicalScope';

import { IIdentifierReplacer } from '../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IIdentifierReplacer';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeLexicalScopeUtils } from '../../node/NodeLexicalScopeUtils';

/**
 * replaces:
 *     label: {
 *          for (var i = 0; i < 1000; i++) {
 *              break label;
 *          }
 *     }
 *
 * on:
 *     _0x12d45f: {
 *          for (var i = 0; i < 1000; i++) {
 *              break _0x12d45f;
 *          }
 *     }
 *
 */
@injectable()
export class LabeledStatementTransformer extends AbstractNodeTransformer {
    /**
     * @type {IIdentifierReplacer}
     */
    private readonly identifierReplacer: IIdentifierReplacer;

    /**
     * @param {IIdentifierReplacer} identifierReplacer
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IIdentifierReplacer) identifierReplacer: IIdentifierReplacer,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.identifierReplacer = identifierReplacer;
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
                        if (parentNode && NodeGuards.isLabeledStatementNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {LabeledStatement} labeledStatementNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (labeledStatementNode: ESTree.LabeledStatement, parentNode: ESTree.Node): ESTree.Node {
        const lexicalScopeNode: TNodeWithLexicalScope | undefined = NodeLexicalScopeUtils.getLexicalScope(labeledStatementNode);

        if (!lexicalScopeNode) {
            return labeledStatementNode;
        }

        this.storeLabeledStatementName(labeledStatementNode, lexicalScopeNode);
        this.replaceLabeledStatementName(labeledStatementNode, lexicalScopeNode);

        return labeledStatementNode;
    }

    /**
     * @param {LabeledStatement} labeledStatementNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private storeLabeledStatementName (
        labeledStatementNode: ESTree.LabeledStatement,
        lexicalScopeNode: TNodeWithLexicalScope
    ): void {
        this.identifierReplacer.storeLocalName(labeledStatementNode.label, lexicalScopeNode);
    }

    /**
     * @param {LabeledStatement} labeledStatementNode
     * @param {TNodeWithLexicalScope} lexicalScopeNode
     */
    private replaceLabeledStatementName (
        labeledStatementNode: ESTree.LabeledStatement,
        lexicalScopeNode: TNodeWithLexicalScope
    ): void {
        estraverse.replace(labeledStatementNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): void => {
                if (parentNode && NodeGuards.isLabelIdentifierNode(node, parentNode)) {
                    const newIdentifier: ESTree.Identifier = this.identifierReplacer
                        .replace(node, lexicalScopeNode);

                    node.name = newIdentifier.name;
                }
            }
        });
    }
}
