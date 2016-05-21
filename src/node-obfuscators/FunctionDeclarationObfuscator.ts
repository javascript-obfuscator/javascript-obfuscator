import * as estraverse from 'estraverse';

import { IFunctionDeclarationNode } from "../interfaces/nodes/IFunctionDeclarationNode";
import { ITreeNode } from "../interfaces/nodes/ITreeNode";

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
    public obfuscateNode (functionDeclarationNode: IFunctionDeclarationNode, parentNode: ITreeNode): void {
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
            leave: (node: ITreeNode): any => {
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
        let scopeNode: ITreeNode = NodeUtils.getScopeOfNode(
            functionDeclarationNode
        );

        estraverse.replace(scopeNode, {
            enter: (node: ITreeNode, parentNode: ITreeNode): any => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.functionName);
            }
        });
    }
}
