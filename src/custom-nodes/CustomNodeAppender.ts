import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../types/TNodeWithBlockStatement';

import { IStackTraceData } from '../interfaces/IStackTraceData';

import { NodeUtils } from '../NodeUtils';
import { StackTraceAnalyzer } from '../StackTraceAnalyzer';
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
     * @param blockScopeBody
     * @param node
     * @param index
     */
    public static appendNode (blockScopeBody: ESTree.Node[], node: ESTree.Node, index: number = 0): void {
        const blockScopeTraceData: IStackTraceData[] = new StackTraceAnalyzer(blockScopeBody).analyze();

        if (!blockScopeTraceData.length) {
            NodeUtils.prependNode(blockScopeBody, node);

            return;
        }

        NodeUtils.prependNode(
            CustomNodeAppender.getOptimalBlockScope(blockScopeTraceData, index).body,
            node
        );
    }

    /**
     * @param blockStatementBodyLength
     * @param threshold
     */
    public static getIndexByThreshold (blockStatementBodyLength: number, threshold: number = 0.1): number {
        if (threshold < 0 || threshold > 1) {
            throw new RangeError('`threshold` parameter should has value between 0 and 1');
        }

        return Utils.getRandomGenerator().integer({
            min: 0,
            max: Math.round(blockStatementBodyLength * threshold)
        });
    }

    /**
     * @param blockScopeTraceData
     * @param index
     * @returns {TNodeWithBlockStatement}
     */
    private static getOptimalBlockScope (blockScopeTraceData: IStackTraceData[], index: number): TNodeWithBlockStatement {
        const firstCall: IStackTraceData = blockScopeTraceData[index];

        if (firstCall.stackTrace.length) {
            return CustomNodeAppender.getOptimalBlockScope(firstCall.stackTrace, 0);
        } else {
            return firstCall.callee;
        }
    }
}
