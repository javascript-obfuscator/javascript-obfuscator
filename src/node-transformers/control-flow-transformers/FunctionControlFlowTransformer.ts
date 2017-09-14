import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowReplacerFactory } from '../../types/container/node-transformers/TControlFlowReplacerFactory';
import { TControlFlowStorageFactory } from '../../types/container/node-transformers/TControlFlowStorageFactory';
import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStorage } from '../../interfaces/storages/IStorage';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { ControlFlowCustomNode } from '../../enums/custom-nodes/ControlFlowCustomNode';
import { ControlFlowReplacer } from '../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer';
import { NodeType } from '../../enums/node/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { NodeGuards } from '../../node/NodeGuards';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class FunctionControlFlowTransformer extends AbstractNodeTransformer {
    /**
     * @type {Map <string, ControlFlowReplacer>}
     */
    private static readonly controlFlowReplacersMap: Map <string, ControlFlowReplacer> = new Map([
        [NodeType.BinaryExpression, ControlFlowReplacer.BinaryExpressionControlFlowReplacer],
        [NodeType.CallExpression, ControlFlowReplacer.CallExpressionControlFlowReplacer],
        [NodeType.LogicalExpression, ControlFlowReplacer.LogicalExpressionControlFlowReplacer],
        [NodeType.Literal, ControlFlowReplacer.StringLiteralControlFlowReplacer]
    ]);

    /**
     * @type {number}
     */
    private static readonly hostNodeSearchMinDepth: number = 0;

    /**
     * @type {number}
     */
    private static readonly hostNodeSearchMaxDepth: number = 2;

    /**
     * @type {Map<ESTree.Node, IStorage<ICustomNode>>}
     */
    private readonly controlFlowData: Map <ESTree.Node, IStorage<ICustomNode>> = new Map();

    /**
     * @type {Set<ESTree.Function>}
     */
    private readonly visitedFunctionNodes: Set<ESTree.Function> = new Set();

    /**
     * @type {Set<TNodeWithBlockStatement>}
     */
    private readonly hostNodesWithControlFlowNode: Set<TNodeWithBlockStatement> = new Set();

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
    constructor (
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
     * @return {IVisitor}
     */
    public getVisitor (): IVisitor {
        return {
            leave: (node: ESTree.Node, parentNode: ESTree.Node) => {
                if (
                    NodeGuards.isFunctionDeclarationNode(node) ||
                    NodeGuards.isFunctionExpressionNode(node) ||
                    NodeGuards.isArrowFunctionExpressionNode(node)
                ) {
                    return this.transformNode(node, parentNode);
                }
            }
        };
    }

    /**
     * @param {Function} functionNode
     * @param {NodeGuards} parentNode
     * @returns {Function}
     */
    public transformNode (functionNode: ESTree.Function, parentNode: ESTree.Node): ESTree.Function {
        this.visitedFunctionNodes.add(functionNode);

        if (!NodeGuards.isBlockStatementNode(functionNode.body)) {
            return functionNode;
        }

        const hostNode: TNodeWithBlockStatement = this.getHostNode(functionNode.body);
        const controlFlowStorage: IStorage<ICustomNode> = this.getControlFlowStorage(hostNode);

        this.controlFlowData.set(hostNode, controlFlowStorage);
        this.transformFunctionBody(functionNode.body, controlFlowStorage);

        if (!controlFlowStorage.getLength()) {
            return functionNode;
        }

        const controlFlowStorageCustomNode: ICustomNode = this.controlFlowCustomNodeFactory(
            ControlFlowCustomNode.ControlFlowStorageNode
        );

        controlFlowStorageCustomNode.initialize(controlFlowStorage);
        NodeAppender.prependNode(hostNode, controlFlowStorageCustomNode.getNode());
        this.hostNodesWithControlFlowNode.add(hostNode);

        return functionNode;
    }

    /**
     * @param {TNodeWithBlockStatement} hostNode
     * @returns {IStorage<ICustomNode>}
     */
    private getControlFlowStorage (hostNode: TNodeWithBlockStatement): IStorage<ICustomNode> {
        const controlFlowStorage: IStorage <ICustomNode> = this.controlFlowStorageFactory();

        if (this.controlFlowData.has(hostNode)) {
            if (this.hostNodesWithControlFlowNode.has(hostNode)) {
                hostNode.body.shift();
            }

            const hostControlFlowStorage: IStorage<ICustomNode> = <IStorage<ICustomNode>>this.controlFlowData.get(hostNode);

            controlFlowStorage.mergeWith(hostControlFlowStorage, true);
        }

        return controlFlowStorage;
    }

    /**
     * @param {BlockStatement} functionNodeBody
     * @returns {TNodeWithBlockStatement}
     */
    private getHostNode (functionNodeBody: ESTree.BlockStatement): TNodeWithBlockStatement {
        const blockScopesOfNode: TNodeWithBlockStatement[] = NodeUtils.getBlockScopesOfNode(functionNodeBody);

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
        return (
            NodeGuards.isFunctionDeclarationNode(node) ||
            NodeGuards.isFunctionExpressionNode(node) ||
            NodeGuards.isArrowFunctionExpressionNode(node)
        ) && this.visitedFunctionNodes.has(node);
    }

    /**
     * @param {BlockStatement} functionNodeBody
     * @param {IStorage<ICustomNode>} controlFlowStorage
     */
    private transformFunctionBody (functionNodeBody: ESTree.BlockStatement, controlFlowStorage: IStorage<ICustomNode>): void {
        estraverse.replace(functionNodeBody, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (this.isVisitedFunctionNode(node)) {
                    return estraverse.VisitorOption.Skip;
                }

                if (!FunctionControlFlowTransformer.controlFlowReplacersMap.has(node.type)) {
                    return node;
                }

                if (this.randomGenerator.getMathRandom() > this.options.controlFlowFlatteningThreshold) {
                    return node;
                }

                const controlFlowReplacerName: ControlFlowReplacer = <ControlFlowReplacer>FunctionControlFlowTransformer
                    .controlFlowReplacersMap.get(node.type);

                if (controlFlowReplacerName === undefined) {
                    return node;
                }

                return {
                    ...this.controlFlowReplacerFactory(controlFlowReplacerName).replace(node, parentNode, controlFlowStorage),
                    parentNode
                };
            }
        });
    }
}
