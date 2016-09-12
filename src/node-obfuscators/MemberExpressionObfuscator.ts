import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { NodeType } from "../enums/NodeType";

import { AbstractNodeObfuscator } from './AbstractNodeObfuscator';
import { Nodes } from "../Nodes";
import { StringLiteralReplacer } from "./replacers/StringLiteralReplacer";

export class MemberExpressionObfuscator extends AbstractNodeObfuscator {
    /**
     * @param memberExpressionNode
     */
    public obfuscateNode (memberExpressionNode: ESTree.MemberExpression): void {
        estraverse.replace(memberExpressionNode.property, {
            leave: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Nodes.isLiteralNode(node)) {
                    this.obfuscateLiteralProperty(node);

                    return;
                }

                if (Nodes.isIdentifierNode(node)) {
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
        let nodeValue: string = node.name,
            literalNode: ESTree.Literal = {
                raw: `'${nodeValue}'`,
                'x-verbatim-property': {
                    content : new StringLiteralReplacer(this.nodes, this.options).replace(nodeValue),
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
                content : new StringLiteralReplacer(this.nodes, this.options).replace(node.value),
                precedence: escodegen.Precedence.Primary
            };
        }
    }
}
