import { injectable } from 'inversify';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TCalleeDataExtractor } from '../types/TCalleeDataExtractor';

import { ICalleeData } from '../interfaces/stack-trace-analyzer/ICalleeData';
import { IStackTraceAnalyzer } from '../interfaces/stack-trace-analyzer/IStackTraceAnalyzer';
import { IStackTraceData } from '../interfaces/stack-trace-analyzer/IStackTraceData';

import { NodeType } from '../enums/NodeType';

import { FunctionDeclarationCalleeDataExtractor } from './callee-data-extractors/FunctionDeclarationCalleeDataExtractor';
import { FunctionExpressionCalleeDataExtractor } from './callee-data-extractors/FunctionExpressionCalleeDataExtractor';
import { ObjectExpressionCalleeDataExtractor } from './callee-data-extractors/ObjectExpressionCalleeDataExtractor';

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
     * @type {number}
     */
    private static readonly limitThresholdActivationLength: number = 25;

    /**
     * @type {number}
     */
    private static readonly limitThreshold: number = 0.002;

    /**
     * @type {Map<string, TCalleeDataExtractor>}
     */
    private readonly calleeDataExtractors: Map <string, TCalleeDataExtractor> = new Map <string, TCalleeDataExtractor> ([
        [NodeType.FunctionDeclaration, FunctionDeclarationCalleeDataExtractor],
        [NodeType.FunctionExpression, FunctionExpressionCalleeDataExtractor],
        [NodeType.ObjectExpression, ObjectExpressionCalleeDataExtractor]
    ]);

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

        for (
            let index: number = 0, blockScopeBodyLength: number = blockScopeBody.length;
            index < blockScopeBodyLength;
            index++
        ) {
            const rootNode: ESTree.Node = blockScopeBody[index];

            if (index > limitIndex) {
                break;
            }

            estraverse.traverse(rootNode, {
                enter: (node: ESTree.Node): any => {
                    if (!Node.isCallExpressionNode(node) || rootNode.parentNode !== NodeUtils.getBlockScopeOfNode(node)) {
                        return;
                    }

                    this.calleeDataExtractors.forEach((calleeDataExtractor: TCalleeDataExtractor) => {
                        const calleeData: ICalleeData|null = new calleeDataExtractor(
                            blockScopeBody,
                            node.callee
                        ).extract();

                        if (!calleeData) {
                            return;
                        }

                        stackTraceData.push(Object.assign({}, calleeData, {
                            stackTrace: this.analyzeRecursive(calleeData.callee.body)
                        }));
                    });
                }
            });
        }

        return stackTraceData;
    }
}
