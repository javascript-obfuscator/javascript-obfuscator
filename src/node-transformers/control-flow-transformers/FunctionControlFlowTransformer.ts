import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowReplacerFactory } from '../../types/container/node-transformers/TControlFlowReplacerFactory';
import { TControlFlowStorage } from '../../types/storages/TControlFlowStorage';
import { TControlFlowStorageFactory } from '../../types/container/node-transformers/TControlFlowStorageFactory';
import { TInitialData } from '../../types/TInitialData';
import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { ControlFlowCustomNode } from '../../enums/custom-nodes/ControlFlowCustomNode';
import { ControlFlowReplacer } from '../../enums/node-transformers/control-flow-transformers/control-flow-replacers/ControlFlowReplacer';
import { NodeType } from '../../enums/node/NodeType';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { ControlFlowStorageNode } from '../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeMetadata } from '../../node/NodeMetadata';
import { NodeStatementUtils } from '../../node/NodeStatementUtils';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class FunctionControlFlowTransformer extends AbstractNodeTransformer {
    /**
     * @type {number}
     */
    private static readonly hostNodeSearchMinDepth: number = 0;

    /**
     * @type {number}
     */
    private static readonly hostNodeSearchMaxDepth: number = 2;

    /**
     * @type {Map <string, ControlFlowReplacer>}
     */
    protected readonly controlFlowReplacersMap: Map <string, ControlFlowReplacer> = new Map([
        [NodeType.BinaryExpression, ControlFlowReplacer.BinaryExpressionControlFlowReplacer],
        [NodeType.CallExpression, ControlFlowReplacer.CallExpressionControlFlowReplacer],
        [NodeType.LogicalExpression, ControlFlowReplacer.LogicalExpressionControlFlowReplacer],
        [NodeType.Literal, ControlFlowReplacer.StringLiteralControlFlowReplacer]
    ]);

    /**
     * @type {Map<ESTree.Node, TControlFlowStorage>}
     */
    private readonly controlFlowData: Map <ESTree.Node, TControlFlowStorage> = new Map();

    /**
     * @type {Set<ESTree.Function>}
     */
    private readonly visitedFunctionNodes: Set<ESTree.Function> = new Set();

    /**
     * @type {WeakMap<TNodeWithStatements, VariableDeclaration>}
     */
    private readonly hostNodesWithControlFlowNode: WeakMap<TNodeWithStatements, ESTree.VariableDeclaration> = new WeakMap();

    /**
     * @type {TControlFlowReplacerFactory}
     */
    private readonly controlFlowReplacerFactory: TControlFlowReplacerFactory;

    /**
     * @type {TControlFlowStorageFactory}
     */
    private readonly controlFlowStorageFactory: TControlFlowStorageFactory;

    /**
     * @type {TControlFlowCustomNodeFactory}
     */
    private readonly controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory;

    /**
     * @param {TControlFlowStorageFactory} controlFlowStorageFactory
     * @param {TControlFlowReplacerFactory} controlFlowReplacerFactory
     * @param {TControlFlowCustomNodeFactory} controlFlowCustomNodeFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__TControlFlowStorage)
            controlFlowStorageFactory: TControlFlowStorageFactory,
        @inject(ServiceIdentifiers.Factory__IControlFlowReplacer)
            controlFlowReplacerFactory: TControlFlowReplacerFactory,
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
            controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.controlFlowStorageFactory = controlFlowStorageFactory;
        this.controlFlowReplacerFactory = controlFlowReplacerFactory;
        this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        switch (nodeTransformationStage) {
            case NodeTransformationStage.ControlFlowFlattening:
                return {
                    leave: (
                        node: ESTree.Node,
                        parentNode: ESTree.Node | null
                    ): ESTree.Node | estraverse.VisitorOption | void => {
                        if (parentNode && NodeGuards.isFunctionNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Function} functionNode
     * @param {Node} parentNode
     * @returns {Function}
     */
    public transformNode (functionNode: ESTree.Function, parentNode: ESTree.Node): ESTree.Function {
        this.visitedFunctionNodes.add(functionNode);

        if (!NodeGuards.isBlockStatementNode(functionNode.body)) {
            return functionNode;
        }

        const hostNode: TNodeWithStatements = this.getHostNode(functionNode.body);
        const controlFlowStorage: TControlFlowStorage = this.getControlFlowStorage(hostNode);

        this.transformFunctionBody(functionNode.body, controlFlowStorage);

        if (!controlFlowStorage.getLength()) {
            return functionNode;
        }

        const controlFlowStorageCustomNode: ICustomNode<TInitialData<ControlFlowStorageNode>> =
            this.controlFlowCustomNodeFactory(ControlFlowCustomNode.ControlFlowStorageNode);

        controlFlowStorageCustomNode.initialize(controlFlowStorage);

        const controlFlowStorageNode: ESTree.VariableDeclaration = this.getControlFlowStorageNode(controlFlowStorage);

        NodeUtils.parentizeAst(controlFlowStorageNode);
        NodeAppender.prepend(hostNode, [controlFlowStorageNode]);

        this.hostNodesWithControlFlowNode.set(hostNode, controlFlowStorageNode);

        return functionNode;
    }

    /**
     * @param {TControlFlowStorage} controlFlowStorage
     * @returns {VariableDeclaration}
     */
    protected getControlFlowStorageNode (controlFlowStorage: TControlFlowStorage): ESTree.VariableDeclaration {
        const controlFlowStorageCustomNode: ICustomNode<TInitialData<ControlFlowStorageNode>> =
            this.controlFlowCustomNodeFactory(ControlFlowCustomNode.ControlFlowStorageNode);

        controlFlowStorageCustomNode.initialize(controlFlowStorage);

        const controlFlowStorageNode: ESTree.Node = controlFlowStorageCustomNode.getNode()[0];

        if (!NodeGuards.isVariableDeclarationNode(controlFlowStorageNode)) {
            throw new Error('`controlFlowStorageNode` should contain `VariableDeclaration` node with control flow storage object');
        }

        return controlFlowStorageNode;
    }

    /**
     * @param {TNodeWithStatements} hostNode
     * @returns {TControlFlowStorage}
     */
    private getControlFlowStorage (hostNode: TNodeWithStatements): TControlFlowStorage {
        const controlFlowStorage: TControlFlowStorage = this.controlFlowStorageFactory();

        const hostControlFlowStorage: TControlFlowStorage | null = this.controlFlowData.get(hostNode) ?? null;

        if (hostControlFlowStorage) {
            const existingControlFlowStorageNode: ESTree.VariableDeclaration | null =
                this.hostNodesWithControlFlowNode.get(hostNode) ?? null;

            if (existingControlFlowStorageNode) {
                NodeAppender.remove(hostNode, existingControlFlowStorageNode);
            }

            controlFlowStorage.mergeWith(hostControlFlowStorage, true);
        }

        this.controlFlowData.set(hostNode, controlFlowStorage);

        return controlFlowStorage;
    }

    /**
     * @param {BlockStatement} functionNodeBody
     * @returns {TNodeWithStatements}
     */
    private getHostNode (functionNodeBody: ESTree.BlockStatement): TNodeWithStatements {
        const blockScopesOfNode: TNodeWithStatements[] = NodeStatementUtils.getParentNodesWithStatements(functionNodeBody);

        if (blockScopesOfNode.length === 1) {
            return functionNodeBody;
        } else {
            blockScopesOfNode.pop();
        }

        if (blockScopesOfNode.length > FunctionControlFlowTransformer.hostNodeSearchMinDepth) {
            blockScopesOfNode.splice(0, FunctionControlFlowTransformer.hostNodeSearchMinDepth);
        }

        if (blockScopesOfNode.length > FunctionControlFlowTransformer.hostNodeSearchMaxDepth) {
            blockScopesOfNode.length = FunctionControlFlowTransformer.hostNodeSearchMaxDepth;
        }

        return this.randomGenerator.getRandomGenerator().pickone(blockScopesOfNode);
    }

    /**
     * @param {NodeGuards} node
     * @returns {boolean}
     */
    private isVisitedFunctionNode (node: ESTree.Node): boolean {
        return NodeGuards.isFunctionNode(node) && this.visitedFunctionNodes.has(node);
    }

    /**
     * @param {BlockStatement} functionNodeBody
     * @param {TControlFlowStorage} controlFlowStorage
     */
    private transformFunctionBody (functionNodeBody: ESTree.BlockStatement, controlFlowStorage: TControlFlowStorage): void {
        estraverse.replace(functionNodeBody, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): estraverse.VisitorOption | ESTree.Node => {
                const shouldBreakTraverse = !parentNode
                    || NodeMetadata.isIgnoredNode(node)
                    || this.isVisitedFunctionNode(node);

                if (shouldBreakTraverse) {
                    return estraverse.VisitorOption.Break;
                }

                const controlFlowReplacerName: ControlFlowReplacer | null = this.controlFlowReplacersMap.get(node.type)
                    ?? null;

                if (!controlFlowReplacerName) {
                    return node;
                }

                if (this.randomGenerator.getMathRandom() > this.options.controlFlowFlatteningThreshold) {
                    return node;
                }

                const replacedNode: ESTree.Node = this.controlFlowReplacerFactory(controlFlowReplacerName)
                    .replace(node, parentNode, controlFlowStorage);

                NodeUtils.parentizeNode(replacedNode, parentNode);

                return replacedNode;
            }
        });
    }
}
