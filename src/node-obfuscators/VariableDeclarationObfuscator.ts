import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICustomNode } from "../interfaces/custom-nodes/ICustomNode";
import { IOptions } from "../interfaces/IOptions";

import { NodeType } from "../enums/NodeType";

import { AbstractNodeObfuscator } from './AbstractNodeObfuscator';
import { IdentifierReplacer } from "./replacers/IdentifierReplacer";
import { Nodes } from "../Nodes";
import { NodeUtils } from "../NodeUtils";

/**
 * replaces:
 *     var variable = 1;
 *     variable++;
 *
 * on:
 *     var _0x12d45f = 1;
 *     _0x12d45f++;
 *
 */
export class VariableDeclarationObfuscator extends AbstractNodeObfuscator {
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
     * @param variableDeclarationNode
     * @param parentNode
     */
    public obfuscateNode (variableDeclarationNode: ESTree.VariableDeclaration, parentNode: ESTree.Node): void {
        if (parentNode.type === NodeType.Program) {
            return;
        }

        this.storeVariableNames(variableDeclarationNode);
        this.replaceVariableNames(variableDeclarationNode, parentNode);
    }

    /**
     * @param variableDeclarationNode
     */
    private storeVariableNames (variableDeclarationNode: ESTree.VariableDeclaration): void {
        variableDeclarationNode.declarations
            .forEach((declarationNode: ESTree.VariableDeclarator) => {
                NodeUtils.typedReplace(declarationNode.id, NodeType.Identifier, {
                    leave: (node: ESTree.Identifier) => this.identifierReplacer.storeNames(node.name)
                });
            });
    }

    /**
     * @param variableDeclarationNode
     * @param variableParentNode
     */
    private replaceVariableNames (variableDeclarationNode: ESTree.VariableDeclaration, variableParentNode: ESTree.Node): void {
        let scopeNode: ESTree.Node = variableDeclarationNode.kind === 'var' ? NodeUtils.getBlockScopeOfNode(
                variableDeclarationNode
            ) : variableParentNode;

        estraverse.replace(scopeNode, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (!node.obfuscated && Nodes.isReplaceableIdentifierNode(node, parentNode)) {
                    node.name = this.identifierReplacer.replace(node.name);
                }
            }
        });
    }
}
