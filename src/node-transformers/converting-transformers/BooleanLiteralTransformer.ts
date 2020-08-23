import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeUtils } from '../../node/NodeUtils';
import { NodeFactory } from '../../node/NodeFactory';

@injectable()
export class BooleanLiteralTransformer extends AbstractNodeTransformer {
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
            case NodeTransformationStage.Converting:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isLiteralNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * Replaces:
     *     var foo = true;
     *     var bar = false;
     *
     * on:
     *     var foo = !![];
     *     var bar = ![];
     *
     * @param {Literal} literalNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (literalNode: ESTree.Literal, parentNode: ESTree.Node): ESTree.Node {
        if (typeof literalNode.value !== 'boolean') {
            return literalNode;
        }

        const literalValue: ESTree.SimpleLiteral['value'] = literalNode.value;

        const unaryExpressionNode: ESTree.UnaryExpression = literalValue
            ? this.getTrueUnaryExpressionNode()
            : this.getFalseUnaryExpressionNode();

        NodeUtils.parentizeNode(unaryExpressionNode, parentNode);

        return unaryExpressionNode;
    }

    /**
     * @return {ESTree.UnaryExpression}
     */
    private getTrueUnaryExpressionNode (): ESTree.UnaryExpression {
        return NodeFactory.unaryExpressionNode(
            '!',
            this.getFalseUnaryExpressionNode()
        );
    }

    /**
     * @return {ESTree.UnaryExpression}
     */
    private getFalseUnaryExpressionNode (): ESTree.UnaryExpression {
        return NodeFactory.unaryExpressionNode(
            '!',
            NodeFactory.arrayExpressionNode()
        );
    }
}
