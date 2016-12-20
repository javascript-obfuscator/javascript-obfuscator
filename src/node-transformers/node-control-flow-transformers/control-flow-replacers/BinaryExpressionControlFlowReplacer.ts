import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { CustomNodes } from '../../../enums/container/CustomNodes';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { Node } from '../../../node/Node';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';

@injectable()
export class BinaryExpressionControlFlowReplacer extends AbstractControlFlowReplacer {
    /**
     * @type {number}
     */
    private static readonly useExistingOperatorKeyThreshold: number = 0.5;

    /**
     * @type {Map<string, Map<ESTree.BinaryOperator, string[]>>}
     */
    private readonly binaryOperatorsDataByControlFlowStorageId: Map <string, Map<ESTree.BinaryOperator, string[]>> = new Map();

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
     * @param binaryOperatorsDataByControlFlowStorageId
     * @param controlFlowStorageId
     * @returns {Map<ESTree.BinaryOperator, string[]>}
     */
    private static getStorageKeysByBinaryOperatorForCurrentStorage (
        binaryOperatorsDataByControlFlowStorageId: Map<string, Map<ESTree.BinaryOperator, string[]>>,
        controlFlowStorageId: string
    ): Map<ESTree.BinaryOperator, string[]> {
        let storageKeysByBinaryOperator: Map<ESTree.BinaryOperator, string[]>;

        if (binaryOperatorsDataByControlFlowStorageId.has(controlFlowStorageId)) {
            storageKeysByBinaryOperator = <Map<ESTree.BinaryOperator, string[]>>binaryOperatorsDataByControlFlowStorageId
                .get(controlFlowStorageId);
        } else {
            storageKeysByBinaryOperator = new Map <ESTree.BinaryOperator, string[]> ();
        }

        return storageKeysByBinaryOperator;
    }

    /**
     * @param binaryExpressionNode
     * @param parentNode
     * @param controlFlowStorage
     * @returns {ESTree.Node}
     */
    public replace (
        binaryExpressionNode: ESTree.BinaryExpression,
        parentNode: ESTree.Node,
        controlFlowStorage: IStorage <ICustomNode>
    ): ESTree.Node {
        const controlFlowStorageId: string = controlFlowStorage.getStorageId();
        const controlFlowStorageCallCustomNode: ICustomNode = this.customNodeFactory(CustomNodes.ControlFlowStorageCallNode);
        const storageKeysByBinaryOperator: Map<ESTree.BinaryOperator, string[]> = BinaryExpressionControlFlowReplacer
            .getStorageKeysByBinaryOperatorForCurrentStorage(
                this.binaryOperatorsDataByControlFlowStorageId,
                controlFlowStorageId
            );

        let storageKeysForCurrentOperator: string[] | undefined = storageKeysByBinaryOperator.get(binaryExpressionNode.operator);
        let storageKey: string;

        if (
            RandomGeneratorUtils.getRandomFloat(0, 1) > BinaryExpressionControlFlowReplacer.useExistingOperatorKeyThreshold &&
            storageKeysForCurrentOperator &&
            storageKeysForCurrentOperator.length
        ) {
            storageKey = RandomGeneratorUtils.getRandomGenerator().pickone(storageKeysForCurrentOperator);
        } else {
            const binaryExpressionFunctionCustomNode: ICustomNode = this.customNodeFactory(CustomNodes.BinaryExpressionFunctionNode);

            binaryExpressionFunctionCustomNode.initialize(binaryExpressionNode.operator);

            storageKey = RandomGeneratorUtils.getRandomString(3);
            storageKeysByBinaryOperator.set(binaryExpressionNode.operator, [storageKey]);
            this.binaryOperatorsDataByControlFlowStorageId.set(controlFlowStorageId, storageKeysByBinaryOperator);
            controlFlowStorage.set(storageKey, binaryExpressionFunctionCustomNode);
        }

        controlFlowStorageCallCustomNode.initialize(
            controlFlowStorageId,
            storageKey,
            binaryExpressionNode.left,
            binaryExpressionNode.right
        );

        const statementNode: TStatement = controlFlowStorageCallCustomNode.getNode()[0];

        if (!statementNode || !Node.isExpressionStatementNode(statementNode)) {
            throw new Error(`\`controlFlowStorageCallNode.getNode()[0]\` should returns array with \`ExpressionStatement\` node`);
        }

        return statementNode.expression;
    }
}
