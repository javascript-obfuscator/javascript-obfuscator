import { NodeObfuscator } from './NodeObfuscator';
import { Utils } from '../Utils';

let estraverse = require('estraverse');

/**
 * replaces:
 *     function foo (argument1) { return argument1; };
 *
 * by:
 *     function foo (_0x12d45f) { return _0x12d45f; };
 *
 */
export class FunctionObfuscator extends NodeObfuscator {
    /**
     * @type {Map<string, string>}
     */
    private functionParams: Map <string, string> = new Map <string, string> ();

    /**
     * @param functionNode
     */
    public obfuscateNode (functionNode: any): void {
        this.replaceFunctionParams(functionNode);
        this.replaceFunctionParamsInBody(functionNode);
    }

    /**
     * @param functionNode
     */
    private replaceFunctionParams (functionNode: any): void {
        functionNode.params.forEach((paramsNode) => {
            estraverse.replace(paramsNode, {
                leave: (node) => {
                    if (node.type !== 'Identifier') {
                       return;
                    }

                    this.functionParams.set(node.name, Utils.getRandomVariableName());
                    node.name = this.functionParams.get(node.name);
                }
            });
        });
    }

    /**
     * @param functionNode
     */
    private replaceFunctionParamsInBody (functionNode: any): void {
        estraverse.replace(functionNode.body, {
            leave: (node, parentNode) => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.functionParams);
            }
        });
    }
}