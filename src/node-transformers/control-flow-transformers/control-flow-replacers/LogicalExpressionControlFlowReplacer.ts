import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';
import { TInitialData } from '../../../types/TInitialData';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ControlFlowCustomNode } from '../../../enums/custom-nodes/ControlFlowCustomNode';

import { ExpressionWithOperatorControlFlowReplacer } from './ExpressionWithOperatorControlFlowReplacer';
import { LogicalExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode';
import { NodeGuards } from '../../../node/NodeGuards';
import { NodeUtils } from '../../../node/NodeUtils';

@injectable()
export class LogicalExpressionControlFlowReplacer extends ExpressionWithOperatorControlFlowReplacer {
    /**
     * @type {number}
     */
    private static readonly usingExistingIdentifierChance: number = 0.5;

    /**
     * @param {TControlFlowCustomNodeFactory} controlFlowCustomNodeFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
            controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(controlFlowCustomNodeFactory, randomGenerator, options);
    }

    /**
     * @param {LogicalExpression} logicalExpressionNode
     * @param {NodeGuards} parentNode
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {NodeGuards}
     */
    public replace (
        logicalExpressionNode: ESTree.LogicalExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: TControlFlowStorage
    ): ESTree.Node {
        if (this.checkForProhibitedExpressions(logicalExpressionNode.left, logicalExpressionNode.right)) {
            return logicalExpressionNode;
        }

        const operator: ESTree.LogicalOperator = logicalExpressionNode.operator;
        const logicalExpressionFunctionCustomNode: ICustomNode<TInitialData<LogicalExpressionFunctionNode>> =
            this.controlFlowCustomNodeFactory(ControlFlowCustomNode.LogicalExpressionFunctionNode);

        logicalExpressionFunctionCustomNode.initialize(operator);

        const storageKey: string = this.insertCustomNodeToControlFlowStorage(
            logicalExpressionFunctionCustomNode,
            controlFlowStorage,
            operator,
            LogicalExpressionControlFlowReplacer.usingExistingIdentifierChance
        );

        return this.getControlFlowStorageCallNode(
            controlFlowStorage.getStorageId(),
            storageKey,
            logicalExpressionNode.left,
            logicalExpressionNode.right
        );
    }

    /**
     * @param {Expression} leftExpression
     * @param {Expression} rightExpression
     * @returns {boolean}
     */
    private checkForProhibitedExpressions (leftExpression: ESTree.Expression, rightExpression: ESTree.Expression): boolean {
        return [leftExpression, rightExpression].some((expressionNode: ESTree.Node | ESTree.Expression): boolean => {
            let nodeForCheck: ESTree.Node | ESTree.Expression;

            if (!NodeGuards.isUnaryExpressionNode(expressionNode)) {
                nodeForCheck = expressionNode;
            } else {
                nodeForCheck = NodeUtils.getUnaryExpressionArgumentNode(expressionNode);
            }

            return !NodeGuards.isLiteralNode(nodeForCheck) &&
                !NodeGuards.isIdentifierNode(nodeForCheck) &&
                !NodeGuards.isObjectExpressionNode(nodeForCheck) &&
                !NodeGuards.isExpressionStatementNode(nodeForCheck);
        });
    }
}
