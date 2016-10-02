import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from '../types/TNodeWithBlockStatement';

import { IBlockScopeTraceData } from '../interfaces/IBlockScopeTraceData';

import { ASTTreeBlockScopeAnalyzer } from './ASTTreeBlockScopeAnalyzer';
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
export class HiddenNodeAppender {
    /**
     * @param blockScopeBody
     * @param node
     * @param index
     */
    public static appendNode (blockScopeBody: ESTree.Node[], node: ESTree.Node, index: number = 0): void {
        const blockScopeTraceData: IBlockScopeTraceData[] = new ASTTreeBlockScopeAnalyzer<IBlockScopeTraceData>(blockScopeBody).analyze();

        if (!blockScopeTraceData.length) {
            NodeUtils.prependNode(blockScopeBody, node);

            return;
        }

        NodeUtils.prependNode(
            HiddenNodeAppender.getOptimalBlockScope(blockScopeTraceData, index).body,
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
    private static getOptimalBlockScope (blockScopeTraceData: IBlockScopeTraceData[], index: number): TNodeWithBlockStatement {
        const firstCall: IBlockScopeTraceData = blockScopeTraceData[index];

        if (firstCall.trace.length) {
            return HiddenNodeAppender.getOptimalBlockScope(firstCall.trace, 0);
        } else {
            return firstCall.callee;
        }
    }
}
