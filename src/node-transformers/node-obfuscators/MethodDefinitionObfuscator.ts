import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscatorReplacer } from '../../interfaces/node-transformers/IObfuscatorReplacer';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';
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
 * Literal node will be obfuscated by LiteralObfuscator
 */
@injectable()
export class MethodDefinitionObfuscator extends AbstractNodeTransformer {
    /**
     * @type {string[]}
     */
    private static readonly ignoredNames: string[] = ['constructor'];

    /**
     * @type {IObfuscatorReplacer}
     */
    private readonly stringLiteralReplacer: IObfuscatorReplacer;

    /**
     * @param replacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers.Factory__IObfuscatorReplacer) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.stringLiteralReplacer = replacersFactory(NodeObfuscatorsReplacers.StringLiteralReplacer);
    }

    /**
     * @param methodDefinitionNode
     * @param parentNode
     * @returns {ESTree.Node}
     */
    public transformNode (methodDefinitionNode: ESTree.MethodDefinition, parentNode: ESTree.Node): ESTree.Node {
        this.replaceMethodName(methodDefinitionNode);

        return methodDefinitionNode;
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
     * Literal node will be obfuscated by LiteralObfuscator
     *
     * @param methodDefinitionNode
     */
    private replaceMethodName (methodDefinitionNode: ESTree.MethodDefinition): void {
        if (
            Node.isIdentifierNode(methodDefinitionNode.key) &&
            !MethodDefinitionObfuscator.ignoredNames.includes(methodDefinitionNode.key.name) &&
            methodDefinitionNode.computed === false
        ) {
            methodDefinitionNode.computed = true;
            methodDefinitionNode.key = {
                type: NodeType.Literal,
                value: methodDefinitionNode.key.name,
                raw: `'${methodDefinitionNode.key.name}'`
            };
        }
    }
}
