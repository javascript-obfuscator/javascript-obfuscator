import * as estraverse from 'estraverse';

import { IFunctionDeclarationNode } from "../interfaces/nodes/IFunctionDeclarationNode";
import { INode } from "../interfaces/nodes/INode";

import { NodeType } from "../enums/NodeType";

import { NodeObfuscator } from './NodeObfuscator';
import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

/**
 * replaces:
 *     function foo () { //... };
 *     foo();
 *
 * on:
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
    public obfuscateNode (functionDeclarationNode: IFunctionDeclarationNode, parentNode: INode): void {
        if (parentNode.type === NodeType.Program) {
            return;
        }

        this.replaceFunctionName(functionDeclarationNode);
        this.replaceFunctionCalls(functionDeclarationNode);
    }

    /**
     * @param functionDeclarationNode
     */
    private replaceFunctionName (functionDeclarationNode: IFunctionDeclarationNode): void {
        estraverse.replace(functionDeclarationNode.id, {
            leave: (node: INode): any => {
                if (NodeUtils.isIdentifierNode(node)) {
                    this.functionName.set(node.name, Utils.getRandomVariableName());
                    node.name = this.functionName.get(node.name);

                    return;
                }

                return estraverse.VisitorOption.Skip;
            }
        });
    }

    /**
     * @param functionDeclarationNode
     */
    private replaceFunctionCalls (functionDeclarationNode: IFunctionDeclarationNode): void {
        let scopeNode: INode = NodeUtils.getScopeOfNode(
            functionDeclarationNode
        );

        estraverse.replace(scopeNode, {
            enter: (node: INode, parentNode: INode): any => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.functionName);
            }
        });
    }
}
