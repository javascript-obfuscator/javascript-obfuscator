import * as estraverse from 'estraverse';

import { IFunctionNode } from "../interfaces/nodes/IFunctionNode";
import { INode } from "../interfaces/nodes/INode";

import { NodeObfuscator } from './NodeObfuscator';
import { Nodes } from "../Nodes";

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
        this.storeFunctionParams(functionNode);
        this.replaceFunctionParams(functionNode);
    }

    /**
     * @param functionNode
     */
    private storeFunctionParams (functionNode: IFunctionNode): void {
        functionNode.params
            .forEach((paramsNode: INode) => {
                estraverse.traverse(paramsNode, {
                    enter: (node: INode): any => this.storeIdentifiersNames(node, this.functionParams)
                });
            });
    }

    /**
     * @param functionNode
     */
    private replaceFunctionParams (functionNode: IFunctionNode): void {
        let replaceVisitor: estraverse.Visitor = {
            enter: (node: INode, parentNode: INode): any => {
                let newNodeName: string = '';

                if (Nodes.isIdentifierNode(node)) {
                    newNodeName = node.name;
                }

                this.replaceIdentifiersWithRandomNames(node, parentNode, this.functionParams);

                if (Nodes.isIdentifierNode(node)) {
                    if (node.name !== newNodeName) {
                        node.obfuscated = true;
                    }
                }
            }
        };

        functionNode.params
            .forEach((paramsNode: INode) => {
                estraverse.replace(paramsNode, replaceVisitor);
            });

        estraverse.replace(functionNode.body, replaceVisitor);
    }
}
