import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen';
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
        if (Node.isLiteralNode(memberExpressionNode.property)) {
            memberExpressionNode.property = this.obfuscateLiteralProperty(memberExpressionNode.property);
        }

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
     *     object[_0x23d45[25]] = 1;
     *
     * and skip:
     *     object[identifier] = 1;
     *
     * @param node
     * @returns {ESTree.Literal}
     */
    private obfuscateIdentifierProperty (node: ESTree.Identifier): ESTree.Literal {
        return {
            type: NodeType.Literal,
            value: node.name,
            raw: `'${node.name}'`,
            'x-verbatim-property': {
                content: this.stringLiteralReplacer.replace(node.name),
                precedence: escodegen.Precedence.Primary
            }
        };
    }

    /**
     * replaces:
     *     object['literal'] = 1;
     *
     * on:
     *     object[_0x23d45[25]] = 1;
     *
     * @param node
     * @returns {ESTree.Literal}
     */
    private obfuscateLiteralProperty (node: ESTree.Literal): ESTree.Literal {
        if (typeof node.value === 'string' && !node['x-verbatim-property']) {
            node['x-verbatim-property'] = {
                content: this.stringLiteralReplacer.replace(node.value),
                precedence: escodegen.Precedence.Primary
            };
        }

        return node;
    }
}
