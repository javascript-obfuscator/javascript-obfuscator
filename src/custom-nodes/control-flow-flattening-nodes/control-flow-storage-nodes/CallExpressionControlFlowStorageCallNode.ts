import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import * as ESTree from 'estree';
import { Expression } from 'estree';

import { TStatement } from '../../../types/node/TStatement';

import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from "../../../interfaces/utils/IRandomGenerator";

import { initializable } from '../../../decorators/Initializable';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { Nodes } from '../../../node/Nodes';
import { NodeUtils } from '../../../node/NodeUtils';

@injectable()
export class CallExpressionControlFlowStorageCallNode extends AbstractCustomNode {
    /**
     * @type {Expression}
     */
    @initializable()
    private callee: Expression;

    /**
     * @type {string}
     */
    @initializable()
    private controlFlowStorageKey: string;

    /**
     * @type {string}
     */
    @initializable()
    private controlFlowStorageName: string;

    /**
     * @type {(ESTree.Expression | ESTree.SpreadElement)[]}
     */
    @initializable()
    private expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[];

    /**
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(randomGenerator, options);
    }

    /**
     * @param {string} controlFlowStorageName
     * @param {string} controlFlowStorageKey
     * @param {Expression} callee
     * @param {(Expression | SpreadElement)[]} expressionArguments
     */
    public initialize (
        controlFlowStorageName: string,
        controlFlowStorageKey: string,
        callee: Expression,
        expressionArguments: (ESTree.Expression | ESTree.SpreadElement)[]
    ): void {
        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
        this.callee = callee;
        this.expressionArguments = expressionArguments;
    }

    protected getNodeStructure (): TStatement[] {
        const structure: TStatement = Nodes.getExpressionStatementNode(
            Nodes.getCallExpressionNode(
                Nodes.getMemberExpressionNode(
                    Nodes.getIdentifierNode(this.controlFlowStorageName),
                    Nodes.getIdentifierNode(this.controlFlowStorageKey)
                ),
                [
                    this.callee,
                    ...this.expressionArguments
                ]
            )
        );

        NodeUtils.parentize(structure);

        return [structure];
    }
}
