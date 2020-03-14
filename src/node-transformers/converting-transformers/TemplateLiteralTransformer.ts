import { inject, injectable, } from 'inversify';
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
    public constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeGuards} node
     * @returns {boolean}
     */
    private static isLiteralNodeWithStringValue (node: ESTree.Node | undefined): boolean {
        return !!node && NodeGuards.isLiteralNode(node) && typeof node.value === 'string';
    }

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     * @returns {boolean}
     */
    private static isValidTemplateLiteralNode (node: ESTree.Node, parentNode: ESTree.Node): node is ESTree.TemplateLiteral {
        return NodeGuards.isTemplateLiteralNode(node) && !NodeGuards.isTaggedTemplateExpressionNode(parentNode);
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
                        if (parentNode && TemplateLiteralTransformer.isValidTemplateLiteralNode(node, parentNode)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {TemplateLiteral} templateLiteralNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (templateLiteralNode: ESTree.TemplateLiteral, parentNode: ESTree.Node): ESTree.Node {
        const templateLiteralExpressions: ESTree.Expression[] = templateLiteralNode.expressions;

        let nodes: ESTree.Expression[] = [];

        templateLiteralNode.quasis.forEach((templateElement: ESTree.TemplateElement) => {
            nodes.push(NodeFactory.literalNode(templateElement.value.cooked));

            const expression: ESTree.Expression | undefined = templateLiteralExpressions.shift();

            if (!expression) {
                return;
            }

            nodes.push(expression);
        });

        nodes = nodes.filter((node: ESTree.Literal | ESTree.Expression) => {
            return !(NodeGuards.isLiteralNode(node) && node.value === '');
        });

        // since `+` is left-to-right associative
        // ensure the first node is a string if first/second isn't
        if (
            !TemplateLiteralTransformer.isLiteralNodeWithStringValue(nodes[0]) &&
            !TemplateLiteralTransformer.isLiteralNodeWithStringValue(nodes[1])
        ) {
            nodes.unshift(NodeFactory.literalNode(''));
        }

        let transformedNode: ESTree.Node;

        if (nodes.length > 1) {
            let root: ESTree.BinaryExpression = NodeFactory.binaryExpressionNode(
                '+',
                <ESTree.Literal>nodes.shift(),
                <ESTree.Expression>nodes.shift()
            );

            nodes.forEach((node: ESTree.Literal | ESTree.Expression) => {
                root = NodeFactory.binaryExpressionNode('+', root, node);
            });

            transformedNode = root;
        } else {
            transformedNode = nodes[0];
        }

        NodeUtils.parentizeAst(transformedNode);
        NodeUtils.parentizeNode(transformedNode, parentNode);

        return transformedNode;
    }
}
