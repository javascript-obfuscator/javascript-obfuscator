import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';

import { IIdentifierNode } from "../interfaces/nodes/IIdentifierNode";
import { ILiteralNode } from "../interfaces/nodes/ILiteralNode";
import { IMemberExpressionNode } from "../interfaces/nodes/IMemberExpressionNode";
import { ITreeNode } from "../interfaces/nodes/ITreeNode";

import { NodeObfuscator } from './NodeObfuscator'
import { NodeUtils } from "../NodeUtils";

export class MemberExpressionObfuscator extends NodeObfuscator {
    /**
     * @param memberExpressionNode
     */
    public obfuscateNode (memberExpressionNode: IMemberExpressionNode): void {
        estraverse.replace(memberExpressionNode.property, {
            leave: (node: ITreeNode, parentNode: ITreeNode) => {
                if (NodeUtils.isLiteralNode(node)) {
                    this.literalNodeController(node);

                    return;
                }

                if (NodeUtils.isIdentifierNode(node)) {
                    if (memberExpressionNode.computed) {
                        return;
                    }

                    memberExpressionNode.computed = true;
                    this.identifierNodeController(node);
                }
            }
        });
    }

    /**
     * replaces:
     *     object.identifier = 1;
     *
     * by:
     *     object[_0x23d45[25]] = 1;
     *
     * and skip:
     *     object[identifier] = 1;
     *
     * @param node
     */
    private identifierNodeController (node: IIdentifierNode): void {
        let nodeValue: string = node.name,
            literalNode: ILiteralNode = {
                type: 'Literal',
                value: nodeValue,
                raw: `'${nodeValue}'`,
                'x-verbatim-property': {
                    content : this.replaceLiteralStringByArrayElement(nodeValue),
                    precedence: escodegen.Precedence.Primary
                }
            };

        delete node.name;

        Object.assign(node, literalNode);
    }

    /**
     * replaces:
     *     object['literal'] = 1;
     *
     * by:
     *     object[_0x23d45[25]] = 1;
     *
     * @param node
     */
    private literalNodeController (node: ILiteralNode): void {
        switch (typeof node.value) {
            case 'string':
                if (node['x-verbatim-property']) {
                    break;
                }

                node['x-verbatim-property'] = {
                    content : this.replaceLiteralStringByArrayElement(<string>node.value),
                    precedence: escodegen.Precedence.Primary
                };

                break;
        }
    }
}