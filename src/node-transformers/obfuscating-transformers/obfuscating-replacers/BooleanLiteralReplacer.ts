import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../../interfaces/options/IOptions';

import { AbstractObfuscatingReplacer } from './AbstractObfuscatingReplacer';
import { Nodes } from '../../../node/Nodes';

@injectable()
export class BooleanLiteralReplacer extends AbstractObfuscatingReplacer {
    /**
     * @param options
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
            BooleanLiteralReplacer.getFalseUnaryExpressionNode()
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
     * @param nodeValue
     * @returns {ESTree.Node}
     */
    public replace (nodeValue: boolean): ESTree.Node {
        return nodeValue
            ? BooleanLiteralReplacer.getTrueUnaryExpressionNode()
            : BooleanLiteralReplacer.getFalseUnaryExpressionNode();
    }
}
