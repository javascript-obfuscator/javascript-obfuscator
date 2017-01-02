import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TControlFlowReplacerFactory } from '../../types/container/TControlFlowReplacerFactory';
import { TControlFlowStorageFactory } from '../../types/container/TControlFlowStorageFactory';
import { TCustomNodeFactory } from '../../types/container/TCustomNodeFactory';
import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

import { CustomNodes } from '../../enums/container/CustomNodes';
import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { Node } from '../../node/Node';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeControlFlowReplacers } from '../../enums/container/NodeControlFlowReplacers';
import { NodeUtils } from '../../node/NodeUtils';
import { RandomGeneratorUtils } from '../../utils/RandomGeneratorUtils';

@injectable()
export class FunctionControlFlowTransformer extends AbstractNodeTransformer {
    /**
     * @type {Map <string, NodeControlFlowReplacers>}
     */
    private static readonly controlFlowReplacersMap: Map <string, NodeControlFlowReplacers> = new Map([
        [NodeType.BinaryExpression, NodeControlFlowReplacers.BinaryExpressionControlFlowReplacer],
        [NodeType.CallExpression, NodeControlFlowReplacers.CallExpressionControlFlowReplacer],
        [NodeType.LogicalExpression, NodeControlFlowReplacers.LogicalExpressionControlFlowReplacer]
    ]);

    /**
     * @type {number}
     */
    private static readonly hostNodeSearchMinDepth: number = 2;

    /**
     * @type {number}
     */
    private static readonly hostNodeSearchMaxDepth: number = 10;

    /**
     * @type {Map<ESTree.Node, IStorage<ICustomNode>>}
     */
    private controlFlowData: Map <ESTree.Node, IStorage<ICustomNode>> = new Map();

    /**
     * @type {TNodeWithBlockStatement[]}
     */
    private readonly hostNodesWithControlFlowNode: TNodeWithBlockStatement[] = [];

    /**
     * @type {TControlFlowReplacerFactory}
     */
    private readonly controlFlowReplacerFactory: TControlFlowReplacerFactory;

    /**
     * @type {TControlFlowStorageFactory}
     */
    private readonly controlFlowStorageFactory: TControlFlowStorageFactory;

    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @param controlFlowStorageFactory
     * @param controlFlowReplacerFactory
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__TControlFlowStorage) controlFlowStorageFactory: TControlFlowStorageFactory,
        @inject(ServiceIdentifiers.Factory__IControlFlowReplacer) controlFlowReplacerFactory: TControlFlowReplacerFactory,
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.controlFlowStorageFactory = controlFlowStorageFactory;
        this.controlFlowReplacerFactory = controlFlowReplacerFactory;
        this.customNodeFactory = customNodeFactory;
    }

    /**
     * @param functionNode
     * @returns {TNodeWithBlockStatement}
     */
    private static getHostNode (functionNode: ESTree.FunctionDeclaration | ESTree.FunctionExpression): TNodeWithBlockStatement {
        const blockScopesOfNode: TNodeWithBlockStatement[] = NodeUtils.getBlockScopesOfNode(functionNode);

        if (blockScopesOfNode.length === 1) {
            return functionNode.body;
        } else {
            blockScopesOfNode.pop();
        }

        if (blockScopesOfNode.length > FunctionControlFlowTransformer.hostNodeSearchMinDepth) {
            blockScopesOfNode.splice(0, FunctionControlFlowTransformer.hostNodeSearchMinDepth);
        }

        if (blockScopesOfNode.length > FunctionControlFlowTransformer.hostNodeSearchMaxDepth) {
            blockScopesOfNode.length = FunctionControlFlowTransformer.hostNodeSearchMaxDepth;
        }

        return RandomGeneratorUtils.getRandomGenerator().pickone(blockScopesOfNode);
    }

    /**
     * @param functionNode
     * @returns {ESTree.Node}
     */
    public transformNode (functionNode: ESTree.Function): ESTree.Node {
        this.changeFunctionBodyControlFlow(functionNode);

        return functionNode;
    }

    /**
     * @param functionNode
     */
    private changeFunctionBodyControlFlow (functionNode: ESTree.Function): void {
        if (Node.isArrowFunctionExpressionNode(functionNode)) {
            return;
        }

        const controlFlowStorage: IStorage <ICustomNode> = this.controlFlowStorageFactory();
        const hostNode: TNodeWithBlockStatement = FunctionControlFlowTransformer.getHostNode(functionNode);

        if (this.controlFlowData.has(hostNode)) {
            if (this.hostNodesWithControlFlowNode.indexOf(hostNode) !== -1) {
                hostNode.body.shift();
            }

            const hostControlFlowStorage: IStorage<ICustomNode> = <IStorage<ICustomNode>>this.controlFlowData.get(hostNode);

            controlFlowStorage.mergeWith(hostControlFlowStorage, true);
        }

        this.controlFlowData.set(hostNode, controlFlowStorage);

        estraverse.replace(functionNode.body, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (!FunctionControlFlowTransformer.controlFlowReplacersMap.has(node.type)) {
                    return;
                }

                if (RandomGeneratorUtils.getRandomFloat(0, 1) > this.options.controlFlowFlatteningThreshold) {
                    return;
                }

                const controlFlowReplacerName: NodeControlFlowReplacers = <NodeControlFlowReplacers>FunctionControlFlowTransformer
                    .controlFlowReplacersMap.get(node.type);

                return {
                    ...this.controlFlowReplacerFactory(controlFlowReplacerName)
                        .replace(node, parentNode, controlFlowStorage),
                    parentNode
                };
            }
        });

        if (!controlFlowStorage.getLength()) {
            return;
        }

        const controlFlowStorageCustomNode: ICustomNode = this.customNodeFactory(CustomNodes.ControlFlowStorageNode);

        controlFlowStorageCustomNode.initialize(controlFlowStorage);
        NodeAppender.prependNode(hostNode, controlFlowStorageCustomNode.getNode());
        this.hostNodesWithControlFlowNode.push(hostNode);
    }
}
