import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../../types/TNodeWithBlockStatement';

import { IOptions } from '../../../interfaces/IOptions';

import { AppendState } from '../../../enums/AppendState';

import { BinaryExpressionFunctionTemplate } from '../../../templates/custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionFunctionTemplate';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { Utils } from '../../../Utils';

export class BinaryExpressionFunctionNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @type {string}
     */
    private operator: string;

    /**
     * @param operator
     * @param options
     */
    constructor (operator: string, options: IOptions) {
        super(options);

        this.operator = operator;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {}

    /**
     * @returns {string}
     */
    public getCode (): string {
        return format(BinaryExpressionFunctionTemplate(), {
            functionName: Utils.getRandomVariableName(1),
            operator: this.operator
        });
    }
}
