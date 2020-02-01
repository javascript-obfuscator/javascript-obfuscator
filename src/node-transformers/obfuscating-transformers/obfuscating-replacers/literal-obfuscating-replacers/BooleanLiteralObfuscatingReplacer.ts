import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../../../interfaces/options/IOptions';

import { AbstractObfuscatingReplacer } from '../AbstractObfuscatingReplacer';
import { NodeFactory } from '../../../../node/NodeFactory';

@injectable()
export class BooleanLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer {
    /**
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @return {ESTree.UnaryExpression}
     */
    private static getTrueUnaryExpressionNode (): ESTree.UnaryExpression {
        return NodeFactory.unaryExpressionNode(
            '!',
            BooleanLiteralObfuscatingReplacer.getFalseUnaryExpressionNode()
        );
    }

    /**
     * @return {ESTree.UnaryExpression}
     */
    private static getFalseUnaryExpressionNode (): ESTree.UnaryExpression {
        return NodeFactory.unaryExpressionNode(
            '!',
            NodeFactory.arrayExpressionNode()
        );
    }

    /**
     * @param {SimpleLiteral} literalNode
     * @returns {Node}
     */
    public replace (literalNode: ESTree.SimpleLiteral): ESTree.Node {
        const literalValue: ESTree.SimpleLiteral['value'] = literalNode.value;

        if (typeof literalValue !== 'boolean') {
            throw new Error('`BooleanLiteralObfuscatingReplacer` should accept only literals with `boolean` value');
        }

        return literalValue
            ? BooleanLiteralObfuscatingReplacer.getTrueUnaryExpressionNode()
            : BooleanLiteralObfuscatingReplacer.getFalseUnaryExpressionNode();
    }
}
