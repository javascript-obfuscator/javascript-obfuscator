import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TControlFlowReplacerFactory } from '../../types/container/TControlFlowReplacerFactory';
import { TControlFlowStorageFactory } from '../../types/container/TControlFlowStorageFactory';
import { TCustomNodeFactory } from '../../types/container/TCustomNodeFactory';
import { TNodeWithBlockStatement } from '../../types/node/TNodeWithBlockStatement';
import { TStatement } from '../../types/node/TStatement';

import { IControlFlowData } from '../../interfaces/node-transformers/IControlFlowData';
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
     * @type {Map<ESTree.Node, IControlFlowData>}
     */
    private controlFlowData: Map <ESTree.Node, IControlFlowData> = new Map <ESTree.Node, IControlFlowData> ();

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
        const hostNode: TNodeWithBlockStatement = NodeUtils.getBlockScopeOfNode(
            functionNode.body,
            RandomGeneratorUtils.getRandomInteger(1, 5)
        );

        let controlFlowStorageNodeName: string = RandomGeneratorUtils.getRandomVariableName(6);

        if (!this.controlFlowData.has(hostNode)) {
            this.controlFlowData.set(hostNode, {
                controlFlowStorage,
                controlFlowStorageNodeName
            });
        } else {
            for (let controlFlowNode of this.controlFlowNodesList) {
                const firstIndexOfNode: number = (<TStatement[]>hostNode.body).indexOf(controlFlowNode[0]);

                if (firstIndexOfNode === -1) {
                    continue;
                }

                const statementLength: number = controlFlowNode.length;

                (<TStatement[]>hostNode.body).splice(firstIndexOfNode, statementLength);
                break;
            }

            const {
                controlFlowStorage: hostControlFlowStorage,
                controlFlowStorageNodeName: hostControlFlowStorageNodeName
            } = <IControlFlowData>this.controlFlowData.get(hostNode);

            hostControlFlowStorage
                .getStorage()
                .forEach((customNode: ICustomNode, key: string) => {
                    controlFlowStorage.set(key, customNode);
                });

            controlFlowStorageNodeName = hostControlFlowStorageNodeName;

            this.controlFlowData.set(hostNode, {
                controlFlowStorage,
                controlFlowStorageNodeName: hostControlFlowStorageNodeName
            });
        }

        estraverse.replace(functionNode.body, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                const controlFlowReplacerName: NodeControlFlowReplacers | undefined = FunctionControlFlowTransformer
                    .controlFlowReplacersMap.get(node.type);

                if (controlFlowReplacerName === undefined) {
                    return;
                }

                return {
                    ...this.controlFlowReplacerFactory(controlFlowReplacerName)
                        .replace(node, parentNode, controlFlowStorage, controlFlowStorageNodeName),
                    parentNode
                };
            }
        });

        if (!controlFlowStorage.getLength()) {
            return;
        }

        const controlFlowStorageCustomNode: ICustomNode = this.customNodeFactory(CustomNodes.ControlFlowStorageNode);

        controlFlowStorageCustomNode.initialize(controlFlowStorage, controlFlowStorageNodeName);

        const controlFlowStorageNode: TStatement[] = controlFlowStorageCustomNode.getNode();

        this.controlFlowNodesList.push(controlFlowStorageNode);
        NodeAppender.prependNode(hostNode, controlFlowStorageNode);
    }
}
