import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen';
import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { Utils } from '../../Utils';

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
     * @param customNodesStorage
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['IStorage<ICustomNode>']) customNodesStorage: IStorage<ICustomNode>,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodesStorage, options);
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

                estraverse.traverse(property.key, {
                    enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                        if (Node.isLiteralNode(node)) {
                            this.obfuscateLiteralPropertyKey(node);

                            return;
                        }

                        if (Node.isIdentifierNode(node)) {
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
                content : `'${Utils.stringToUnicodeEscapeSequence(node.value)}'`,
                precedence: escodegen.Precedence.Primary
            };
        }
    }

    /**
     * @param node
     */
    private obfuscateIdentifierPropertyKey (node: ESTree.Identifier): void {
        const nodeValue: string = node.name;
        const literalNode: ESTree.Literal = {
            raw: `'${nodeValue}'`,
            'x-verbatim-property': {
                content : `'${Utils.stringToUnicodeEscapeSequence(nodeValue)}'`,
                precedence: escodegen.Precedence.Primary
            },
            type: NodeType.Literal,
            value: nodeValue
        };

        delete node.name;

        Object.assign(node, literalNode);
    }
}
