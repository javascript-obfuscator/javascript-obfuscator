import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../../types/container/TCustomNodeFactory';
import { TStatement } from '../../../types/node/TStatement';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/IControlFlowReplacer';
import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IStorage } from '../../../interfaces/storages/IStorage';

import { BinaryExpressionControlFlowReplacer } from './BinaryExpressionControlFlowReplacer';
import { CustomNodes } from '../../../enums/container/CustomNodes';
import { Node } from '../../../node/Node';
import { RandomGeneratorUtils } from '../../../utils/RandomGeneratorUtils';

@injectable()
export abstract class AbstractControlFlowReplacer implements IControlFlowReplacer {
    /**
     * @type {TCustomNodeFactory}
     */
    protected readonly customNodeFactory: TCustomNodeFactory;

    /**
     * @type {IOptions}
     */
    protected readonly options: IOptions;

    /**
     * @type {Map<string, Map<string, string[]>>}
     */
    protected readonly replacerDataByControlFlowStorageId: Map <string, Map<string, string[]>> = new Map();

    /**
     * @param customNodeFactory
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__ICustomNode) customNodeFactory: TCustomNodeFactory,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        this.customNodeFactory = customNodeFactory;
        this.options = options;
    }

    /**
     * @param identifierDataByControlFlowStorageId
     * @param controlFlowStorageId
     * @returns {Map<string, string[]>}
     */
    protected static getStorageKeysByIdForCurrentStorage (
        identifierDataByControlFlowStorageId: Map<string, Map<string, string[]>>,
        controlFlowStorageId: string
    ): Map<string, string[]> {
        let storageKeysById: Map<string, string[]>;

        if (identifierDataByControlFlowStorageId.has(controlFlowStorageId)) {
            storageKeysById = <Map<string, string[]>>identifierDataByControlFlowStorageId.get(controlFlowStorageId);
        } else {
            storageKeysById = new Map <string, string[]> ();
        }

        return storageKeysById;
    }

    /**
     * @param node
     * @param parentNode
     * @param controlFlowStorage
     * @returns {ESTree.Node}
     */
    public abstract replace (node: ESTree.Node, parentNode: ESTree.Node, controlFlowStorage: IStorage <ICustomNode>): ESTree.Node;

    /**
     * @param controlFlowStorageId
     * @param storageKey
     * @param leftExpression
     * @param rightExpression
     * @returns {ESTree.Node}
     */
    protected getControlFlowStorageCallNode (
        controlFlowStorageId: string,
        storageKey: string,
        leftExpression: ESTree.Expression,
        rightExpression: ESTree.Expression
    ): ESTree.Node {
        const controlFlowStorageCallCustomNode: ICustomNode = this.customNodeFactory(CustomNodes.ControlFlowStorageCallNode);

        controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, leftExpression, rightExpression);

        const statementNode: TStatement = controlFlowStorageCallCustomNode.getNode()[0];

        if (!statementNode || !Node.isExpressionStatementNode(statementNode)) {
            throw new Error(`\`controlFlowStorageCallNode.getNode()[0]\` should returns array with \`ExpressionStatement\` node`);
        }

        return statementNode.expression;
    }

    /**
     * @param customNode
     * @param controlFlowStorage
     * @param replacerId
     * @param usingExistingIdentifierChance
     * @returns {string}
     */
    protected insertCustomNodeToControlFlowStorage (
        customNode: ICustomNode,
        controlFlowStorage: IStorage <ICustomNode>,
        replacerId: string,
        usingExistingIdentifierChance: number
    ): string {
        const controlFlowStorageId: string = controlFlowStorage.getStorageId();
        const storageKeysById: Map<string, string[]> = BinaryExpressionControlFlowReplacer
            .getStorageKeysByIdForCurrentStorage(this.replacerDataByControlFlowStorageId, controlFlowStorageId);
        const storageKeysForCurrentId: string[] | undefined = storageKeysById.get(replacerId);

        if (
            RandomGeneratorUtils.getRandomFloat(0, 1) > usingExistingIdentifierChance &&
            storageKeysForCurrentId &&
            storageKeysForCurrentId.length
        ) {
            return RandomGeneratorUtils.getRandomGenerator().pickone(storageKeysForCurrentId);
        }

        const storageKey: string = RandomGeneratorUtils.getRandomString(3);

        storageKeysById.set(replacerId, [storageKey]);
        this.replacerDataByControlFlowStorageId.set(controlFlowStorageId, storageKeysById);
        controlFlowStorage.set(storageKey, customNode);

        return storageKey;
    }
}
