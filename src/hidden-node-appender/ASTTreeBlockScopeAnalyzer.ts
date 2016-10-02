import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../types/TNodeWithBlockStatement';

import { IBlockScopeTraceData } from '../interfaces/IBlockScopeTraceData';

import { Nodes } from '../Nodes';
import { NodeUtils } from '../NodeUtils';
import { IAnalyzer } from '../interfaces/IAnalyzer';

/**
 * This class generates a structure with order of function trace calls
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
export class ASTTreeBlockScopeAnalyzer <T> implements IAnalyzer<T> {
    /**
     * @type {ESTree.Node[]}
     */
    private blockScopeBody: ESTree.Node[];

    /**
     * @type {T[]}
     */
    private blockScopeTraceData: T[] = [];

    /**
     * @param blockScopeBody
     */
    constructor (blockScopeBody: ESTree.Node[]) {
        this.blockScopeBody = blockScopeBody;
    }

    /**
     * @returns {T}
     */
    public analyze (): T[] {
        if (this.blockScopeBody.length === 1) {
            estraverse.traverse(this.blockScopeBody[0], {
                enter: (node: ESTree.Node): any => {
                    if (Nodes.isBlockStatementNode(node)) {
                        this.analyzeRecursive(node.body, this.blockScopeTraceData);

                        return estraverse.VisitorOption.Skip;
                    }
                }
            });
        } else {
            this.analyzeRecursive(this.blockScopeBody, this.blockScopeTraceData);
        }

        return this.blockScopeTraceData;
    }

    /**
     * @param blockScopeBody
     * @param dataTree
     */
    private analyzeRecursive (blockScopeBody: ESTree.Node[], dataTree: any): void {
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

                        const data: IBlockScopeTraceData = {
                            callee: calleeNode,
                            name: node.callee.name,
                            trace: []
                        };

                        dataTree.push(data);

                        this.analyzeRecursive(calleeNode.body, data.trace)
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
