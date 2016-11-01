import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../types/TNodeWithBlockStatement';
import { TStatement } from '../types/TStatement';

import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { NodeUtils } from '../NodeUtils';
import { Utils } from '../Utils';

/**
 * This class appends node into a first deepest BlockStatement in order of function calls
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
 * Appends node into block statement of `baz` function expression.
 */
export class CustomNodeAppender {
    /**
     * @param blockScopeStackTraceData
     * @param blockScopeNode
     * @param nodeBodyStatements
     * @param index
     */
    public static appendNode (
        blockScopeStackTraceData: IStackTraceData[],
        blockScopeNode: TNodeWithBlockStatement,
        nodeBodyStatements: TStatement[],
        index: number = 0
    ): void {
        let targetBlockScope: TNodeWithBlockStatement;

        if (!blockScopeStackTraceData.length) {
            targetBlockScope = blockScopeNode;
        } else {
            targetBlockScope = CustomNodeAppender.getOptimalBlockScope(
                blockScopeStackTraceData,
                index
            );
        }

        NodeUtils.prependNode(targetBlockScope, nodeBodyStatements);
    }

    /**
     * @param stackTraceRootLength
     */
    public static getRandomStackTraceIndex (stackTraceRootLength: number): number {
        return Utils.getRandomGenerator().integer({
            min: 0,
            max: Math.max(0, Math.round(stackTraceRootLength - 1))
        });
    }

    /**
     * @param blockScopeTraceData
     * @param index
     * @returns {ESTree.BlockStatement}
     */
    private static getOptimalBlockScope (
        blockScopeTraceData: IStackTraceData[],
        index: number
    ): ESTree.BlockStatement {
        const firstCall: IStackTraceData = blockScopeTraceData[index];

        if (firstCall.stackTrace.length) {
            return CustomNodeAppender.getOptimalBlockScope(firstCall.stackTrace, 0);
        } else {
            return firstCall.callee;
        }
    }
}
