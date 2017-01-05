import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { Expression } from 'estree';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';

import { initializable } from '../../decorators/Initializable';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { Nodes } from '../../node/Nodes';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class ExpressionWithOperatorControlFlowStorageCallNode extends AbstractCustomNode {
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
     * @type {Expression}
     */
    @initializable()
    private leftValue: Expression;

    /**
     * @type {ESTree.Expression}
     */
    @initializable()
    private rightValue: Expression;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param controlFlowStorageName
     * @param controlFlowStorageKey
     * @param leftValue
     * @param rightValue
     */
    public initialize (
        controlFlowStorageName: string,
        controlFlowStorageKey: string,
        leftValue: Expression,
        rightValue: Expression,
    ): void {
        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
        this.leftValue = leftValue;
        this.rightValue = rightValue;
    }

    protected getNodeStructure (): TStatement[] {
        const structure: TStatement = Nodes.getExpressionStatementNode(
            Nodes.getCallExpressionNode(
                Nodes.getMemberExpressionNode(
                    Nodes.getIdentifierNode(this.controlFlowStorageName),
                    Nodes.getIdentifierNode(this.controlFlowStorageKey)
                ),
                [
                    this.leftValue,
                    this.rightValue
                ]
            )
        );

        NodeUtils.parentize(structure);

        return [structure];
    }
}
