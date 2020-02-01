import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TCalleeDataExtractorFactory } from '../../types/container/calls-graph-analyzer/TCalleeDataExtractorFactory';

import { ICalleeData } from '../../interfaces/analyzers/calls-graph-analyzer/ICalleeData';
import { ICallsGraphAnalyzer } from '../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer';
import { ICallsGraphData } from '../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';

import { CalleeDataExtractor } from '../../enums/analyzers/calls-graph-analyzer/CalleeDataExtractor';

import { NodeGuards } from '../../node/NodeGuards';
import { NodeStatementUtils } from '../../node/NodeStatementUtils';

/**
 * This class generates a data with a graph of functions calls
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
export class CallsGraphAnalyzer implements ICallsGraphAnalyzer {
    /**
     * @type {CalleeDataExtractor[]}
     */
    private static readonly calleeDataExtractorsList: CalleeDataExtractor[] = [
        CalleeDataExtractor.FunctionDeclarationCalleeDataExtractor,
        CalleeDataExtractor.FunctionExpressionCalleeDataExtractor,
        CalleeDataExtractor.ObjectExpressionCalleeDataExtractor
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
     * @type {TCalleeDataExtractorFactory}
     */
    private readonly calleeDataExtractorFactory: TCalleeDataExtractorFactory;

    public constructor (
        @inject(ServiceIdentifiers.Factory__ICalleeDataExtractor) calleeDataExtractorFactory: TCalleeDataExtractorFactory
    ) {
        this.calleeDataExtractorFactory = calleeDataExtractorFactory;
    }

    /**
     * @param {number} blockScopeBodyLength
     * @returns {number}
     */
    public static getLimitIndex (blockScopeBodyLength: number): number {
        const lastIndex: number = blockScopeBodyLength - 1;
        const limitThresholdActivationIndex: number = CallsGraphAnalyzer.limitThresholdActivationLength - 1;

        let limitIndex: number = lastIndex;

        if (lastIndex > limitThresholdActivationIndex) {
            limitIndex = Math.round(
                limitThresholdActivationIndex + (lastIndex * CallsGraphAnalyzer.limitThreshold)
            );

            if (limitIndex > lastIndex) {
                limitIndex = lastIndex;
            }
        }

        return limitIndex;
    }

    /**
     * @param {Program} astTree
     * @returns {ICallsGraphData[]}
     */
    public analyze (astTree: ESTree.Program): ICallsGraphData[] {
        return this.analyzeRecursive(astTree.body);
    }

    /**
     * @param {NodeGuards[]} blockScopeBody
     * @returns {ICallsGraphData[]}
     */
    private analyzeRecursive (blockScopeBody: ESTree.Node[]): ICallsGraphData[] {
        const limitIndex: number = CallsGraphAnalyzer.getLimitIndex(blockScopeBody.length);
        const callsGraphData: ICallsGraphData[] = [];
        const blockScopeBodyLength: number = blockScopeBody.length;

        for (let index: number = 0; index < blockScopeBodyLength; index++) {
            if (index > limitIndex) {
                break;
            }

            const blockScopeBodyNode: ESTree.Node = blockScopeBody[index];

            estraverse.traverse(blockScopeBodyNode, {
                enter: (node: ESTree.Node): estraverse.VisitorOption | void => {
                    if (!NodeGuards.isCallExpressionNode(node)) {
                        return;
                    }

                    if (blockScopeBodyNode.parentNode !== NodeStatementUtils.getParentNodeWithStatements(node)) {
                        return estraverse.VisitorOption.Skip;
                    }

                    this.analyzeCallExpressionNode(callsGraphData, blockScopeBody, node);
                }
            });
        }

        return callsGraphData;
    }

    /**
     * @param {ICallsGraphData[]} callsGraphData
     * @param {NodeGuards[]} blockScopeBody
     * @param {CallExpression} callExpressionNode
     */
    private analyzeCallExpressionNode (
        callsGraphData: ICallsGraphData[],
        blockScopeBody: ESTree.Node[],
        callExpressionNode: ESTree.CallExpression
    ): void {
        CallsGraphAnalyzer.calleeDataExtractorsList.forEach((calleeDataExtractorName: CalleeDataExtractor) => {
            const calleeData: ICalleeData | null = this.calleeDataExtractorFactory(calleeDataExtractorName)
                .extract(blockScopeBody, callExpressionNode.callee);

            if (!calleeData) {
                return;
            }

            callsGraphData.push({
                ...calleeData,
                callsGraph: this.analyzeRecursive(calleeData.callee.body)
            });
        });
    }
}
