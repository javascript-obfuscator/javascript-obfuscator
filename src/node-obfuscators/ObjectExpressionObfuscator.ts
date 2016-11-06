import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { NodeType } from '../enums/NodeType';

import { AbstractNodeObfuscator } from './AbstractNodeObfuscator';
import { Nodes } from '../Nodes';
import { Utils } from '../Utils';

/**
 * replaces:
 *     var object = { 'PSEUDO': 1 };
 *
 * or:
 *     var object = { PSEUDO: 1 };
 *
 * on:
 *     var object = { '\u0050\u0053\u0045\u0055\u0044\u004f': 1 };
 */
export class ObjectExpressionObfuscator extends AbstractNodeObfuscator {
    /**
     * @param objectExpressionNode
     */
    public obfuscateNode (objectExpressionNode: ESTree.ObjectExpression): void {
        objectExpressionNode.properties
            .forEach((property: ESTree.Property) => {
                if (property.shorthand) {
                    property.shorthand = false;
                }

                estraverse.replace(property.key, {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                        if (Nodes.isLiteralNode(node)) {
                            this.obfuscateLiteralPropertyKey(node);

                            return;
                        }

                        if (Nodes.isIdentifierNode(node)) {
                            this.obfuscateIdentifierPropertyKey(node);
                        }
                    }
                });
            });
    }

    /**
     * @param node
     */
    private obfuscateLiteralPropertyKey (node: ESTree.Literal): void {
        if (typeof node.value === 'string' && !node['x-verbatim-property']) {
            node['x-verbatim-property'] = {
                content : Utils.stringToUnicode(node.value),
                precedence: escodegen.Precedence.Primary
            };
        }
    }

    /**
     * @param node
     */
    private obfuscateIdentifierPropertyKey (node: ESTree.Identifier): void {
        let nodeValue: string = node.name,
            literalNode: ESTree.Literal = {
                raw: `'${nodeValue}'`,
                'x-verbatim-property': {
                    content : Utils.stringToUnicode(nodeValue),
                    precedence: escodegen.Precedence.Primary
                },
                type: NodeType.Literal,
                value: nodeValue
            };

        delete node.name;

        Object.assign(node, literalNode);
    }
}
