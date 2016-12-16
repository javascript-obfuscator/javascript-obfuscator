import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TCalleeDataExtractorsFactory } from '../types/container/TCalleeDataExtractorsFactory';

import { ICalleeData } from '../interfaces/stack-trace-analyzer/ICalleeData';
import { ICalleeDataExtractor } from '../interfaces/stack-trace-analyzer/ICalleeDataExtractor';
import { IStackTraceAnalyzer } from '../interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { CalleeDataExtractors } from '../enums/container/CalleeDataExtractors';

import { Node } from '../node/Node';
import { NodeUtils } from '../node/NodeUtils';

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
@injectable()
export class StackTraceAnalyzer implements IStackTraceAnalyzer {
    /**
     * @type {CalleeDataExtractors[]}
     */
    private static readonly calleeDataExtractorsList: CalleeDataExtractors[] = [
        CalleeDataExtractors.FunctionDeclarationCalleeDataExtractor,
        CalleeDataExtractors.FunctionExpressionCalleeDataExtractor,
        CalleeDataExtractors.ObjectExpressionCalleeDataExtractor
    ];

    /**
     * @type {number}
     */
    private static readonly limitThresholdActivationLength: number = 25;

    /**
     * @type {number}
     */
    private static readonly limitThreshold: number = 0.002;

    /**
     * @type {(calleeDataExtractorName: CalleeDataExtractors) => ICalleeDataExtractor}
     */
    private calleeDataExtractorsFactory: (calleeDataExtractorName: CalleeDataExtractors) => ICalleeDataExtractor;

    constructor (
        @inject(ServiceIdentifiers['Factory<ICalleeDataExtractor>']) calleeDataExtractorsFactory: TCalleeDataExtractorsFactory
    ) {
        this.calleeDataExtractorsFactory = calleeDataExtractorsFactory;
    }

    /**
     * @param blockScopeBodyLength
     * @returns {number}
     */
    public static getLimitIndex (blockScopeBodyLength: number): number {
        const lastIndex: number = blockScopeBodyLength - 1;
        const limitThresholdActivationIndex: number = StackTraceAnalyzer.limitThresholdActivationLength - 1;

        let limitIndex: number = lastIndex;

        if (lastIndex > limitThresholdActivationIndex) {
            limitIndex = Math.round(
                limitThresholdActivationIndex + (lastIndex * StackTraceAnalyzer.limitThreshold)
            );

            if (limitIndex > lastIndex) {
                limitIndex = lastIndex;
            }
        }

        return limitIndex;
    }

    /**
     * @param blockScopeBody
     * @returns {IStackTraceData[]}
     */
    public analyze (blockScopeBody: ESTree.Node[]): IStackTraceData[] {
        return this.analyzeRecursive(blockScopeBody);
    }

    /**
     * @param blockScopeBody
     * @returns {IStackTraceData[]}
     */
    private analyzeRecursive (blockScopeBody: ESTree.Node[]): IStackTraceData[] {
        const limitIndex: number = StackTraceAnalyzer.getLimitIndex(blockScopeBody.length);
        const stackTraceData: IStackTraceData[] = [];
        const blockScopeBodyLength: number = blockScopeBody.length;

        for (let index: number = 0; index < blockScopeBodyLength; index++) {
            if (index > limitIndex) {
                break;
            }

            const blockScopeBodyNode: ESTree.Node = blockScopeBody[index];

            estraverse.traverse(blockScopeBodyNode, {
                enter: (node: ESTree.Node): void => {
                    if (
                        !Node.isCallExpressionNode(node) ||
                        blockScopeBodyNode.parentNode !== NodeUtils.getBlockScopesOfNode(node)[0]
                    ) {
                        return;
                    }

                    this.analyzeCallExpressionNode(stackTraceData, blockScopeBody, node);
                }
            });
        }

        return stackTraceData;
    }

    /**
     * @param stackTraceData
     * @param blockScopeBody
     * @param callExpressionNode
     * @returns {IStackTraceData[]}
     */
    private analyzeCallExpressionNode (
        stackTraceData: IStackTraceData[],
        blockScopeBody: ESTree.Node[],
        callExpressionNode: ESTree.CallExpression
    ): void {
        StackTraceAnalyzer.calleeDataExtractorsList.forEach((calleeDataExtractorName: CalleeDataExtractors) => {
            const calleeData: ICalleeData | null = this.calleeDataExtractorsFactory(calleeDataExtractorName)
                .extract(blockScopeBody, callExpressionNode.callee);

            if (!calleeData) {
                return;
            }

            stackTraceData.push({
                ...calleeData,
                stackTrace: this.analyzeRecursive(calleeData.callee.body)
            });
        });
    }
}
