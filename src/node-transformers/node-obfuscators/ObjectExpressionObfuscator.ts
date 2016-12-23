import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';

import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { Utils } from '../../utils/Utils';

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
@injectable()
export class ObjectExpressionObfuscator extends AbstractNodeTransformer {
    /**
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param node
     * @returns {ESTree.Literal}
     */
    private static obfuscateLiteralPropertyKey (node: ESTree.Literal): ESTree.Literal {
        if (typeof node.value === 'string' && !node['x-verbatim-property']) {
            node['x-verbatim-property'] = {
                content : `'${Utils.stringToUnicodeEscapeSequence(node.value)}'`,
                precedence: escodegen.Precedence.Primary
            };
        }

        return node;
    }

    /**
     * @param node
     * @returns {ESTree.Literal}
     */
    private static obfuscateIdentifierPropertyKey (node: ESTree.Identifier): ESTree.Literal {
        return {
            type: NodeType.Literal,
            value: node.name,
            raw: `'${node.name}'`,
            'x-verbatim-property': {
                content : `'${Utils.stringToUnicodeEscapeSequence(node.name)}'`,
                precedence: escodegen.Precedence.Primary
            }
        };
    }

    /**
     * @param objectExpressionNode
     */
    public transformNode (objectExpressionNode: ESTree.ObjectExpression): void {
        objectExpressionNode.properties
            .forEach((property: ESTree.Property) => {
                if (property.shorthand) {
                    property.shorthand = false;
                }

                estraverse.replace(property.key, {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                        if (Node.isLiteralNode(node)) {
                            property.key = ObjectExpressionObfuscator.obfuscateLiteralPropertyKey(node);
                        }

                        if (Node.isIdentifierNode(node)) {
                            property.key = ObjectExpressionObfuscator.obfuscateIdentifierPropertyKey(node);
                        }
                    }
                });
            });
    }
}
