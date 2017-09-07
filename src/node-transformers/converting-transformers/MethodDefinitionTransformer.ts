import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { NodeType } from '../../enums/node/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';

/**
 * replaces:
 *     foo () { //... };
 *
 * on:
 *     ['foo'] { //... };
 *
 * Literal node will be obfuscated by LiteralTransformer
 */
@injectable()
export class MethodDefinitionTransformer extends AbstractNodeTransformer {
    /**
     * @type {string[]}
     */
    private static readonly ignoredNames: string[] = ['constructor'];

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            enter: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (Node.isMethodDefinitionNode(node)) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * replaces:
     *     object.identifier = 1;
     *
     * on:
     *     object['identifier'] = 1;
     *
     * and skip:
     *     object[identifier] = 1;
     * Literal node will be obfuscated by LiteralTransformer
     *
     * @param {MethodDefinition} methodDefinitionNode
     * @param {Node} parentNode
     * @returns {Node}
     */
    public transformNode (methodDefinitionNode: ESTree.MethodDefinition, parentNode: ESTree.Node): ESTree.Node {
        if (
            Node.isIdentifierNode(methodDefinitionNode.key) &&
            !MethodDefinitionTransformer.ignoredNames.includes(methodDefinitionNode.key.name) &&
            methodDefinitionNode.computed === false
        ) {
            methodDefinitionNode.computed = true;
            methodDefinitionNode.key = {
                type: NodeType.Literal,
                value: methodDefinitionNode.key.name,
                raw: `'${methodDefinitionNode.key.name}'`
            };
        }

        return methodDefinitionNode;
    }
}
