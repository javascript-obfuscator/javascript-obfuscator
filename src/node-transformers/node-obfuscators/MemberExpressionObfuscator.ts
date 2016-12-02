import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IReplacer } from '../../interfaces/node-transformers/IReplacer';
import { IStorage } from '../../interfaces/storages/IStorage';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

@injectable()
export class MemberExpressionObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IReplacer}
     */
    private readonly stringLiteralReplacer: IReplacer;

    /**
     * @param customNodesStorage
     * @param replacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers['Factory<IReplacer>']) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);

        this.stringLiteralReplacer = replacersFactory(NodeObfuscatorsReplacers.StringLiteralReplacer);
    }

    /**
     * @param memberExpressionNode
     */
    public transformNode (memberExpressionNode: ESTree.MemberExpression): void {
        estraverse.traverse(memberExpressionNode.property, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Node.isLiteralNode(node)) {
                    this.obfuscateLiteralProperty(node);

                    return;
                }

                if (Node.isIdentifierNode(node)) {
                    if (memberExpressionNode.computed) {
                        return;
                    }

                    memberExpressionNode.computed = true;
                    this.obfuscateIdentifierProperty(node);
                }
            }
        });
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
     */
    private obfuscateIdentifierProperty (node: ESTree.Identifier): void {
        const nodeValue: string = node.name;
        const literalNode: ESTree.Literal = {
            raw: `'${nodeValue}'`,
            'x-verbatim-property': {
                content: this.stringLiteralReplacer.replace(nodeValue),
                precedence: escodegen.Precedence.Primary
            },
            type: NodeType.Literal,
            value: nodeValue
        };

        delete node.name;

        Object.assign(node, literalNode);
    }

    /**
     * replaces:
     *     object['literal'] = 1;
     *
     * on:
     *     object[_0x23d45[25]] = 1;
     *
     * @param node
     */
    private obfuscateLiteralProperty (node: ESTree.Literal): void {
        if (typeof node.value === 'string' && !node['x-verbatim-property']) {
            node['x-verbatim-property'] = {
                content : this.stringLiteralReplacer.replace(node.value),
                precedence: escodegen.Precedence.Primary
            };
        }
    }
}
