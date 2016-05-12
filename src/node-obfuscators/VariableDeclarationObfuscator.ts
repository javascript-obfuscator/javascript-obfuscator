import { NodeObfuscator } from './NodeObfuscator';
import { NodeUtils } from "../NodeUtils";
import { Utils } from '../Utils';

let estraverse = require('estraverse');

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
    public obfuscateNode (variableDeclarationNode: any, parentNode: any): void {
        if (parentNode.type === 'Program') {
            return;
        }

        this.replaceVariableName(variableDeclarationNode);
        this.replaceVariableCalls(variableDeclarationNode, parentNode);
    }

    /**
     * @param variableDeclarationNode
     */
    private replaceVariableName (variableDeclarationNode: any): void {
        variableDeclarationNode.declarations.forEach((declarationNode) => {
            estraverse.replace(declarationNode, {
                enter: (node) => {
                    if (node.type !== 'VariableDeclarator') {
                        return;
                    }

                    estraverse.replace(node.id, {
                        enter: (node) => {
                            this.variableNames.set(node.name, Utils.getRandomVariableName());
                            node.name = this.variableNames.get(node.name);
                        }
                    });
                }
            });
        });
    }

    /**
     * @param variableDeclarationNode
     * @param variableParentNode
     */
    private replaceVariableCalls (variableDeclarationNode: any, variableParentNode: any): void {
        let scopeNode: any;

        if (variableDeclarationNode.kind === 'var') {
            scopeNode = NodeUtils.getNodeScope(
                variableDeclarationNode
            );
        } else {
            scopeNode = variableParentNode;
        }

        let isNodeAfterVariableDeclaratorFlag: boolean = false,
            isNodeBeforeVariableDeclaratorFlag: boolean = true,
            functionParentScope: any,
            functionNextNode: any,
            functionIndex: number = -1;

        estraverse.replace(scopeNode, {
            enter: (node, parentNode) => {
                if (node.parentNode && (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression')) {
                    functionParentScope = NodeUtils.getNodeScope(
                        node
                    );

                    functionIndex = functionParentScope.body.indexOf(node);

                    if (functionIndex >= 0) {
                        functionNextNode = functionParentScope.body[functionIndex + 1];
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