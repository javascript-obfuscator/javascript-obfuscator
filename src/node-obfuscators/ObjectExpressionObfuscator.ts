import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';

import { NodeObfuscator } from './NodeObfuscator'
import { Utils } from '../Utils';

/**
 * replaces:
 *     var object = { 'PSEUDO': 1 };
 *
 * or:
 *     var object = { PSEUDO: 1 };
 *
 * by:
 *     var object = { '\u0050\u0053\u0045\u0055\u0044\u004f': 1 };
 */
export class ObjectExpressionObfuscator extends NodeObfuscator {
    /**
     * @param objectExpressionNode
     */
    public obfuscateNode (objectExpressionNode: any): void {
        objectExpressionNode.properties.forEach((property) => {
            estraverse.replace(property.key, {
                leave: (node, parentNode) => {
                    switch (node.type) {
                        case 'Literal':
                            this.literalNodeController(node);

                            break;

                        case 'Identifier':
                            this.identifierNodeController(node);

                            break;
                    }
                }
            });
        });
    }

    /**
     * @param node
     */
    private literalNodeController (node: any): void {
        switch (typeof node.value) {
            case 'string':
                if (node['x-verbatim-property']) {
                    break;
                }

                node['x-verbatim-property'] = {
                    content : Utils.stringToUnicode(node.value),
                    precedence: escodegen.Precedence.Primary
                };

                break;
        }
    }

    /**
     * @param node
     */
    private identifierNodeController (node: any): void {
        let nodeValue: string = node['name'];

        node['type'] = 'Literal';
        node['value'] = nodeValue;
        node['raw'] = `'${nodeValue}'`;
        node['x-verbatim-property'] = {
            content : Utils.stringToUnicode(nodeValue),
            precedence: escodegen['Precedence']['Primary']
        };

        delete node['name'];
    }
}