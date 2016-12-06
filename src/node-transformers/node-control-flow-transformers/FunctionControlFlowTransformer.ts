import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from 'estraverse';
import * as ESTree from 'estree';

import { TControlFlowReplacer } from '../../types/node-transformers/TControlFlowReplacer';
import { TStatement } from '../../types/node/TStatement';

import { ICustomNode } from '../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

import { NodeType } from '../../enums/NodeType';

import { AbstractNodeTransformer } from '../AbstractNodeTransformer';
import { BinaryExpressionControlFlowReplacer } from './control-flow-replacers/BinaryExpressionControlFlowReplacer';
import { ControlFlowStorage } from '../../storages/control-flow/ControlFlowStorage';
import { ControlFlowStorageNode } from '../../custom-nodes/control-flow-storage-nodes/ControlFlowStorageNode';
import { Node } from '../../node/Node';
import { NodeAppender } from '../../node/NodeAppender';
import { Utils } from '../../Utils';

@injectable()
export class FunctionControlFlowTransformer extends AbstractNodeTransformer {
    /**
     * @type {Map <string, IReplacer>}
     */
    private static readonly controlFlowReplacers: Map <string, TControlFlowReplacer> = new Map <string, TControlFlowReplacer> ([
        [NodeType.BinaryExpression, BinaryExpressionControlFlowReplacer]
    ]);

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
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

        estraverse.replace(functionNode.body, {
            enter: (node: ESTree.Node, parentNode: ESTree.Node): any => {
                const controlFlowReplacer: TControlFlowReplacer | undefined = FunctionControlFlowTransformer
                    .controlFlowReplacers.get(node.type);

                if (!controlFlowReplacer) {
                    return;
                }

                const controlFlowStorageCallCustomNode: ICustomNode | undefined = new controlFlowReplacer(
                    this.options
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

        if (!controlFlowStorage.getLength()) {
            return;
        }

        const controlFlowStorageCustomNode: ICustomNode = new ControlFlowStorageNode(this.options);

        controlFlowStorageCustomNode.initialize(controlFlowStorage, controlFlowStorageCustomNodeName);

        NodeAppender.prependNode(functionNode.body, controlFlowStorageCustomNode.getNode());
    }
}
