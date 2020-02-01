import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowStorage } from '../../../types/storages/TControlFlowStorage';
import { TInitialData } from '../../../types/TInitialData';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ControlFlowCustomNode } from '../../../enums/custom-nodes/ControlFlowCustomNode';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { CallExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode';
import { CallExpressionControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode';
import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class CallExpressionControlFlowReplacer extends AbstractControlFlowReplacer {
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
     * @param {CallExpression} callExpressionNode
     * @param {NodeGuards} parentNode
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {NodeGuards}
     */
    public replace (
        callExpressionNode: ESTree.CallExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: TControlFlowStorage
    ): ESTree.Node {
        const callee: ESTree.Expression = <ESTree.Expression>callExpressionNode.callee;

        if (!NodeGuards.isIdentifierNode(callee)) {
            return callExpressionNode;
        }

        const replacerId: string = String(callExpressionNode.arguments.length);
        const callExpressionFunctionCustomNode: ICustomNode<TInitialData<CallExpressionFunctionNode>> =
            this.controlFlowCustomNodeFactory(ControlFlowCustomNode.CallExpressionFunctionNode);
        const expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[] = callExpressionNode.arguments;

        callExpressionFunctionCustomNode.initialize(expressionArguments);

        const storageKey: string = this.insertCustomNodeToControlFlowStorage(
            callExpressionFunctionCustomNode,
            controlFlowStorage,
            replacerId,
            CallExpressionControlFlowReplacer.usingExistingIdentifierChance
        );

        return this.getControlFlowStorageCallNode(
            controlFlowStorage.getStorageId(),
            storageKey,
            callee,
            expressionArguments
        );
    }

    /**
     * @param {string} controlFlowStorageId
     * @param {string} storageKey
     * @param {Expression} callee
     * @param {(Expression | SpreadElement)[]} expressionArguments
     * @returns {NodeGuards}
     */
    protected getControlFlowStorageCallNode (
        controlFlowStorageId: string,
        storageKey: string,
        callee: ESTree.Expression,
        expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[]
    ): ESTree.Node {
        const controlFlowStorageCallCustomNode: ICustomNode<TInitialData<CallExpressionControlFlowStorageCallNode>> =
            this.controlFlowCustomNodeFactory(ControlFlowCustomNode.CallExpressionControlFlowStorageCallNode);

        controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, callee, expressionArguments);

        const statementNode: TStatement = controlFlowStorageCallCustomNode.getNode()[0];

        if (!statementNode || !NodeGuards.isExpressionStatementNode(statementNode)) {
            throw new Error('`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node');
        }

        return statementNode.expression;
    }
}
