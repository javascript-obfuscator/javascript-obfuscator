import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { ControlFlowCustomNode } from '../../../enums/container/custom-nodes/ControlFlowCustomNode';

import { ExpressionWithOperatorControlFlowReplacer } from './ExpressionWithOperatorControlFlowReplacer';
import { Node } from '../../../node/Node';
import { NodeUtils } from '../../../node/NodeUtils';

@injectable()
export class LogicalExpressionControlFlowReplacer extends ExpressionWithOperatorControlFlowReplacer {
    /**
     * @type {number}
     */
    private static readonly usingExistingIdentifierChance: number = 0.5;

    /**
     * @param controlFlowCustomNodeFactory
     * @param randomGenerator
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
            controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(controlFlowCustomNodeFactory, randomGenerator, options);
    }

    /**
     * @param logicalExpressionNode
     * @param parentNode
     * @param controlFlowStorage
     * @returns {ESTree.Node}
     */
    public replace (
        logicalExpressionNode: ESTree.LogicalExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage <ICustomNode>
    ): ESTree.Node {
        if (this.checkForProhibitedExpressions(logicalExpressionNode.left, logicalExpressionNode.right)) {
            return logicalExpressionNode;
        }

        const replacerId: string = logicalExpressionNode.operator;
        const logicalExpressionFunctionCustomNode: ICustomNode = this.controlFlowCustomNodeFactory(
            ControlFlowCustomNode.LogicalExpressionFunctionNode
        );

        logicalExpressionFunctionCustomNode.initialize(replacerId);

        const storageKey: string = this.insertCustomNodeToControlFlowStorage(
            logicalExpressionFunctionCustomNode,
            controlFlowStorage,
            replacerId,
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
     * @param leftExpression
     * @param rightExpression
     * @returns {boolean}
     */
    private checkForProhibitedExpressions (leftExpression: ESTree.Expression, rightExpression: ESTree.Expression): boolean {
        return [leftExpression, rightExpression].some((expressionNode: ESTree.Node | ESTree.Expression): boolean => {
            let nodeForCheck: ESTree.Node | ESTree.Expression;

            if (!Node.isUnaryExpressionNode(expressionNode)) {
                nodeForCheck = expressionNode;
            } else {
                nodeForCheck = NodeUtils.getUnaryExpressionArgumentNode(expressionNode);
            }

            return !Node.isLiteralNode(nodeForCheck) &&
                !Node.isIdentifierNode(nodeForCheck) &&
                !Node.isObjectExpressionNode(nodeForCheck) &&
                !Node.isExpressionStatementNode(nodeForCheck);
        });
    }
}
