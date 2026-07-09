import { inject, injectable, injectFromBase } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TInitialData } from '../../../types/TInitialData';
import { TStatement } from '../../../types/node/TStatement';

import { IControlFlowStorage } from '../../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';

import { ControlFlowCustomNode } from '../../../enums/custom-nodes/ControlFlowCustomNode';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { CallExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode';
import { CallExpressionControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode';
import { NodeGuards } from '../../../node/NodeGuards';

@injectFromBase()
@injectable()
export class CallExpressionControlFlowReplacer extends AbstractControlFlowReplacer {
    /**
     * @type {number}
     */
    private static readonly usingExistingIdentifierChance: number = 0.5;

    /**
     * @param {TControlFlowCustomNodeFactory} controlFlowCustomNodeFactory
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor(
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
        controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
        identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(controlFlowCustomNodeFactory, identifierNamesGeneratorFactory, randomGenerator, options);
    }

    /**
     * @param {CallExpression} callExpressionNode
     * @param {Node} parentNode
     * @param {IControlFlowStorage} controlFlowStorage
     * @returns {Node}
     */
    public replace(
        callExpressionNode: ESTree.CallExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: IControlFlowStorage
    ): ESTree.Node {
        const callee: ESTree.Expression = <ESTree.Expression>callExpressionNode.callee;

        if (!NodeGuards.isIdentifierNode(callee)) {
            return callExpressionNode;
        }

        const isChainExpressionParent = NodeGuards.isChainExpressionNode(parentNode);

        const expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[] = callExpressionNode.arguments;

        // Bucket reuse-eligible wrappers by the exact argument *shape* (which positions are
        // spread vs. plain) AND optional-ness — not just `arguments.length`.
        //
        // A spread call like `foo(...args)` has the same `arguments.length` as a plain
        // `bar(arg)`, but the generated wrapper differs: `(callee, ...p1) => callee(...p1)`
        // vs `(callee, p1) => callee(p1)`. Reusing a plain wrapper for a spread call collapses
        // the spread to its first element and silently drops the remaining arguments (issue #1423).
        //
        // Encoding the per-argument shape also preserves the optional-ness bucketing that keeps
        // an optional `foo?.(arg)` call from reusing a non-optional `bar(arg)` wrapper, which
        // would drop the `?.` short-circuit and crash on undefined callees (issue #1408).
        const argumentsShape: string = expressionArguments
            .map((argument: ESTree.Expression | ESTree.SpreadElement): string =>
                NodeGuards.isSpreadElementNode(argument) ? 's' : 'p'
            )
            .join('');
        const replacerId: string = `${argumentsShape}-${isChainExpressionParent ? 'optional' : 'standard'}`;
        const callExpressionFunctionCustomNode: ICustomNode<TInitialData<CallExpressionFunctionNode>> =
            this.controlFlowCustomNodeFactory(ControlFlowCustomNode.CallExpressionFunctionNode);

        callExpressionFunctionCustomNode.initialize(expressionArguments, isChainExpressionParent);

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
    protected getControlFlowStorageCallNode(
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
            throw new Error(
                '`controlFlowStorageCallCustomNode.getNode()[0]` should returns array with `ExpressionStatement` node'
            );
        }

        return statementNode.expression;
    }
}
