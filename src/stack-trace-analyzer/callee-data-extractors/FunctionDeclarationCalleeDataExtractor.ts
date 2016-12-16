import { injectable } from 'inversify';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { ICalleeData } from '../../interfaces/stack-trace-analyzer/ICalleeData';

import { AbstractCalleeDataExtractor } from './AbstractCalleeDataExtractor';
import { Node } from '../../node/Node';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class FunctionDeclarationCalleeDataExtractor extends AbstractCalleeDataExtractor {
    /**
     * @param blockScopeBody
     * @param callee
     * @returns {ICalleeData|null}
     */
    public extract (blockScopeBody: ESTree.Node[], callee: ESTree.Identifier): ICalleeData|null {
        let calleeBlockStatement: ESTree.BlockStatement|null = null;

        if (Node.isIdentifierNode(callee)) {
            calleeBlockStatement = this.getCalleeBlockStatement(
                NodeUtils.getBlockScopesOfNode(blockScopeBody[0])[0],
                callee.name
            );
        }

        if (!calleeBlockStatement) {
            return null;
        }

        return {
            callee: calleeBlockStatement,
            name: callee.name
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
            enter: (node: ESTree.Node): any => {
                if (Node.isFunctionDeclarationNode(node) && node.id.name === name) {
                    calleeBlockStatement = node.body;

                    return estraverse.VisitorOption.Break;
                }
            }
        });

        return calleeBlockStatement;
    }
}
