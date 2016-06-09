import * as estraverse from 'estraverse';

import { INode } from "../interfaces/nodes/INode";
import { IVariableDeclarationNode } from "../interfaces/nodes/IVariableDeclarationNode";
import { IVariableDeclaratorNode } from "../interfaces/nodes/IVariableDeclaratorNode";

import { NodeType } from "../enums/NodeType";

import { NodeObfuscator } from './NodeObfuscator';
import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

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

        this.replaceVariableName(variableDeclarationNode);
        this.replaceVariableCalls(variableDeclarationNode, parentNode);
    }

    /**
     * @param variableDeclarationNode
     */
    private replaceVariableName (variableDeclarationNode: IVariableDeclarationNode): void {
        variableDeclarationNode.declarations.forEach((declarationNode: IVariableDeclaratorNode) => {
            estraverse.replace(declarationNode.id, {
                enter: (node: INode): any => {
                    if (NodeUtils.isIdentifierNode(node) && !this.isReservedName(node.name)) {
                        this.variableNames.set(node.name, Utils.getRandomVariableName());
                        node.name = this.variableNames.get(node.name);

                        return;
                    }

                    return estraverse.VisitorOption.Skip;
                }
            });
        });
    }

    /**
     * @param variableDeclarationNode
     * @param variableParentNode
     */
    private replaceVariableCalls (variableDeclarationNode: IVariableDeclarationNode, variableParentNode: INode): void {
        let scopeNode: INode = variableDeclarationNode.kind === 'var' ? NodeUtils.getBlockScopeOfNode(
                variableDeclarationNode
            ) : variableParentNode,
            isNodeAfterVariableDeclaratorFlag: boolean = false;

        estraverse.replace(scopeNode, {
            enter: (node: INode, parentNode: INode): any => {
                const functionNodes: string[] = [
                    NodeType.ArrowFunctionExpression,
                    NodeType.FunctionDeclaration,
                    NodeType.FunctionExpression
                ];

                if (Utils.arrayContains(functionNodes, node.type)) {
                    estraverse.replace(node, {
                        enter: (node: INode, parentNode: INode): any => {
                            this.replaceNodeIdentifierByNewValue(node, parentNode, this.variableNames);
                        }
                    });
                }

                if (node === variableDeclarationNode) {
                    isNodeAfterVariableDeclaratorFlag = true;
                }

                if (isNodeAfterVariableDeclaratorFlag) {
                    this.replaceNodeIdentifierByNewValue(node, parentNode, this.variableNames);
                }
            }
        });
    }
}
