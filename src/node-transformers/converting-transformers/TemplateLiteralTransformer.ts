import { inject, injectable, injectFromBase } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeUtils } from '../../node/NodeUtils';

/**
 * Transform ES2015 template literals to ES5
 * Thanks to Babel for algorithm
 */
@injectFromBase()
@injectable()
export class TemplateLiteralTransformer extends AbstractNodeTransformer {
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
     * @param {NodeGuards} node
     * @returns {boolean}
     */
    private static isLiteralNodeWithStringValue(node: ESTree.Node | undefined): boolean {
        return !!node && NodeGuards.isLiteralNode(node) && typeof node.value === 'string';
    }

    /**
     * Unlike `+`, that converts substitutions with the `default` hint of `ToPrimitive` and prefers `valueOf`,
     * `String.prototype.concat` converts them with `ToString`, as template literals do.
     *
     * Each `concat` call gets at most one non-literal substitution, so each substitution is converted
     * before the next one is evaluated, as in template literals.
     *
     * @param {Expression[]} nodes
     * @returns {CallExpression}
     */
    private static buildConcatCallExpressionNode(nodes: ESTree.Expression[]): ESTree.CallExpression {
        let callExpressionNode: ESTree.CallExpression | null = null;
        let callExpressionHasNonLiteralArgument: boolean = false;

        const nodesLength: number = nodes.length;

        for (let i: number = 1; i < nodesLength; i++) {
            const node: ESTree.Expression = nodes[i];
            const isLiteralNode: boolean = NodeGuards.isLiteralNode(node);

            if (callExpressionNode && (isLiteralNode || !callExpressionHasNonLiteralArgument)) {
                callExpressionNode.arguments.push(node);
                callExpressionHasNonLiteralArgument = callExpressionHasNonLiteralArgument || !isLiteralNode;

                continue;
            }

            callExpressionNode = NodeFactory.callExpressionNode(
                NodeFactory.memberExpressionNode(callExpressionNode ?? nodes[0], NodeFactory.identifierNode('concat')),
                [node]
            );
            callExpressionHasNonLiteralArgument = !isLiteralNode;
        }

        return <ESTree.CallExpression>callExpressionNode;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor(nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Converting:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode && NodeGuards.isTemplateLiteralNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {ESTree.TemplateLiteral} templateLiteralNode
     * @param {ESTree.Node} parentNode
     * @returns {ESTree.Node}
     */
    public transformNode(templateLiteralNode: ESTree.TemplateLiteral, parentNode: ESTree.Node): ESTree.Node {
        if (NodeGuards.isTaggedTemplateExpressionNode(parentNode)) {
            return templateLiteralNode;
        }

        return this.transformTemplateLiteralNode(templateLiteralNode, parentNode);
    }

    /**
     * @param {ESTree.TemplateLiteral} templateLiteralNode
     * @param {ESTree.Node} parentNode
     * @returns {ESTree.Expression}
     */
    private transformTemplateLiteralNode(
        templateLiteralNode: ESTree.TemplateLiteral,
        parentNode: ESTree.Node
    ): ESTree.Expression {
        const templateLiteralExpressions: ESTree.Expression[] = templateLiteralNode.expressions;

        const nodes: ESTree.Expression[] = [];

        const quasis: ESTree.TemplateElement[] = templateLiteralNode.quasis;
        const quasisLength: number = quasis.length;

        for (let i: number = 0; i < quasisLength; i++) {
            const templateElement: ESTree.TemplateElement = quasis[i];

            if (templateElement.value.cooked === undefined || templateElement.value.cooked === null) {
                continue;
            }

            nodes.push(NodeFactory.literalNode(templateElement.value.cooked));

            const expression: ESTree.Expression | undefined = templateLiteralExpressions[i];

            if (!expression) {
                continue;
            }

            nodes.push(expression);
        }

        const filteredNodes: ESTree.Expression[] = nodes.filter((node: ESTree.Literal | ESTree.Expression) => {
            return !(NodeGuards.isLiteralNode(node) && node.value === '');
        });

        // ensure the first node is a string, so `concat` can be called on it
        if (!TemplateLiteralTransformer.isLiteralNodeWithStringValue(filteredNodes[0])) {
            filteredNodes.unshift(NodeFactory.literalNode(''));
        }

        const transformedNode: ESTree.Expression =
            filteredNodes.length > 1
                ? TemplateLiteralTransformer.buildConcatCallExpressionNode(filteredNodes)
                : filteredNodes[0];

        NodeUtils.parentizeAst(transformedNode);
        NodeUtils.parentizeNode(transformedNode, parentNode);

        return transformedNode;
    }
}
