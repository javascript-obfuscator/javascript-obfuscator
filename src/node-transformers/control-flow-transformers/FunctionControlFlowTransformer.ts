import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowReplacerFactory } from '../../types/container/node-transformers/TControlFlowReplacerFactory';
import { TControlFlowStorageFactory } from '../../types/container/node-transformers/TControlFlowStorageFactory';
import {
    TControlFlowStorageFactoryCreator
} from '../../types/container/node-transformers/TControlFlowStorageFactoryCreator';
import { TInitialData } from '../../types/TInitialData';
import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';

import { IControlFlowStorage } from '../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { ControlFlowCustomNode } from '../../enums/custom-nodes/ControlFlowCustomNode';
import {
    ControlFlowReplacer
} from '../../enums/node-transformers/control-flow-transformers/control-flow-replacers/ControlFlowReplacer';
import { ControlFlowStorage } from '../../enums/storages/ControlFlowStorage';
import { NodeType } from '../../enums/node/NodeType';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import {
    ControlFlowStorageNode
} from '../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode';
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
     * @type {WeakMap<TNodeWithStatements, IControlFlowStorage>}
     */
    protected readonly controlFlowData: WeakMap <TNodeWithStatements, IControlFlowStorage> = new WeakMap();

    /**
     * @type {WeakMap<TNodeWithStatements, VariableDeclaration>}
     */
    protected readonly hostNodesWithControlFlowNode: WeakMap<TNodeWithStatements, ESTree.VariableDeclaration> = new WeakMap();

    /**
     * @type {TControlFlowReplacerFactory}
     */
    protected readonly controlFlowReplacerFactory: TControlFlowReplacerFactory;

    /**
     * @type {TControlFlowStorageFactory}
     */
    protected controlFlowStorageFactory: TControlFlowStorageFactory;

    /**
     * @type {TControlFlowCustomNodeFactory}
     */
    protected readonly controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory;

    /**
     * @type {WeakSet<ESTree.Function>}
     */
    protected readonly visitedFunctionNodes: WeakSet<ESTree.Function> = new WeakSet();

    /**
     * @param {TControlFlowStorageFactoryCreator} controlFlowStorageFactoryCreator
     * @param {TControlFlowReplacerFactory} controlFlowReplacerFactory
     * @param {TControlFlowCustomNodeFactory} controlFlowCustomNodeFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__TControlFlowStorage)
            controlFlowStorageFactoryCreator: TControlFlowStorageFactoryCreator,
        @inject(ServiceIdentifiers.Factory__IControlFlowReplacer)
            controlFlowReplacerFactory: TControlFlowReplacerFactory,
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
            controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);

        this.controlFlowStorageFactory = controlFlowStorageFactoryCreator(ControlFlowStorage.FunctionControlFlowStorage);
        this.controlFlowReplacerFactory = controlFlowReplacerFactory;
        this.controlFlowCustomNodeFactory = controlFlowCustomNodeFactory;
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        if (!this.options.controlFlowFlattening) {
            return null;
        }

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
        const controlFlowStorage: IControlFlowStorage = this.getControlFlowStorage(hostNode);

        this.transformFunctionBody(functionNode, controlFlowStorage);

        if (!controlFlowStorage.getLength()) {
            return functionNode;
        }

        const controlFlowStorageNode: ESTree.VariableDeclaration = this.getControlFlowStorageNode(controlFlowStorage);

        this.appendControlFlowStorageNode(hostNode, controlFlowStorageNode);

        return functionNode;
    }

    /**
     * @param {BlockStatement} functionNode
     * @param {IControlFlowStorage} controlFlowStorage
     */
    protected transformFunctionBody (functionNode: ESTree.Function, controlFlowStorage: IControlFlowStorage): void {
        estraverse.replace(functionNode.body, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node | null): estraverse.VisitorOption | ESTree.Node =>
                this.transformFunctionBodyNode(node, parentNode, functionNode, controlFlowStorage)
        });
    }

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     * @param {Function} functionNode
     * @param {IControlFlowStorage} controlFlowStorage
     * @returns {ESTraverse.VisitorOption | Node}
     */
    protected transformFunctionBodyNode (
        node: ESTree.Node,
        parentNode: ESTree.Node | null,
        functionNode: ESTree.Function,
        controlFlowStorage: IControlFlowStorage
    ): estraverse.VisitorOption | ESTree.Node {
        const shouldSkipTraverse = !parentNode
            || NodeMetadata.isIgnoredNode(node)
            || this.isVisitedFunctionNode(node);

        if (shouldSkipTraverse) {
            return estraverse.VisitorOption.Skip;
        }

        const controlFlowReplacerName: ControlFlowReplacer | null = this.controlFlowReplacersMap.get(node.type)
            ?? null;

        if (!controlFlowReplacerName) {
            return node;
        }

        if (!this.isAllowedTransformationByThreshold()) {
            return node;
        }

        const replacedNode: ESTree.Node = this.controlFlowReplacerFactory(controlFlowReplacerName)
            .replace(
                node,
                parentNode,
                controlFlowStorage
            );

        NodeUtils.parentizeNode(replacedNode, parentNode);

        return replacedNode;
    }

    /**
     * @param {BlockStatement} functionNodeBody
     * @returns {TNodeWithStatements}
     */
    protected getHostNode (functionNodeBody: ESTree.BlockStatement): TNodeWithStatements {
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
     * @param {TNodeWithStatements} hostNode
     * @returns {TControlFlowStorage}
     */
    protected getControlFlowStorage (hostNode: TNodeWithStatements): IControlFlowStorage {
        let controlFlowStorage: IControlFlowStorage;

        const hostControlFlowStorage: IControlFlowStorage | null = this.controlFlowData.get(hostNode) ?? null;

        if (!hostControlFlowStorage) {
            controlFlowStorage = this.controlFlowStorageFactory();
        } else {
            const existingControlFlowStorageNode: ESTree.VariableDeclaration | null =
                this.hostNodesWithControlFlowNode.get(hostNode) ?? null;

            if (existingControlFlowStorageNode) {
                NodeAppender.remove(hostNode, existingControlFlowStorageNode);
            }

            controlFlowStorage = hostControlFlowStorage;
        }

        this.controlFlowData.set(hostNode, controlFlowStorage);

        return controlFlowStorage;
    }

    /**
     * @param {IControlFlowStorage} controlFlowStorage
     * @returns {VariableDeclaration}
     */
    protected getControlFlowStorageNode (controlFlowStorage: IControlFlowStorage): ESTree.VariableDeclaration {
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
     * @param {VariableDeclaration} controlFlowStorageNode
     */
    protected appendControlFlowStorageNode (
        hostNode: TNodeWithStatements,
        controlFlowStorageNode: ESTree.VariableDeclaration
    ): void {
        NodeUtils.parentizeAst(controlFlowStorageNode);
        NodeAppender.prepend(hostNode, [controlFlowStorageNode]);

        this.hostNodesWithControlFlowNode.set(hostNode, controlFlowStorageNode);
    }

    /**
     * @param {NodeGuards} node
     * @returns {boolean}
     */
    protected isVisitedFunctionNode (node: ESTree.Node): boolean {
        return NodeGuards.isFunctionNode(node) && this.visitedFunctionNodes.has(node);
    }

    /**
     * @returns {boolean}
     */
    protected isAllowedTransformationByThreshold (): boolean {
        return this.randomGenerator.getMathRandom() <= this.options.controlFlowFlatteningThreshold;
    }
}
