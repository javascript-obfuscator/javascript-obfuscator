import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { CustomNodes } from '../../../enums/container/CustomNodes';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { Node } from '../../../node/Node';

@injectable()
export class BinaryExpressionControlFlowReplacer extends AbstractControlFlowReplacer {
    /**
     * @type {TCustomNodeFactory}
     */
    private readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers['Factory<ICustomNode>']) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);

        this.customNodeFactory = customNodeFactory;
    }

    /**
     * @param expressionNode
     * @returns {string}
     */
    private static getExpressionValue (expressionNode: ESTree.Expression): string {
        return escodegen.generate(expressionNode, {
            sourceMapWithCode: true
        }).code;
    }

    /**
     * @param binaryExpressionNode
     * @param parentNode
     * @param controlFlowStorage
     * @param controlFlowStorageCustomNodeName
     * @returns {ESTree.Node}
     */
    public replace (
        binaryExpressionNode: ESTree.BinaryExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage <ICustomNode>,
        controlFlowStorageCustomNodeName: string
    ): ESTree.Node {
        const key: string = AbstractControlFlowReplacer.getStorageKey();
        const binaryExpressionFunctionNode: ICustomNode = this.customNodeFactory(CustomNodes.BinaryExpressionFunctionNode);
        const controlFlowStorageCallNode: ICustomNode = this.customNodeFactory(CustomNodes.ControlFlowStorageCallNode);

        binaryExpressionFunctionNode.initialize(binaryExpressionNode.operator);
        controlFlowStorageCallNode.initialize(
            controlFlowStorageCustomNodeName,
            key,
            BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.left),
            BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.right)
        );

        controlFlowStorage.set(key, binaryExpressionFunctionNode);

        const statementNode: TStatement = controlFlowStorageCallNode.getNode()[0];

        if (!statementNode || !Node.isExpressionStatementNode(statementNode)) {
            throw new Error(`\`controlFlowStorageCallCustomNode.getNode()\` should returns array with \`ExpressionStatement\` node`);
        }

        return statementNode.expression;
    }
}
