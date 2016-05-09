import { NodeObfuscator } from './NodeObfuscator';
import { Utils } from '../Utils';

let estraverse = require('estraverse');

/**
 * replaces:
 *     function foo () { //... };
 *     foo();
 *
 * by:
 *     function _0x12d45f () { //... };
 *     _0x12d45f();
 */
export class MethodDefinitionObfuscator extends NodeObfuscator {
    /**
     * @type {Map<string, string>}
     */
    private methodName: Map <string, string> = new Map <string, string> ();

    /**
     * @type {string[]}
     */
    private ignoredNames: string[] = ['constructor'];

    /**
     * @param methodDefinitionNode
     * @param parentNode
     */
    public obfuscateNode (methodDefinitionNode: any, parentNode: any): void {
        this.replaceMethodName(methodDefinitionNode);
    }

    /**
     * @param methodDefinitionNode
     */
    private replaceMethodName (methodDefinitionNode: any): void {
        estraverse.replace(methodDefinitionNode.key, {
            leave: (node) => {
                if (
                    node.type !== 'Identifier' ||
                    this.ignoredNames.indexOf(node.name) >= 0 ||
                    methodDefinitionNode.computed === true
                ) {
                    return;
                }

                methodDefinitionNode.computed = true;
                node.name = this.replaceLiteralStringByArrayElement(node.name);
            }
        });
    }
}