import * as estraverse from 'estraverse';

import { IFunctionDeclarationNode } from "../interfaces/nodes/IFunctionDeclarationNode";
import { INode } from "../interfaces/nodes/INode";

import { NodeType } from "../enums/NodeType";

import { AbstractNodeObfuscator } from './AbstractNodeObfuscator';
import { IdentifierReplacer } from "./replacers/IdentifierReplacer";
import { Nodes } from "../Nodes";
import { NodeUtils } from "../NodeUtils";

/**
 * replaces:
 *     function foo () { //... };
 *     foo();
 *
 * on:
 *     function _0x12d45f () { //... };
 *     _0x12d45f();
 */
export class FunctionDeclarationObfuscator extends AbstractNodeObfuscator {
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

        this.storeFunctionName(functionDeclarationNode);
        this.replaceFunctionName(functionDeclarationNode);
    }

    /**
     * @param functionDeclarationNode
     */
    private storeFunctionName (functionDeclarationNode: IFunctionDeclarationNode): void {
        estraverse.traverse(functionDeclarationNode.id, {
            leave: (node: INode): any => this.storeIdentifiersNames(node, this.functionName)
        });
    }

    /**
     * @param functionDeclarationNode
     */
    private replaceFunctionName (functionDeclarationNode: IFunctionDeclarationNode): void {
        let scopeNode: INode = NodeUtils.getBlockScopeOfNode(
            functionDeclarationNode
        );

        estraverse.replace(scopeNode, {
            enter: (node: INode, parentNode: INode): any => {
                if (Nodes.isReplaceableIdentifierNode(node, parentNode)) {
                    node.name = new IdentifierReplacer(this.nodes, this.options)
                        .replace(node.name, this.functionName);
                }
            }
        });
    }
}
