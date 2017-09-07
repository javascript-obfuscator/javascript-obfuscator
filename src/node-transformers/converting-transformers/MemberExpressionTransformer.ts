import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeType } from '../../enums/node/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

@injectable()
export class MemberExpressionTransformer extends AbstractNodeTransformer {
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
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isMemberExpressionNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
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
     * @param {MemberExpression} memberExpressionNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (memberExpressionNode: ESTree.MemberExpression, parentNode: ESTree.Node): ESTree.Node {
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
