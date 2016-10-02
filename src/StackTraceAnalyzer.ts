import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from './types/TNodeWithBlockStatement';

import { IStackTraceData } from './interfaces/IStackTraceData';
import { IStackTraceAnalyzer } from './interfaces/IAnalyzer';

import { Nodes } from './Nodes';
import { NodeUtils } from './NodeUtils';

/**
 * This class generates a data with code stack trace functions calls
 *
 * For example:
 *
 * function Foo () {
 *     var baz = function () {
 *
 *     }
 *
 *     baz();
 * }
 *
 * foo();
 *
 * Will generate a structure like:
 *
 * [
 *      {
 *          callee: FOO_FUNCTION_NODE
 *          name: 'Foo',
 *          trace: [
 *              {
 *                  callee: BAZ_FUNCTION_NODE,
 *                  name: 'baz,
 *                  trace: []
 *              }
 *          ]
 *      }
 * ]
 */
export class StackTraceAnalyzer implements IStackTraceAnalyzer {
    /**
     * @type {ESTree.Node[]}
     */
    private blockScopeBody: ESTree.Node[];

    /**
     * @type {IStackTraceData[]}
     */
    private stackTraceData: IStackTraceData[] = [];

    /**
     * @param blockScopeBody
     */
    constructor (blockScopeBody: ESTree.Node[]) {
        this.blockScopeBody = blockScopeBody;
    }

    /**
     * @returns {T}
     */
    public analyze (): IStackTraceData[] {
        if (this.blockScopeBody.length === 1) {
            estraverse.traverse(this.blockScopeBody[0], {
                enter: (node: ESTree.Node): any => {
                    if (Nodes.isBlockStatementNode(node)) {
                        this.analyzeRecursive(node.body, this.stackTraceData);

                        return estraverse.VisitorOption.Skip;
                    }
                }
            });
        } else {
            this.analyzeRecursive(this.blockScopeBody, this.stackTraceData);
        }

        return this.stackTraceData;
    }

    /**
     * @param blockScopeBody
     * @param stackTraceData
     */
    private analyzeRecursive (blockScopeBody: ESTree.Node[], stackTraceData: IStackTraceData[]): void {
        for (let rootNode of blockScopeBody) {
            estraverse.traverse(rootNode, {
                enter: (node: ESTree.Node): any => {
                    if (
                        Nodes.isCallExpressionNode(node) &&
                        Nodes.isIdentifierNode(node.callee) &&
                        rootNode.parentNode === NodeUtils.getBlockScopeOfNode(node)
                    ) {
                        const calleeNode: TNodeWithBlockStatement|null = this.getCalleeBlockStatement(
                            NodeUtils.getBlockScopeOfNode(blockScopeBody[0]),
                            node.callee.name
                        );

                        if (!calleeNode) {
                            return estraverse.VisitorOption.Break;
                        }

                        const data: IStackTraceData = {
                            callee: calleeNode,
                            name: node.callee.name,
                            stackTrace: []
                        };

                        stackTraceData.push(data);

                        this.analyzeRecursive(calleeNode.body, data.stackTrace);
                    }
                }
            });
        }
    }

    private getCalleeBlockStatement (node: ESTree.Node, name: string): TNodeWithBlockStatement|null {
        let calleeBlockStatement: TNodeWithBlockStatement|null = null;

        estraverse.traverse(node, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (Nodes.isFunctionDeclarationNode(node) && node.id.name === name) {
                    calleeBlockStatement = node.body;

                    return estraverse.VisitorOption.Break;
                }

                if (
                    Nodes.isFunctionExpressionNode(node) &&
                    Nodes.isVariableDeclaratorNode(parentNode) &&
                    Nodes.isIdentifierNode(parentNode.id) &&
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
