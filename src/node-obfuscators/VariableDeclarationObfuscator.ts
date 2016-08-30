import * as estraverse from 'estraverse';

import { INode } from "../interfaces/nodes/INode";
import { IVariableDeclarationNode } from "../interfaces/nodes/IVariableDeclarationNode";
import { IVariableDeclaratorNode } from "../interfaces/nodes/IVariableDeclaratorNode";

import { NodeType } from "../enums/NodeType";

import { NodeObfuscator } from './NodeObfuscator';
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
export class VariableDeclarationObfuscator extends NodeObfuscator {
    /**
     * @type {Map<string, string>}
     */
    private variableNames: Map <string, string> = new Map <string, string> ();

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
                estraverse.traverse(declarationNode.id, {
                    enter: (node: INode): any => this.storeIdentifiersNames(node, this.variableNames)
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
                            if (Nodes.isIdentifierNode(node)) {
                                node.name = this.replaceIdentifiersWithRandomNames(node, parentNode, this.variableNames);
                            }
                        }
                    });
                }

                if (Nodes.isVariableDeclarationNode(node) && node === variableDeclarationNode) {
                    isNodeAfterVariableDeclaratorFlag = true;
                }

                if (Nodes.isIdentifierNode(node) && isNodeAfterVariableDeclaratorFlag) {
                    node.name = this.replaceIdentifiersWithRandomNames(node, parentNode, this.variableNames);
                }
            }
        });
    }
}
