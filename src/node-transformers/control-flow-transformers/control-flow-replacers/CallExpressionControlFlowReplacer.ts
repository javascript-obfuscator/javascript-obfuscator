import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { ControlFlowCustomNode } from '../../../enums/container/custom-nodes/ControlFlowCustomNode';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { Node } from '../../../node/Node';

@injectable()
export class CallExpressionControlFlowReplacer extends AbstractControlFlowReplacer {
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
     * @param callExpressionNode
     * @param parentNode
     * @param controlFlowStorage
     * @returns {ESTree.Node}
     */
    public replace (
        callExpressionNode: ESTree.CallExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage <ICustomNode>
    ): ESTree.Node {
        const callee: ESTree.Expression = <ESTree.Expression>callExpressionNode.callee;

        if (!Node.isIdentifierNode(callee)) {
            return callExpressionNode;
        }

        const replacerId: string = String(callExpressionNode.arguments.length);
        const callExpressionFunctionCustomNode: ICustomNode = this.controlFlowCustomNodeFactory(
            ControlFlowCustomNode.CallExpressionFunctionNode
        );
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
     * @param controlFlowStorageId
     * @param storageKey
     * @param callee
     * @param expressionArguments
     * @param arguments
     * @returns {ESTree.Node}
     */
    protected getControlFlowStorageCallNode (
        controlFlowStorageId: string,
        storageKey: string,
        callee: ESTree.Expression,
        expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[]
    ): ESTree.Node {
        const controlFlowStorageCallCustomNode: ICustomNode = this.controlFlowCustomNodeFactory(
            ControlFlowCustomNode.CallExpressionControlFlowStorageCallNode
        );

        controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, callee, expressionArguments);

        const statementNode: TStatement = controlFlowStorageCallCustomNode.getNode()[0];

        if (!statementNode || !Node.isExpressionStatementNode(statementNode)) {
            throw new Error(`\`controlFlowStorageCallCustomNode.getNode()[0]\` should returns array with \`ExpressionStatement\` node`);
        }

        return statementNode.expression;
    }
}
