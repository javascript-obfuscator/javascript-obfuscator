import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TControlFlowReplacerFactory } from '../../types/container/TControlFlowReplacerFactory';
import { TControlFlowStorageFactory } from '../../types/container/TControlFlowStorageFactory';
import { TCustomNodeFactory } from '../../types/container/TCustomNodeFactory';
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

                const controlFlowStorageCallCustomNode: ICustomNode | undefined = this.controlFlowReplacerFactory(controlFlowReplacerName)
                    .replace(node, parentNode, controlFlowStorage, controlFlowStorageCustomNodeName);

                if (!controlFlowStorageCallCustomNode) {
                    return;
                }

                // controlFlowStorageCallCustomNode will always have only one TStatement node,
                // so we can get it by index `0`
                // also we need to return `expression` property of `ExpressionStatement` node because bug:
                // https://github.com/estools/escodegen/issues/289
                const statementNode: TStatement = controlFlowStorageCallCustomNode.getNode()[0];

                if (!statementNode || !Node.isExpressionStatementNode(statementNode)) {
                    throw new Error(`\`controlFlowStorageCallCustomNode.getNode()\` should returns array with \`ExpressionStatement\` node`);
                }

                return statementNode.expression;
            }
        });

        if (!controlFlowStorage.getLength()) {
            return;
        }

        const controlFlowStorageCustomNode: ICustomNode = this.customNodeFactory(CustomNodes.ControlFlowStorageNode);

        controlFlowStorageCustomNode.initialize(controlFlowStorage, controlFlowStorageCustomNodeName);

        NodeAppender.prependNode(functionNode.body, controlFlowStorageCustomNode.getNode());
    }
}
