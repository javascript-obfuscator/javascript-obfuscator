import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { CustomNodes } from '../../../enums/container/CustomNodes';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { Node } from '../../../node/Node';

@injectable()
export class CallExpressionControlFlowReplacer extends AbstractControlFlowReplacer {
    /**
     * @type {number}
     */
    private static readonly usingExistingIdentifierChance: number = 0.5;

    /**
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(customNodeFactory, options);
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
        const callExpressionFunctionCustomNode: ICustomNode = this.customNodeFactory(CustomNodes.CallExpressionFunctionNode);
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
        const controlFlowStorageCallCustomNode: ICustomNode = this.customNodeFactory(
            CustomNodes.CallExpressionControlFlowStorageCallNode
        );

        controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, callee, expressionArguments);

        const statementNode: TStatement = controlFlowStorageCallCustomNode.getNode()[0];

        if (!statementNode || !Node.isExpressionStatementNode(statementNode)) {
            throw new Error(`\`controlFlowStorageCallCustomNode.getNode()[0]\` should returns array with \`ExpressionStatement\` node`);
        }

        return statementNode.expression;
    }
}
