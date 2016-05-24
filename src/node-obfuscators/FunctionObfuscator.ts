import * as estraverse from 'estraverse';

import { IFunctionNode } from "../interfaces/nodes/IFunctionNode";
import { INode } from "../interfaces/nodes/INode";

import { NodeObfuscator } from './NodeObfuscator';
import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

/**
 * replaces:
 *     function foo (argument1) { return argument1; };
 *
 * on:
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
    public obfuscateNode (functionNode: IFunctionNode): void {
        this.replaceFunctionParams(functionNode);
        this.replaceFunctionParamsInBody(functionNode);
    }

    /**
     * @param functionNode
     */
    private replaceFunctionParams (functionNode: IFunctionNode): void {
        functionNode.params.forEach((paramsNode: INode) => {
            estraverse.replace(paramsNode, {
                leave: (node: INode): any => {
                    if (NodeUtils.isIdentifierNode(node)) {
                        this.functionParams.set(node.name, Utils.getRandomVariableName());
                        node.name = this.functionParams.get(node.name);

                        return;
                    }

                    return estraverse.VisitorOption.Skip;
                }
            });
        });
    }

    /**
     * @param functionNode
     */
    private replaceFunctionParamsInBody (functionNode: IFunctionNode): void {
        estraverse.replace(functionNode.body, {
            leave: (node: INode, parentNode: INode): any => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.functionParams);
            }
        });
    }
}
