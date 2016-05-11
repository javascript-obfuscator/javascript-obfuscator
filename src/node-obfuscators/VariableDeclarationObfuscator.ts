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
    private variableName: Map <string, string> = new Map <string, string> ();

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
                            this.variableName.set(node.name, Utils.getRandomVariableName());
                            node.name = this.variableName.get(node.name);
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
        let scopeNode: any,
            statementNode: any;

        if (variableDeclarationNode.kind === 'var') {
            scopeNode = NodeUtils.getNodeScope(
                variableDeclarationNode
            );
        } else {
            scopeNode = variableParentNode;
        }

        estraverse.replace(scopeNode, {
            enter: (node, parentNode) => {
                this.replaceNodeIdentifierByNewValue(node, parentNode, this.variableName);
            }
        });
    }
}