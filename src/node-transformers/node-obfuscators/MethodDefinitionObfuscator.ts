import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { IOptions } from '../../interfaces/options/IOptions';
import { IObfuscatorReplacer } from '../../interfaces/node-transformers/IObfuscatorReplacer';

import { NodeObfuscatorsReplacers } from '../../enums/container/NodeObfuscatorsReplacers';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { Utils } from '../../utils/Utils';

/**
 * replaces:
 *     foo () { //... };
 *
 * on:
 *     [_0x9a4e('0x0')] { //... };
 */
@injectable()
export class MethodDefinitionObfuscator extends AbstractNodeTransformer {
    /**
     * @type {IObfuscatorReplacer}
     */
    private readonly stringLiteralReplacer: IObfuscatorReplacer;

    /**
     * @type {string[]}
     */
    private static readonly ignoredNames: string[] = ['constructor'];

    /**
     * @param replacersFactory
     * @param options
     */
    constructor(
        @inject(ServiceIdentifiers['Factory<IObfuscatorReplacer>']) replacersFactory: (replacer: NodeObfuscatorsReplacers) => IObfuscatorReplacer,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.stringLiteralReplacer = replacersFactory(NodeObfuscatorsReplacers.StringLiteralReplacer);
    }

    /**
     * @param methodDefinitionNode
     * @param parentNode
     */
    public transformNode (methodDefinitionNode: ESTree.MethodDefinition, parentNode: ESTree.Node): void {
        this.replaceMethodName(methodDefinitionNode);
    }

    /**
     * @param methodDefinitionNode
     */
    private replaceMethodName (methodDefinitionNode: ESTree.MethodDefinition): void {
        estraverse.replace(methodDefinitionNode.key, {
            enter: (node: ESTree.Node): any => {
                if (
                    Node.isIdentifierNode(node) &&
                    !Utils.arrayContains(MethodDefinitionObfuscator.ignoredNames, node.name) &&
                    methodDefinitionNode.computed === false
                ) {
                    methodDefinitionNode.computed = true;
                    node.name = this.stringLiteralReplacer.replace(node.name);

                    return;
                }

                return estraverse.VisitorOption.Skip;
            }
        });
    }
}
