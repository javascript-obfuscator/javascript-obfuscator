import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';

import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

@injectable()
export class MemberExpressionTransformer extends AbstractNodeTransformer {
    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * replaces:
     *     object.identifier = 1;
     *
     * on:
     *     object['identifier'] = 1;
     *
     * and skip:
     *     object[identifier] = 1;
     *
     * Literal node will be obfuscated by LiteralTransformer
     *
     * @param memberExpressionNode
     * @returns {ESTree.Node}
     */
    public transformNode (memberExpressionNode: ESTree.MemberExpression): ESTree.Node {
        if (Node.isIdentifierNode(memberExpressionNode.property)) {
            if (memberExpressionNode.computed) {
                return memberExpressionNode;
            }

            memberExpressionNode.computed = true;
            memberExpressionNode.property = {
                type: NodeType.Literal,
                value: memberExpressionNode.property.name,
                raw: `'${memberExpressionNode.property.name}'`
            };
        }

        return memberExpressionNode;
    }
}
