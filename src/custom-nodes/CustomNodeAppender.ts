import * as ESTree from 'estree';

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
     * @param blockScopeBody
     * @param node
     * @param index
     */
    public static appendNode (
        blockScopeStackTraceData: IStackTraceData[],
        blockScopeBody: ESTree.Node[],
        node: ESTree.Node,
        index: number = 0
    ): void {
        let targetBlockScopeBody: ESTree.Node[];

        if (!blockScopeStackTraceData.length) {
            targetBlockScopeBody = blockScopeBody;
        } else {
            targetBlockScopeBody = CustomNodeAppender.getOptimalBlockScopeBody(blockScopeStackTraceData, index);
        }

        NodeUtils.prependNode(targetBlockScopeBody, node);
    }

    /**
     * @param stackTraceRootLength
     * @param threshold
     */
    public static getStackTraceIndexByThreshold (stackTraceRootLength: number, threshold: number = 0.1): number {
        if (threshold < 0 || threshold > 1) {
            throw new RangeError('`threshold` parameter should has value between 0 and 1');
        }

        return Utils.getRandomGenerator().integer({
            min: 0,
            max: Math.round((stackTraceRootLength - 1) * threshold)
        });
    }

    /**
     * @param blockScopeTraceData
     * @param index
     * @returns {ESTree.Node[]}
     */
    private static getOptimalBlockScopeBody (blockScopeTraceData: IStackTraceData[], index: number): ESTree.Node[] {
        const firstCall: IStackTraceData = blockScopeTraceData[index];

        if (firstCall.stackTrace.length) {
            return CustomNodeAppender.getOptimalBlockScopeBody(firstCall.stackTrace, 0);
        } else {
            return firstCall.callee.body;
        }
    }
}
