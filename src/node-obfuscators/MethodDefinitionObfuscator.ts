import * as estraverse from 'estraverse';

import { IMethodDefinitionNode } from "../interfaces/nodes/IMethodDefinitionNode";
import { ITreeNode } from "../interfaces/nodes/ITreeNode";

import { NodeObfuscator } from './NodeObfuscator';
import { NodeUtils } from "../NodeUtils";
import { Utils } from "../Utils";

/**
 * replaces:
 *     function foo () { //... };
 *     foo();
 *
 * on:
 *     function _0x12d45f () { //... };
 *     _0x12d45f();
 */
export class MethodDefinitionObfuscator extends NodeObfuscator {
    /**
     * @type {string[]}
     */
    private ignoredNames: string[] = ['constructor'];

    /**
     * @param methodDefinitionNode
     * @param parentNode
     */
    public obfuscateNode (methodDefinitionNode: IMethodDefinitionNode, parentNode: ITreeNode): void {
        this.replaceMethodName(methodDefinitionNode);
    }

    /**
     * @param methodDefinitionNode
     */
    private replaceMethodName (methodDefinitionNode: IMethodDefinitionNode): void {
        estraverse.replace(methodDefinitionNode.key, {
            leave: (node: ITreeNode): any => {
                if (
                    NodeUtils.isIdentifierNode(node) &&
                    !Utils.arrayContains(this.ignoredNames, node.name) &&
                    methodDefinitionNode.computed === false
                ) {
                    methodDefinitionNode.computed = true;
                    node.name = this.replaceLiteralStringByArrayElement(node.name);

                    return;
                }

                return estraverse.VisitorOption.Skip;
            }
        });
    }
}
