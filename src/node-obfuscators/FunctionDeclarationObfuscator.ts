import * as estraverse from 'estraverse';

import { ICustomNode } from "../interfaces/custom-nodes/ICustomNode";
import { IFunctionDeclarationNode } from "../interfaces/nodes/IFunctionDeclarationNode";
import { IIdentifierNode } from "../interfaces/nodes/IIdentifierNode";
import { INode } from "../interfaces/nodes/INode";
import { IOptions } from "../interfaces/IOptions";

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
     * @type {IdentifierReplacer}
     */
    private identifierReplacer: IdentifierReplacer;

    /**
     * @param nodes
     * @param options
     */
    constructor(nodes: Map <string, ICustomNode>, options: IOptions) {
        super(nodes, options);

        this.identifierReplacer = new IdentifierReplacer(this.nodes, this.options);
    }

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
        NodeUtils.typedReplace(functionDeclarationNode.id, NodeType.Identifier, {
            leave: (node: IIdentifierNode) => this.identifierReplacer.storeNames(node.name)
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
                    node.name = this.identifierReplacer.replace(node.name);
                }
            }
        });
    }
}
