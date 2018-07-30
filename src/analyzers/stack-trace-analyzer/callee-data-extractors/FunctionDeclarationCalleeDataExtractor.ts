import { injectable } from 'inversify';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICalleeData } from '../../../interfaces/analyzers/stack-trace-analyzer/ICalleeData';

import { AbstractCalleeDataExtractor } from './AbstractCalleeDataExtractor';
import { NodeGuards } from '../../../node/NodeGuards';
import { NodeStatementUtils } from '../../../node/NodeStatementUtils';

@injectable()
export class FunctionDeclarationCalleeDataExtractor extends AbstractCalleeDataExtractor {
    /**
     * @param {NodeGuards[]} blockScopeBody
     * @param {Identifier} callee
     * @returns {ICalleeData}
     */
    public extract (blockScopeBody: ESTree.Node[], callee: ESTree.Identifier): ICalleeData | null {
        if (!NodeGuards.isIdentifierNode(callee)) {
            return null;
        }

        const calleeBlockStatement: ESTree.BlockStatement | null = this.getCalleeBlockStatement(
            NodeStatementUtils.getParentNodeWithStatements(blockScopeBody[0]),
            callee.name
        );

        if (!calleeBlockStatement) {
            return null;
        }

        return {
            callee: calleeBlockStatement,
            name: callee.name
        };
    }

    /**
     * @param {NodeGuards} targetNode
     * @param {string} name
     * @returns {BlockStatement}
     */
    private getCalleeBlockStatement (targetNode: ESTree.Node, name: string): ESTree.BlockStatement | null {
        let calleeBlockStatement: ESTree.BlockStatement | null = null;

        estraverse.traverse(targetNode, {
            enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                if (NodeGuards.isFunctionDeclarationNode(node) && node.id.name === name) {
                    calleeBlockStatement = node.body;

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        return calleeBlockStatement;
    }
}
