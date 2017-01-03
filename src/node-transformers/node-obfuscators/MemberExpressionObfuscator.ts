import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscatorReplacer } from '../../interfaces/node-transformers/IObfuscatorReplacer';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

@injectable()
export class MemberExpressionObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IObfuscatorReplacer}
     */
    private readonly stringLiteralReplacer: IObfuscatorReplacer;

    /**
     * @param replacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers.Factory__IObfuscatorReplacer) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.stringLiteralReplacer = replacersFactory(NodeObfuscatorsReplacers.StringLiteralReplacer);
    }

    /**
     * @param memberExpressionNode
     * @returns {ESTree.Node}
     */
    public transformNode (memberExpressionNode: ESTree.MemberExpression): ESTree.Node {
        if (Node.isIdentifierNode(memberExpressionNode.property)) {
            if (memberExpressionNode.computed) {
                return memberExpressionNode;
            }

            memberExpressionNode.computed = true;
            memberExpressionNode.property = this.obfuscateIdentifierProperty(memberExpressionNode.property);
        }

        return memberExpressionNode;
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
     * Literal node will be obfuscated by LiteralObfuscator
     *
     * @param node
     * @returns {ESTree.Literal}
     */
    private obfuscateIdentifierProperty (node: ESTree.Identifier): ESTree.Literal {
        return {
            type: NodeType.Literal,
            value: node.name,
            raw: `'${node.name}'`
        };
    }
}
