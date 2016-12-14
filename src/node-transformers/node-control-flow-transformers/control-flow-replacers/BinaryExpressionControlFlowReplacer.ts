import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as escodegen from 'escodegen';
import * as ESTree from 'estree';
import * as _ from 'lodash';

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
     * @type {number}
     */
    private static readonly useExistingOperatorKeyThreshold: number = 0.5;

    /**
     * @type {Map<string, any>}
     */
    private readonly existingBinaryExpressionKeys: Map <string, any> = new Map <string, any> ();

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
        const binaryExpressionFunctionNode: ICustomNode = this.customNodeFactory(CustomNodes.BinaryExpressionFunctionNode);
        const binaryExpressionOperatorKeys: {
            [key: string]: string[]
        } = this.existingBinaryExpressionKeys.get(controlFlowStorageCustomNodeName) || {};
        const controlFlowStorageCallNode: ICustomNode = this.customNodeFactory(CustomNodes.ControlFlowStorageCallNode);

        let key: string = AbstractControlFlowReplacer.getStorageKey();

        if (!binaryExpressionOperatorKeys[binaryExpressionNode.operator]) {
            binaryExpressionOperatorKeys[binaryExpressionNode.operator] = [];
        }

        binaryExpressionFunctionNode.initialize(binaryExpressionNode.operator);

        if (
            Math.random() > BinaryExpressionControlFlowReplacer.useExistingOperatorKeyThreshold &&
            binaryExpressionOperatorKeys[binaryExpressionNode.operator].length
        ) {
            key = _.sample(binaryExpressionOperatorKeys[binaryExpressionNode.operator]);
        } else {
            binaryExpressionOperatorKeys[binaryExpressionNode.operator].push(key);
            this.existingBinaryExpressionKeys.set(controlFlowStorageCustomNodeName, binaryExpressionOperatorKeys);
            controlFlowStorage.set(key, binaryExpressionFunctionNode);
        }

        controlFlowStorageCallNode.initialize(
            controlFlowStorageCustomNodeName,
            key,
            BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.left),
            BinaryExpressionControlFlowReplacer.getExpressionValue(binaryExpressionNode.right)
        );

        const statementNode: TStatement = controlFlowStorageCallNode.getNode()[0];

        if (!statementNode || !Node.isExpressionStatementNode(statementNode)) {
            throw new Error(`\`controlFlowStorageCallCustomNode.getNode()\` should returns array with \`ExpressionStatement\` node`);
        }

        return statementNode.expression;
    }
}
