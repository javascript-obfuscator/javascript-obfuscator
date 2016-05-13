import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';

import { NodeObfuscator } from './NodeObfuscator'

export class MemberExpressionObfuscator extends NodeObfuscator {
    /**
     * @param memberExpressionNode
     */
    public obfuscateNode (memberExpressionNode: any): void {
        estraverse.replace(memberExpressionNode.property, {
            leave: (node, parentNode) => {
                switch (node.type) {
                    case 'Literal':
                        this.literalNodeController(node);

                        break;

                    case 'Identifier':
                        if (memberExpressionNode.computed) {
                            break;
                        }

                        memberExpressionNode.computed = true;
                        this.identifierNodeController(node);

                        break;
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
    private identifierNodeController (node: any): void {
        let nodeValue: string = node['name'];

        node['type'] = 'Literal';
        node['value'] = nodeValue;
        node['raw'] = `'${nodeValue}'`;
        node['x-verbatim-property'] = {
            content : this.replaceLiteralStringByArrayElement(nodeValue),
            precedence: escodegen.Precedence.Primary
        };

        delete node['name'];
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
    private literalNodeController (node: any): void {
        switch (typeof node.value) {
            case 'string':
                if (node['x-verbatim-property']) {
                    break;
                }

                node['x-verbatim-property'] = {
                    content : this.replaceLiteralStringByArrayElement(node.value),
                    precedence: escodegen.Precedence.Primary
                };

                break;
        }
    }
}