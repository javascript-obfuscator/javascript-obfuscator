import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IJavaScriptObfuscator } from '../../interfaces/IJavaScriptObfsucator';
import { IObfuscationResult } from '../../interfaces/IObfuscationResult';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class CallExpressionTransformer extends AbstractNodeTransformer {
    /**
     * @type {IJavaScriptObfuscator}
     */
    private readonly javaScriptObfuscator: IJavaScriptObfuscator;

    /**
     * @param {IJavaScriptObfuscator} javaScriptObfuscator
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IJavaScriptObfuscator) javaScriptObfuscator: IJavaScriptObfuscator,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.javaScriptObfuscator = javaScriptObfuscator;
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null) => {
                if (parentNode && NodeGuards.isCallExpressionNode(node)) {
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

        if (
            NodeGuards.isIdentifierNode(callExpressionNode.callee)
            && callExpressionNode.callee.name === 'eval'
            && callExpressionFirstArgument
            && NodeGuards.isLiteralNode(callExpressionFirstArgument)
        ) {
            return this.transformEvalCallExpressionLiteralToAst(callExpressionFirstArgument);
        }

        return callExpressionNode;
    }

    /**
     * @param {Literal} literalNode
     * @returns {Node}
     */
    private transformEvalCallExpressionLiteralToAst (literalNode: ESTree.Literal): ESTree.Node {
        if (typeof literalNode.value !== 'string') {
            return literalNode;
        }

        const code: string = literalNode.value;
        const obfuscationResult: IObfuscationResult = this.javaScriptObfuscator.obfuscate(code);

        return obfuscationResult.getObfuscatedAst();
    }
}
