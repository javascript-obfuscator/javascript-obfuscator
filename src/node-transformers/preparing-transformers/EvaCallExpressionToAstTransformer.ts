import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class EvalCallExpressionToAstTransformer extends AbstractNodeTransformer {
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
            return EvalCallExpressionToAstTransformer
                .getEvalStringFromLiteralNode(node);
        }

        if (NodeGuards.isTemplateLiteralNode(node)) {
            return EvalCallExpressionToAstTransformer
                .getEvalStringFromTemplateLiteralNode(node);
        }

        return null;
    }

    /**
     * @param {Literal} node
     * @returns {string | null}
     */
    private static getEvalStringFromLiteralNode (node: ESTree.Literal): string | null {
        return typeof node.value === 'string' ? node.value : null;
    }

    /**
     * @param {TemplateLiteral} node
     * @returns {string | null}
     */
    private static getEvalStringFromTemplateLiteralNode (node: ESTree.TemplateLiteral): string | null {
        const quasis: ESTree.TemplateElement[] = node.quasis;
        const allowedQuasisLength: number = 1;

        if (quasis.length !== allowedQuasisLength || node.expressions.length) {
            return null;
        }

        return quasis[0].value.cooked;
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
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

        const evalString: string | null = EvalCallExpressionToAstTransformer
            .extractEvalStringFromCallExpressionArgument(callExpressionFirstArgument);

        if (!evalString) {
            return callExpressionNode;
        }

        let ast: TStatement[];

        // wrapping into try-catch to prevent parsing of incorrect `eval` string
        try {
            ast = NodeUtils.convertCodeToStructure(evalString);
        } catch (e) {
            return callExpressionNode;
        }

        const evalRootAstHostNode: ESTree.FunctionExpression = Nodes
            .getFunctionExpressionNode([], Nodes.getBlockStatementNode(<any>ast));

        evalRootAstHostNode.isEvalRoot = true;

        return evalRootAstHostNode;
    }
}
