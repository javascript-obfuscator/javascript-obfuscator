import * as estraverse from 'estraverse';

import { IIdentifierNode } from "../interfaces/nodes/IIdentifierNode";
import { ITreeNode } from "../interfaces/nodes/ITreeNode";
import { IVariableDeclarationNode } from "../interfaces/nodes/IVariableDeclarationNode";

import { NodeObfuscator } from './NodeObfuscator';
import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

/**
 * replaces:
 *     var variable = 1;
 *     variable++;
 *
 * by:
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
    public obfuscateNode (variableDeclarationNode: IVariableDeclarationNode, parentNode: ITreeNode): void {
        if (parentNode.type === 'Program') {
            return;
        }

        this.replaceVariableName(variableDeclarationNode);
        this.replaceVariableCalls(variableDeclarationNode, parentNode);
    }

    /**
     * @param variableDeclarationNode
     */
    private replaceVariableName (variableDeclarationNode: IVariableDeclarationNode): void {
        variableDeclarationNode.declarations.forEach((declarationNode) => {
            estraverse.replace(declarationNode, {
                enter: (node: ITreeNode) => {
                    if (NodeUtils.isVariableDeclaratorNode(node)) {
                        estraverse.replace(node.id, {
                            enter: (node: IIdentifierNode) => {
                                this.variableNames.set(node.name, Utils.getRandomVariableName());
                                node.name = this.variableNames.get(node.name);
                            }
                        });

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
    private replaceVariableCalls (variableDeclarationNode: IVariableDeclarationNode, variableParentNode: ITreeNode): void {
        let scopeNode: ITreeNode;

        if (variableDeclarationNode.kind === 'var') {
            scopeNode = NodeUtils.getNodeScope(
                variableDeclarationNode
            );
        } else {
            scopeNode = variableParentNode;
        }

        let isNodeAfterVariableDeclaratorFlag: boolean = false,
            isNodeBeforeVariableDeclaratorFlag: boolean = true,
            functionParentScope: ITreeNode,
            functionNextNode: ITreeNode,
            functionIndex: number = -1;

        estraverse.replace(scopeNode, {
            enter: (node: ITreeNode, parentNode: ITreeNode) => {
                if (
                    node.type === 'FunctionDeclaration' ||
                    node.type === 'FunctionExpression' ||
                    node.type === 'ArrowFunctionExpression'
                ) {
                    functionParentScope = NodeUtils.getNodeScope(
                        node
                    );

                    if (NodeUtils.isBlockStatementNode(functionParentScope)) {
                        functionIndex = functionParentScope.body.indexOf(node);

                        if (functionIndex >= 0) {
                            functionNextNode = functionParentScope.body[functionIndex + 1];
                        }
                    }

                    isNodeAfterVariableDeclaratorFlag = true;
                }

                if (functionNextNode && isNodeBeforeVariableDeclaratorFlag && node === functionNextNode) {
                    isNodeAfterVariableDeclaratorFlag = false;
                    functionNextNode = undefined;
                    functionIndex = -1;
                }

                if (node === variableDeclarationNode) {
                    isNodeAfterVariableDeclaratorFlag = true;
                    isNodeBeforeVariableDeclaratorFlag = false;
                }

                if (isNodeAfterVariableDeclaratorFlag) {
                    this.replaceNodeIdentifierByNewValue(node, parentNode, this.variableNames);
                }
            }
        });
    }
}