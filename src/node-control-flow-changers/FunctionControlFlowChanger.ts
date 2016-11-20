import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TControlFlowReplacer } from '../types/TControlFlowReplacer';

import { ICustomNode } from '../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../interfaces/IOptions';

import { NodeType } from '../enums/NodeType';

import { AbstractNodeControlFlowChanger } from './AbstractNodeControlFlowChanger';
import { BinaryExpressionControlFlowReplacer } from './control-flow-replacers/BinaryExpressionControlFlowReplacer';
import { ControlFlowStorage } from '../ControlFlowStorage';
import { ControlFlowStorageNode } from '../custom-nodes/control-flow-storage-nodes/ControlFlowStorageNode';
import { Node } from '../node/Node';
import { NodeAppender } from '../node/NodeAppender';
import { Utils } from '../Utils';

export class FunctionControlFlowChanger extends AbstractNodeControlFlowChanger {
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
    public changeControlFlow (functionNode: ESTree.Function): void {
        this.changeFunctionBodyControlFlow(functionNode);
    }

    /**
     * @param functionNode
     */
    private changeFunctionBodyControlFlow (functionNode: ESTree.Function): void {
        const controlFlowStorage: ControlFlowStorage = new ControlFlowStorage();
        const controlFlowStorageCustomNodeName: string = Utils.getRandomVariableName(6);

        if (!Node.isFunctionDeclarationNode(functionNode) && !Node.isFunctionExpressionNode(functionNode)) {
            return;
        }

        estraverse.replace(functionNode.body, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                const controlFlowReplacerConstructor: TControlFlowReplacer | undefined = FunctionControlFlowChanger.controlFlowReplacers
                    .get(node.type);

                if (!controlFlowReplacerConstructor) {
                    return;
                }

                const controlFlowStorageCallCustomNode: ICustomNode | undefined = new controlFlowReplacerConstructor(
                    this.nodes,
                    this.options
                ).replace(node, parentNode, controlFlowStorage, controlFlowStorageCustomNodeName);

                if (!controlFlowStorageCallCustomNode) {
                    return;
                }

                // controlFlowStorageCallCustomNode will always has only one TStatement node,
                // so we can get it by index `0`
                // also we need to `expression` property of `ExpressionStatement` node because bug:
                // https://github.com/estools/escodegen/issues/289
                return (<ESTree.ExpressionStatement>controlFlowStorageCallCustomNode.getNode()[0]).expression;
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
