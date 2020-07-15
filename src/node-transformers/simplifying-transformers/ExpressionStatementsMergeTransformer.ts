import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeStatementUtils } from '../../node/NodeStatementUtils';
import { NodeUtils } from '../../node/NodeUtils';

/**
 * replaces:
 *     console.log(1);
 *     console.log(2);
 *
 * on:
 *     (console.log(1), console.log(2));
 */
@injectable()
export class ExpressionStatementsMergeTransformer extends AbstractNodeTransformer {
    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Simplifying:
                return {
                    leave: (
                        node: ESTree.Node,
                        parentNode: ESTree.Node | null
                    ): ESTree.Node | estraverse.VisitorOption | undefined => {
                        if (parentNode && NodeGuards.isExpressionStatementNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {ESTree.ExpressionStatement} expressionStatementNode
     * @param {ESTree.Node} parentNode
     * @returns {ESTree.ExpressionStatement | estraverse.VisitorOption}
     */
    public transformNode (
        expressionStatementNode: ESTree.ExpressionStatement,
        parentNode: ESTree.Node
    ): ESTree.ExpressionStatement | estraverse.VisitorOption {
        if (!NodeGuards.isNodeWithStatements(parentNode)) {
            return expressionStatementNode;
        }

        const prevStatement: TStatement | null = NodeStatementUtils.getPreviousSiblingStatement(expressionStatementNode);

        if (!prevStatement || !NodeGuards.isExpressionStatementNode(prevStatement)) {
            return expressionStatementNode;
        }

        if (NodeGuards.isSequenceExpressionNode(prevStatement.expression)) {
            prevStatement.expression.expressions.push(expressionStatementNode.expression);
        } else {
            prevStatement.expression = NodeFactory.sequenceExpressionNode([
                prevStatement.expression,
                expressionStatementNode.expression
            ]);
        }

        NodeUtils.parentizeAst(prevStatement);

        return estraverse.VisitorOption.Remove;
    }
}
