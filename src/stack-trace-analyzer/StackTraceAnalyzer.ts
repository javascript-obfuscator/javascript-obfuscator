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

import { Nodes } from '../Nodes';
import { NodeUtils } from '../NodeUtils';

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
     * @type {Map<string, TCalleeDataExtractor>}
     */
    private calleeDataExtractors: Map <string, TCalleeDataExtractor> = new Map <string, TCalleeDataExtractor> ([
        [NodeType.FunctionDeclaration, FunctionDeclarationCalleeDataExtractor],
        [NodeType.FunctionExpression, FunctionExpressionCalleeDataExtractor],
        [NodeType.ObjectExpression, ObjectExpressionCalleeDataExtractor]
    ]);

    /**
     * @param blockScopeBody
     */
    constructor (blockScopeBody: ESTree.Node[]) {
        this.blockScopeBody = blockScopeBody;
    }

    /**
     * @returns {IStackTraceData[]}
     */
    public analyze (): IStackTraceData[] {
        return this.analyzeRecursive(this.blockScopeBody);
    }

    /**
     * @param blockScopeBody
     * @returns {IStackTraceData[]}
     */
    private analyzeRecursive (blockScopeBody: ESTree.Node[]): IStackTraceData[] {
        const stackTraceData: IStackTraceData[] = [];

        for (const rootNode of blockScopeBody) {
            estraverse.traverse(rootNode, {
                enter: (node: ESTree.Node): any => {
                    if (!Nodes.isCallExpressionNode(node) || rootNode.parentNode !== NodeUtils.getBlockScopeOfNode(node)) {
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
