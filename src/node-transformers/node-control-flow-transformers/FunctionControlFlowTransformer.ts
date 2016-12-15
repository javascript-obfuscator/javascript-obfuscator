import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';
import * as _ from 'lodash';

import { TControlFlowReplacerFactory } from '../../types/container/TControlFlowReplacerFactory';
import { TControlFlowStorageFactory } from '../../types/container/TControlFlowStorageFactory';
import { TCustomNodeFactory } from '../../types/container/TCustomNodeFactory';
import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';
import { TStatement } from '../../types/node/TStatement';

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
    private static readonly controlFlowReplacersMap: Map <string, NodeControlFlowReplacers> = new Map <string, NodeControlFlowReplacers> ([
        [NodeType.BinaryExpression, NodeControlFlowReplacers.BinaryExpressionControlFlowReplacer]
    ]);

    /**
     * @type {number}
     */
    private static readonly controlFlowReplacersThreshold: number = 0.75;

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
    private controlFlowData: Map <ESTree.Node, IStorage<ICustomNode>> = new Map <ESTree.Node, IStorage<ICustomNode>> ();

    /**
     * @type {TStatement[][]}
     */
    private readonly controlFlowNodesList: TStatement[][] = [];

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
        @inject(ServiceIdentifiers['Factory<IStorage<ICustomNode>>']) controlFlowStorageFactory: TControlFlowStorageFactory,
        @inject(ServiceIdentifiers['Factory<IControlFlowReplacer>']) controlFlowReplacerFactory: TControlFlowReplacerFactory,
        @inject(ServiceIdentifiers['Factory<ICustomNode>']) customNodeFactory: TCustomNodeFactory,
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
        const currentBlockScopeDepth: number = NodeUtils.getNodeBlockScopeDepth(functionNode);

        if (currentBlockScopeDepth <= 1) {
            return functionNode.body;
        }

        const minDepth: number = _.clamp(FunctionControlFlowTransformer.hostNodeSearchMinDepth, 0, currentBlockScopeDepth);
        const maxDepth: number = Math.min(currentBlockScopeDepth, FunctionControlFlowTransformer.hostNodeSearchMaxDepth);
        const depth: number = _.clamp(RandomGeneratorUtils.getRandomInteger(minDepth, maxDepth) - 1, 0, Infinity);

        return NodeUtils.getBlockScopeOfNode(functionNode, depth);
    }

    /**
     * @param hostNodeBody
     * @param controlFlowNodesList
     */
    private static removeOldControlFlowNodeFromHostNodeBody (
        hostNodeBody: TStatement[],
        controlFlowNodesList: TStatement[][]
    ): TStatement[] {
        for (let controlFlowNode of controlFlowNodesList) {
            const firstIndexOfNode: number = hostNodeBody.indexOf(controlFlowNode[0]);

            if (firstIndexOfNode === -1) {
                continue;
            }

            return _.difference(hostNodeBody, controlFlowNode);
        }

        return hostNodeBody;
    }

    /**
     * @param functionNode
     */
    public transformNode (functionNode: ESTree.Function): void {
        this.changeFunctionBodyControlFlow(functionNode);
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

        if (!this.controlFlowData.has(hostNode)) {
            this.controlFlowData.set(hostNode, controlFlowStorage);
        } else {
            hostNode.body = <ESTree.Statement[]>FunctionControlFlowTransformer
                .removeOldControlFlowNodeFromHostNodeBody(hostNode.body, this.controlFlowNodesList);

            const hostControlFlowStorage: IStorage<ICustomNode> = <IStorage<ICustomNode>>this.controlFlowData.get(hostNode);

            controlFlowStorage.mergeWith(hostControlFlowStorage, true);

            this.controlFlowData.set(hostNode, controlFlowStorage);
        }

        estraverse.replace(functionNode.body, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                if (RandomGeneratorUtils.getRandomFloat(0, 1) > FunctionControlFlowTransformer.controlFlowReplacersThreshold) {
                    return;
                }

                const controlFlowReplacerName: NodeControlFlowReplacers | undefined = FunctionControlFlowTransformer
                    .controlFlowReplacersMap.get(node.type);

                if (controlFlowReplacerName === undefined) {
                    return;
                }

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

        const controlFlowStorageNode: TStatement[] = controlFlowStorageCustomNode.getNode();

        this.controlFlowNodesList.push(controlFlowStorageNode);
        NodeAppender.prependNode(hostNode, controlFlowStorageNode);
    }
}
