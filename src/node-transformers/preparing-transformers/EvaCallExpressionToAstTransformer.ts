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

        if (
            !callExpressionFirstArgument
            || !NodeGuards.isLiteralNode(callExpressionFirstArgument)
            || typeof callExpressionFirstArgument.value !== 'string'
        ) {
            return callExpressionNode;
        }

        const code: string = callExpressionFirstArgument.value;

        let ast: TStatement[];

        // wrapping into try-catch to prevent parsing of incorrect `eval` string
        try {
            ast = NodeUtils.convertCodeToStructure(code);
        } catch (e) {
            return callExpressionNode;
        }

        const evalRootAstHost: ESTree.FunctionExpression = Nodes.getFunctionExpressionNode(
            [],
            Nodes.getBlockStatementNode(<any>ast)
        );

        evalRootAstHost.isEvalRoot = true;

        return evalRootAstHost;
    }
}
