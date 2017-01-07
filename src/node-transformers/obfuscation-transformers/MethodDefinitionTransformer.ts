import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscationReplacer } from '../../interfaces/node-transformers/IObfuscationReplacer';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscationReplacers';
import { NodeType } from '../../enums/NodeType';

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
     * @type {IObfuscationReplacer}
     */
    private readonly stringLiteralReplacer: IObfuscationReplacer;

    /**
     * @param replacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers.Factory__IObfuscatorReplacer) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscationReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.stringLiteralReplacer = replacersFactory(NodeObfuscatorsReplacers.StringLiteralReplacer);
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
     * @param methodDefinitionNode
     * @param parentNode
     * @returns {ESTree.Node}
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
