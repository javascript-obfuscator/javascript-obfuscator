import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TStatement } from '../../../types/node/TStatement';

import { IOptions } from '../../../interfaces/options/IOptions';

import { initializable } from '../../../decorators/Initializable';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { Nodes } from '../../../node/Nodes';

@injectable()
export class ControlFlowStorageCallNode extends AbstractCustomNode {
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
     * @type {string}
     */
    @initializable()
    private leftValue: string;

    /**
     * @type {string}
     */
    @initializable()
    private rightValue: string;

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
        leftValue: string,
        rightValue: string,
    ): void {
        this.controlFlowStorageName = controlFlowStorageName;
        this.controlFlowStorageKey = controlFlowStorageKey;
        this.leftValue = leftValue;
        this.rightValue = rightValue;
    }

    protected getNodeStructure (): TStatement[] {
        return [
            Nodes.getExpressionStatementNode(
                Nodes.getCallExpressionNode(
                    Nodes.getMemberExpressionNode(
                        Nodes.getIdentifierNode(this.controlFlowStorageName),
                        Nodes.getIdentifierNode(this.controlFlowStorageKey)
                    ),
                    [
                        <any>this.leftValue,
                        <any>this.rightValue
                    ]
                )
            )
        ];
    }
}
