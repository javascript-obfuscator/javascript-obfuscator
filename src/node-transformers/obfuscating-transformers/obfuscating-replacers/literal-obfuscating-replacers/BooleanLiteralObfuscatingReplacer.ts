import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../../../interfaces/options/IOptions';

import { AbstractObfuscatingReplacer } from '../AbstractObfuscatingReplacer';
import { Nodes } from '../../../../node/Nodes';

@injectable()
export class BooleanLiteralObfuscatingReplacer extends AbstractObfuscatingReplacer {
    /**
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @return {ESTree.UnaryExpression}
     */
    private static getTrueUnaryExpressionNode (): ESTree.UnaryExpression {
        return Nodes.getUnaryExpressionNode(
            '!',
            BooleanLiteralObfuscatingReplacer.getFalseUnaryExpressionNode()
        );
    }

    /**
     * @return {ESTree.UnaryExpression}
     */
    private static getFalseUnaryExpressionNode (): ESTree.UnaryExpression {
        return Nodes.getUnaryExpressionNode(
            '!',
            Nodes.getArrayExpressionNode()
        );
    }

    /**
     * @param {boolean} nodeValue
     * @returns {Node}
     */
    public replace (nodeValue: boolean): ESTree.Node {
        return nodeValue
            ? BooleanLiteralObfuscatingReplacer.getTrueUnaryExpressionNode()
            : BooleanLiteralObfuscatingReplacer.getFalseUnaryExpressionNode();
    }
}
