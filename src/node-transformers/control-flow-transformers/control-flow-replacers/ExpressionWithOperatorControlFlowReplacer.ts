import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';

import { TCustomNodeFactory } from '../../../types/container/custom-nodes/TCustomNodeFactory';
import { TStatement } from '../../../types/node/TStatement';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IOptions } from '../../../interfaces/options/IOptions';

import { AbstractControlFlowReplacer } from './AbstractControlFlowReplacer';
import { CustomNode } from '../../../enums/container/custom-nodes/CustomNode';
import { Node } from '../../../node/Node';

@injectable()
export abstract class ExpressionWithOperatorControlFlowReplacer extends AbstractControlFlowReplacer {
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
        super(customNodeFactory, options);
    }

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
        const controlFlowStorageCallCustomNode: ICustomNode = this.customNodeFactory(
            CustomNode.ExpressionWithOperatorControlFlowStorageCallNode
        );

        controlFlowStorageCallCustomNode.initialize(controlFlowStorageId, storageKey, leftExpression, rightExpression);

        const statementNode: TStatement = controlFlowStorageCallCustomNode.getNode()[0];

        if (!statementNode || !Node.isExpressionStatementNode(statementNode)) {
            throw new Error(`\`controlFlowStorageCallCustomNode.getNode()[0]\` should returns array with \`ExpressionStatement\` node`);
        }

        return statementNode.expression;
    }
}
