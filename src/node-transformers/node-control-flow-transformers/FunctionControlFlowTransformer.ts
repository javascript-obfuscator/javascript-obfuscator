import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TControlFlowReplacerFactory } from '../../types/container/TControlFlowReplacerFactory';
import { TControlFlowStorageFactory } from '../../types/container/TControlFlowStorageFactory';
import { TCustomNodeFactory } from '../../types/container/TCustomNodeFactory';

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
     * @type {Map<string, IStorage<ICustomNode>>}
     */
    private cachedControlFlowStorages: Map <string, IStorage<ICustomNode>> = new Map <string, IStorage<ICustomNode>> ();

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
        const controlFlowStorageCustomNodeName: string = RandomGeneratorUtils.getRandomVariableName(6);

        estraverse.replace(functionNode.body, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                const controlFlowReplacerName: NodeControlFlowReplacers | undefined = FunctionControlFlowTransformer
                    .controlFlowReplacersMap.get(node.type);

                if (controlFlowReplacerName === undefined) {
                    return;
                }

                return {
                    ...this.controlFlowReplacerFactory(controlFlowReplacerName)
                        .replace(node, parentNode, controlFlowStorage, controlFlowStorageCustomNodeName),
                    parentNode
                };
            }
        });

        if (!controlFlowStorage.getLength()) {
            return;
        }

        const hostNode: ESTree.Node = NodeUtils.getBlockScopeOfNode(
            functionNode.body,
            111
        );
        const controlFlowNodeId: string = RandomGeneratorUtils.getRandomString(8);

        if (!hostNode.controlFlowId) {
            hostNode.controlFlowId = controlFlowNodeId;
            this.cachedControlFlowStorages.set(controlFlowNodeId, controlFlowStorage);
        } else {
            hostNode.body.shift();

            if (!this.cachedControlFlowStorages.has(hostNode.controlFlowId)) {
               throw new Error(`No \`controlFlowStorage\` was found in cached \`controlFlowStorage\`'s with id ${hostNode.controlFlowId}`);
            }

            const hostControlFlowStorage: IStorage<ICustomNode> = <IStorage<ICustomNode>>this.cachedControlFlowStorages
                .get(hostNode.controlFlowId);

            hostControlFlowStorage.getStorage().forEach((customNode: ICustomNode, key: string) => {
                controlFlowStorage.set(key, customNode);
            });

            this.cachedControlFlowStorages.set(hostNode.controlFlowId, controlFlowStorage);
        }

        const controlFlowStorageCustomNode: ICustomNode = this.customNodeFactory(CustomNodes.ControlFlowStorageNode);

        controlFlowStorageCustomNode.initialize(controlFlowStorage, controlFlowStorageCustomNodeName);

        NodeAppender.prependNode(
            hostNode,
            controlFlowStorageCustomNode.getNode()
        );
    }
}
