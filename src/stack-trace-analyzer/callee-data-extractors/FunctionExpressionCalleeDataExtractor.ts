import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICalleeData } from '../../interfaces/stack-trace-analyzer/ICalleeData';
import { ICalleeDataExtractor } from '../../interfaces/stack-trace-analyzer/ICalleeDataExtractor';

import { Node } from '../../node/Node';
import { NodeUtils } from '../../node/NodeUtils';

export class FunctionExpressionCalleeDataExtractor implements ICalleeDataExtractor {
    /**
     * @type {ESTree.Node[]}
     */
    private blockScopeBody: ESTree.Node[];

    /**
     * @type {ESTree.Identifier}
     */
    private callee: ESTree.Identifier;

    /**
     * @param blockScopeBody
     * @param callee
     */
    constructor (blockScopeBody: ESTree.Node[], callee: ESTree.Identifier) {
        this.blockScopeBody = blockScopeBody;
        this.callee = callee;
    }

    /**
     * @returns {ICalleeData|null}
     */
    public extract (): ICalleeData|null {
        let calleeBlockStatement: ESTree.BlockStatement|null = null;

        if (Node.isIdentifierNode(this.callee)) {
            calleeBlockStatement = this.getCalleeBlockStatement(
                NodeUtils.getBlockScopeOfNode(this.blockScopeBody[0]),
                this.callee.name
            );
        }

        if (Node.isFunctionExpressionNode(this.callee)) {
            calleeBlockStatement = this.callee.body;
        }

        if (!calleeBlockStatement) {
            return null;
        }

        return {
            callee: calleeBlockStatement,
            name: this.callee.name || null
        };
    }

    /**
     * @param node
     * @param name
     * @returns {ESTree.BlockStatement|null}
     */
    private getCalleeBlockStatement (node: ESTree.Node, name: string): ESTree.BlockStatement|null {
        let calleeBlockStatement: ESTree.BlockStatement|null = null;

        estraverse.traverse(node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (
                    Node.isFunctionExpressionNode(node) &&
                    Node.isVariableDeclaratorNode(parentNode) &&
                    Node.isIdentifierNode(parentNode.id) &&
                    parentNode.id.name === name
                ) {
                    calleeBlockStatement = node.body;

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        return calleeBlockStatement;
    }
}
