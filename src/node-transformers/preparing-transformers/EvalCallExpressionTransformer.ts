import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeFactory } from '../../node/NodeFactory';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeUtils } from '../../node/NodeUtils';
import { StringUtils } from '../../utils/StringUtils';

@injectable()
export class EvalCallExpressionTransformer extends AbstractNodeTransformer {
    /**
     * @type {NodeTransformer[]}
     */
    public override readonly runAfter: NodeTransformer[] = [
        NodeTransformer.EscapeSequenceTransformer,
        NodeTransformer.ParentificationTransformer,
        NodeTransformer.VariablePreserveTransformer
    ];

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

        return quasis[0].value.cooked ?? null;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.Preparing:
                return {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            case NodeTransformationStage.Finalizing:
                return {
                    leave: (node: ESTree.Node, parentNode: ESTree.Node | null): ESTree.Node | undefined => {
                        if (parentNode) {
                            return this.restoreNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node {
        const isEvalCallExpressionNode = parentNode
            && NodeGuards.isCallExpressionNode(node)
            && NodeGuards.isIdentifierNode(node.callee)
            && node.callee.name === 'eval';

        if (!isEvalCallExpressionNode) {
            return node;
        }

        const evalCallExpressionFirstArgument: ESTree.Expression | ESTree.SpreadElement | undefined = node.arguments[0];

        if (!evalCallExpressionFirstArgument) {
            return node;
        }

        const evalString: string | null = EvalCallExpressionTransformer
            .extractEvalStringFromCallExpressionArgument(evalCallExpressionFirstArgument);

        if (!evalString) {
            return node;
        }

        let ast: ESTree.Statement[];

        // wrapping into try-catch to prevent parsing of incorrect `eval` string
        try {
            ast = NodeUtils.convertCodeToStructure(evalString);
        } catch {
            return node;
        }

        /**
         * we should wrap AST-tree into the parent function expression node (ast root host node).
         * This function expression node will help to correctly transform AST-tree.
         */
        const evalRootAstHostNode: ESTree.FunctionExpression = NodeFactory
            .functionExpressionNode([], NodeFactory.blockStatementNode(ast));

        NodeMetadata.set(evalRootAstHostNode, { evalHostNode: true });

        NodeUtils.parentizeAst(evalRootAstHostNode);
        NodeUtils.parentizeNode(evalRootAstHostNode, parentNode);

        return evalRootAstHostNode;
    }

    /**
     * @param {Node} node
     * @param {Node} parentNode
     * @returns {Node}
     */
    public restoreNode (node: ESTree.Node, parentNode: ESTree.Node): ESTree.Node {
        if (!this.isEvalRootAstHostNode(node)) {
            return node;
        }

        const targetAst: ESTree.Statement[] = node.body.body;
        const obfuscatedCode: string = NodeUtils.convertStructureToCode(targetAst);

        return NodeFactory.callExpressionNode(
            NodeFactory.identifierNode('eval'),
            [
                NodeFactory.literalNode(StringUtils.escapeJsString(obfuscatedCode))
            ]
        );
    }

    /**
     * @param {Node} node
     * @returns {boolean}
     */
    private isEvalRootAstHostNode (node: ESTree.Node): node is ESTree.FunctionExpression {
        return NodeMetadata.isEvalHostNode(node);
    }
}
