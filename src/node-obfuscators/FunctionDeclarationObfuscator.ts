import * as estraverse from 'estraverse';

import { NodeObfuscator } from './NodeObfuscator';
import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

/**
 * replaces:
 *     function foo () { //... };
 *     foo();
 *
 * by:
 *     function _0x12d45f () { //... };
 *     _0x12d45f();
 */
export class FunctionDeclarationObfuscator extends NodeObfuscator {
    /**
     * @type {Map<string, string>}
     */
    private functionName: Map <string, string> = new Map <string, string> ();

    /**
     * @param functionDeclarationNode
     * @param parentNode
     */
    public obfuscateNode (functionDeclarationNode: any, parentNode: any): void {
        if (parentNode.type === 'Program') {
            return;
        }

        this.replaceFunctionName(functionDeclarationNode);
        this.replaceFunctionCalls(functionDeclarationNode);
    }

    /**
     * @param functionDeclarationNode
     */
    private replaceFunctionName (functionDeclarationNode: any): void {
        estraverse.replace(functionDeclarationNode.id, {
            leave: (node) => {
                if (node.type !== 'Identifier') {
                    return estraverse.VisitorOption.Skip;
                }

                this.functionName.set(node.name, Utils.getRandomVariableName());
                node.name = this.functionName.get(node.name);
            }
        });
    }

    /**
     * @param functionDeclarationNode
     */
    private replaceFunctionCalls (functionDeclarationNode: any): void {
        let scopeNode: any = NodeUtils.getNodeScope(
            functionDeclarationNode
        );

        estraverse.replace(scopeNode, {
            enter: (node, parentNode) => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.functionName);
            }
        });
    }
}