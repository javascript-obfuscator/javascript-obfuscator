import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TControlFlowReplacer } from '../../types/TControlFlowReplacer';
import { TStatement } from '../../types/TStatement';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/IOptions';

import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { BinaryExpressionControlFlowReplacer } from './control-flow-replacers/BinaryExpressionControlFlowReplacer';
import { ControlFlowStorage } from '../../storages/ControlFlowStorage';
import { ControlFlowStorageNode } from '../../custom-nodes/control-flow-storage-nodes/ControlFlowStorageNode';
import { Node } from '../../node/Node';
import { NodeAppender } from '../../node/NodeAppender';
import { Utils } from '../../Utils';
import { NodeUtils } from '../../node/NodeUtils';
import { IStorage } from '../../interfaces/IStorage';

export class FunctionControlFlowTransformer extends AbstractNodeTransformer {
    /**
     * @type {Map <string, IReplacer>}
     */
    private static controlFlowReplacers: Map <string, TControlFlowReplacer> = new Map <string, TControlFlowReplacer> ([
        [NodeType.BinaryExpression, BinaryExpressionControlFlowReplacer]
    ]);

    /**
     * @param nodes
     * @param options
     */
    constructor(nodes: Map <string, ICustomNode>, options: IOptions) {
        super(nodes, options);
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

        const controlFlowStorage: IStorage <ICustomNode> = new ControlFlowStorage();
        const controlFlowStorageCustomNodeName: string = Utils.getRandomVariableName(6);

        console.log(NodeUtils.getNodeBlockScopeDepth(functionNode.body));

        estraverse.replace(functionNode.body, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                const controlFlowReplacer: TControlFlowReplacer | undefined = FunctionControlFlowTransformer
                    .controlFlowReplacers.get(node.type);

                if (!controlFlowReplacer) {
                    return;
                }

                const controlFlowStorageCallCustomNode: ICustomNode | undefined = new controlFlowReplacer(
                    this.nodes, this.options
                ).replace(node, parentNode, controlFlowStorage, controlFlowStorageCustomNodeName);

                if (!controlFlowStorageCallCustomNode) {
                    return;
                }

                // controlFlowStorageCallCustomNode will always have only one TStatement node,
                // so we can get it by index `0`
                // also we need to return `expression` property of `ExpressionStatement` node because bug:
                // https://github.com/estools/escodegen/issues/289
                const statementNode: TStatement | undefined = controlFlowStorageCallCustomNode.getNode()[0];

                if (!statementNode || !Node.isExpressionStatementNode(statementNode)) {
                    throw new Error(`\`controlFlowStorageCallCustomNode.getNode()\` should returns array with \`ExpressionStatement\` node`);
                }

                return statementNode.expression;
            }
        });

        const controlFlowStorageCustomNode: ControlFlowStorageNode = new ControlFlowStorageNode(
            controlFlowStorage,
            controlFlowStorageCustomNodeName,
            this.options
        );

        NodeAppender.prependNode(functionNode.body, controlFlowStorageCustomNode.getNode());
    }
}
