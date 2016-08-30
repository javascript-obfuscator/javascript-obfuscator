import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';

import { IIdentifierNode } from "../interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "../interfaces/nodes/ILiteralNode";
import { IObjectExpressionNode } from "../interfaces/nodes/IObjectExpressionNode";
import { IPropertyNode } from "../interfaces/nodes/IPropertyNode";
import { INode } from "../interfaces/nodes/INode";

import { NodeType } from "../enums/NodeType";

import { AbstractNodeObfuscator } from './AbstractNodeObfuscator';
import { Nodes } from "../Nodes";
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
    public obfuscateNode (objectExpressionNode: IObjectExpressionNode): void {
        objectExpressionNode.properties
            .forEach((property: IPropertyNode) => {
                estraverse.replace(property.key, {
                    leave: (node: INode, parentNode: INode): any => {
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
    private obfuscateLiteralPropertyKey (node: ILiteralNode): void {
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
    private obfuscateIdentifierPropertyKey (node: IIdentifierNode): void {
        let nodeValue: string = node.name,
            literalNode: ILiteralNode = {
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
