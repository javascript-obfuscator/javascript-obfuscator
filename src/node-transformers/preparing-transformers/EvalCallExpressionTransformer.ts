import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';
import jsStringEscape from 'js-string-escape';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { TransformationStage } from '../../enums/node-transformers/TransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class EvalCallExpressionTransformer extends AbstractNodeTransformer {
    /**
     * @type {Set <FunctionExpression>}
     */
    private readonly evalRootAstHostNodeSet: Set <ESTree.FunctionExpression> = new Set();

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
     * @param {Expression | SpreadElement} node
     * @returns {string | null}
     */
    private static extractEvalStringFromCallExpressionArgument (node: ESTree.Expression | ESTree.SpreadElement): string | null {
        if (NodeGuards.isLiteralNode(node)) {
            return EvalCallExpressionTransformer
                .extractEvalStringFromLiteralNode(node);
        }

        if (NodeGuards.isTemplateLiteralNode(node)) {
            return EvalCallExpressionTransformer
                .extractEvalStringFromTemplateLiteralNode(node);
        }

        return null;
    }

    /**
     * @param {Literal} node
     * @returns {string | null}
     */
    private static extractEvalStringFromLiteralNode (node: ESTree.Literal): string | null {
        return typeof node.value === 'string' ? node.value : null;
    }

    /**
     * @param {TemplateLiteral} node
     * @returns {string | null}
     */
    private static extractEvalStringFromTemplateLiteralNode (node: ESTree.TemplateLiteral): string | null {
        const quasis: ESTree.TemplateElement[] = node.quasis;
        const allowedQuasisLength: number = 1;

        if (quasis.length !== allowedQuasisLength || node.expressions.length) {
            return null;
        }

        return quasis[0].value.cooked;
    }

    /**
     * @param {TransformationStage} transformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (transformationStage: TransformationStage): IVisitor | null {
        switch (transformationStage) {
            case TransformationStage.Preparing:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (
                            parentNode
                            && NodeGuards.isCallExpressionNode(node)
                            && NodeGuards.isIdentifierNode(node.callee)
                            && node.callee.name === 'eval'
                        ) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            case TransformationStage.Finalizing:
                if (!this.evalRootAstHostNodeSet.size) {
                    return null;
                }

                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                        if (parentNode && this.isEvalRootAstHostNode(node)) {
                            return this.restoreNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {CallExpression} callExpressionNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (callExpressionNode: ESTree.CallExpression, parentNode: ESTree.Node): ESTree.Node {
        const callExpressionFirstArgument: ESTree.Expression | ESTree.SpreadElement = callExpressionNode.arguments[0];

        if (!callExpressionFirstArgument) {
            return callExpressionNode;
        }

        const evalString: string | null = EvalCallExpressionTransformer
            .extractEvalStringFromCallExpressionArgument(callExpressionFirstArgument);

        if (!evalString) {
            return callExpressionNode;
        }

        let ast: ESTree.Statement[];

        // wrapping into try-catch to prevent parsing of incorrect `eval` string
        try {
            ast = NodeUtils.convertCodeToStructure(evalString);
        } catch {
            return callExpressionNode;
        }

        /**
         * we should wrap AST-tree into the parent function expression node (ast root host node).
         * This function expression node will help to correctly transform AST-tree.
         */
        const evalRootAstHostNode: ESTree.FunctionExpression = NodeFactory
            .functionExpressionNode([], NodeFactory.blockStatementNode(ast));

        /**
         * we should store that host node and then extract AST-tree on the `finalizing` stage
         */
        this.evalRootAstHostNodeSet.add(evalRootAstHostNode);

        return evalRootAstHostNode;
    }

    /**
     * @param {FunctionExpression} evalRootAstHostNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public restoreNode (evalRootAstHostNode: ESTree.FunctionExpression, parentNode: ESTree.Node): ESTree.Node {
        const targetAst: ESTree.Statement[] = evalRootAstHostNode.body.body;
        const obfuscatedCode: string = NodeUtils.convertStructureToCode(targetAst);

        return NodeFactory.callExpressionNode(
            NodeFactory.identifierNode('eval'),
            [
                NodeFactory.literalNode(jsStringEscape(obfuscatedCode))
            ]
        );
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    private isEvalRootAstHostNode (node: ESTree.Node): node is ESTree.FunctionExpression {
        return NodeGuards.isFunctionExpressionNode(node) && this.evalRootAstHostNodeSet.has(node);
    }
}
