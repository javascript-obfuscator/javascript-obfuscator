import { inject, injectable } from 'inversify';
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

        // since `+` is left-to-right associative
        // ensure the first node is a string if first/second isn't
        if (
            !TemplateLiteralTransformer.isLiteralNodeWithStringValue(filteredNodes[0]) &&
            !TemplateLiteralTransformer.isLiteralNodeWithStringValue(filteredNodes[1])
        ) {
            filteredNodes.unshift(NodeFactory.literalNode(''));
        }

        let transformedNode: ESTree.Node;

        if (filteredNodes.length > 1) {
            let root: ESTree.BinaryExpression = NodeFactory.binaryExpressionNode(
                '+',
                <ESTree.Literal>filteredNodes[0],
                filteredNodes[1]
            );

            // Start from index 2 since we already used 0 and 1
            const filteredNodesLength: number = filteredNodes.length;
            for (let i: number = 2; i < filteredNodesLength; i++) {
                root = NodeFactory.binaryExpressionNode('+', root, filteredNodes[i]);
            }

            transformedNode = root;
        } else {
            transformedNode = filteredNodes[0];
        }

        NodeUtils.parentizeAst(transformedNode);
        NodeUtils.parentizeNode(transformedNode, parentNode);

        return transformedNode;
    }
}
