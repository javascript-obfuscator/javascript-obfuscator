import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { Nodes } from '../../node/Nodes';
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
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {NodeGuards} node
     * @returns {boolean}
     */
    private static isLiteralNodeWithStringValue (node: ESTree.Node): boolean {
        return node && NodeGuards.isLiteralNode(node) && typeof node.value === 'string';
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Converting:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (parentNode
                            && NodeGuards.isExpressionStatementNode(node)
                            && NodeGuards.isTemplateLiteralNode(node.expression)
                        ) {
                            return this.fixEsprimaReturnStatementTemplateLiteralNode(node, node.expression);
                        }

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
     * @param {TemplateLiteral} templateLiteralNode
     * @param {NodeGuards} parentNode
     * @returns {NodeGuards}
     */
    public transformNode (templateLiteralNode: ESTree.TemplateLiteral, parentNode: ESTree.Node): ESTree.Node {
        const templateLiteralExpressions: ESTree.Expression[] = templateLiteralNode.expressions;

        let nodes: (ESTree.Literal | ESTree.Expression)[] = [];

        templateLiteralNode.quasis.forEach((templateElement: ESTree.TemplateElement) => {
            nodes.push(Nodes.getLiteralNode(templateElement.value.cooked));

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
            nodes.unshift(Nodes.getLiteralNode(''));
        }

        if (nodes.length > 1) {
            let root: ESTree.BinaryExpression = Nodes.getBinaryExpressionNode(
                '+',
                <ESTree.Literal>nodes.shift(),
                <ESTree.Expression>nodes.shift()
            );

            nodes.forEach((node: ESTree.Literal | ESTree.Expression) => {
                root = Nodes.getBinaryExpressionNode('+', root, <ESTree.Literal | ESTree.Expression>node);
            });

            return root;
        }

        return nodes[0];
    }

    /**
     * @param {ExpressionStatement} expressionStatementNode
     * @param {TemplateLiteral} templateLiteralNode
     * @returns {Node | VisitorOption}
     */
    private fixEsprimaReturnStatementTemplateLiteralNode (
        expressionStatementNode: ESTree.ExpressionStatement,
        templateLiteralNode: ESTree.TemplateLiteral
    ): ESTree.Node | estraverse.VisitorOption {
        const previousSiblingStatementNode: TStatement | null = NodeUtils
            .getPreviousSiblingStatementNode(expressionStatementNode);

        if (
            !previousSiblingStatementNode
            || !templateLiteralNode.parentNode
            || !NodeGuards.isReturnStatementNode(previousSiblingStatementNode)
            || previousSiblingStatementNode.argument !== null
        ) {
            return expressionStatementNode;
        }

        previousSiblingStatementNode.argument = <ESTree.Expression>this.transformNode(
            templateLiteralNode,
            templateLiteralNode.parentNode
        );

        NodeUtils.parentizeNode(templateLiteralNode, previousSiblingStatementNode);

        return estraverse.VisitorOption.Remove;
    }
}
