import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { AbstractNodeObfuscator } from './AbstractNodeObfuscator';
import { Node } from '../node/Node';
import { Utils } from '../Utils';
import { StringLiteralReplacer } from './replacers/StringLiteralReplacer';

/**
 * replaces:
 *     foo () { //... };
 *
 * on:
 *     [_0x9a4e('0x0')] { //... };
 */
export class MethodDefinitionObfuscator extends AbstractNodeObfuscator {
    /**
     * @type {string[]}
     */
    private static ignoredNames: string[] = ['constructor'];

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
                    node.name = new StringLiteralReplacer(this.nodes, this.options)
                        .replace(node.name);

                    return;
                }

                return estraverse.VisitorOption.Skip;
            }
        });
    }
}
