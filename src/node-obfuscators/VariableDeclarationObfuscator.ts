import * as estraverse from 'estraverse';

import { ICustomNode } from "../interfaces/custom-nodes/ICustomNode";
import { IIdentifierNode } from "../interfaces/nodes/IIdentifierNode";
import { INode } from "../interfaces/nodes/INode";
import { IOptions } from "../interfaces/IOptions";
import { IVariableDeclarationNode } from "../interfaces/nodes/IVariableDeclarationNode";
import { IVariableDeclaratorNode } from "../interfaces/nodes/IVariableDeclaratorNode";

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
    public obfuscateNode (variableDeclarationNode: IVariableDeclarationNode, parentNode: INode): void {
        if (parentNode.type === NodeType.Program) {
            return;
        }

        this.storeVariableNames(variableDeclarationNode);
        this.replaceVariableNames(variableDeclarationNode, parentNode);
    }

    /**
     * @param variableDeclarationNode
     */
    private storeVariableNames (variableDeclarationNode: IVariableDeclarationNode): void {
        variableDeclarationNode.declarations
            .forEach((declarationNode: IVariableDeclaratorNode) => {
                NodeUtils.typedReplace(declarationNode.id, NodeType.Identifier, {
                    leave: (node: IIdentifierNode) => {
                        this.identifierReplacer.storeNames(node.name)
                    }
                });
            });
    }

    /**
     * @param variableDeclarationNode
     * @param variableParentNode
     */
    private replaceVariableNames (variableDeclarationNode: IVariableDeclarationNode, variableParentNode: INode): void {
        let scopeNode: INode = variableDeclarationNode.kind === 'var' ? NodeUtils.getBlockScopeOfNode(
                variableDeclarationNode
            ) : variableParentNode,
            isNodeAfterVariableDeclaratorFlag: boolean = false;

        estraverse.replace(scopeNode, {
            enter: (node: INode, parentNode: INode): any => {
                if (
                    Nodes.isArrowFunctionExpressionNode(node) ||
                    Nodes.isFunctionDeclarationNode(node) ||
                    Nodes.isFunctionExpressionNode(node)
                ) {
                    estraverse.replace(node, {
                        enter: (node: INode, parentNode: INode): any => {
                            if (Nodes.isReplaceableIdentifierNode(node, parentNode)) {
                                node.name = this.identifierReplacer.replace(node.name);
                            }
                        }
                    });
                }

                if (Nodes.isVariableDeclarationNode(node) && node === variableDeclarationNode) {
                    isNodeAfterVariableDeclaratorFlag = true;
                }

                if (Nodes.isReplaceableIdentifierNode(node, parentNode) && isNodeAfterVariableDeclaratorFlag) {
                    node.name = this.identifierReplacer.replace(node.name);
                }
            }
        });
    }
}
