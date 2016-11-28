import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/IOptions';
import { IStorage } from '../../interfaces/IStorage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { Utils } from '../../Utils';
import { StringLiteralReplacer } from './replacers/StringLiteralReplacer';

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
     * @type {string[]}
     */
    private static readonly ignoredNames: string[] = ['constructor'];

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
                    node.name = new StringLiteralReplacer(this.customNodesStorage, this.options)
                        .replace(node.name);

                    return;
                }

                return estraverse.VisitorOption.Skip;
            }
        });
    }
}
