import * as estraverse from 'estraverse';

import { IBlockStatementNode } from "../interfaces/nodes/IBlockStatementNode";
import { IFunctionNode } from "../interfaces/nodes/IFunctionNode";
import { INode } from "../interfaces/nodes/INode";

import { NodeObfuscator } from './NodeObfuscator';
import { Nodes } from "../Nodes";
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
        this.replaceFunctionParamsInBlockStatement(functionNode);
    }

    /**
     * @param functionNode
     */
    private replaceFunctionParams (functionNode: IFunctionNode): void {
        functionNode.params.forEach((paramsNode: INode) => {
            estraverse.traverse(paramsNode, {
                leave: (node: INode): any => this.storeIdentifiersNames(node, this.functionParams)
            });
        });
    }

    /**
     * @param functionNode
     */
    private replaceFunctionParamsInBlockStatement (functionNode: IFunctionNode): void {
        estraverse.replace(functionNode, {
            leave: (node: INode, parentNode: INode): any => {
                this.replaceIdentifiersWithRandomNames(node, parentNode, this.functionParams);
            }
        });
    }
}
