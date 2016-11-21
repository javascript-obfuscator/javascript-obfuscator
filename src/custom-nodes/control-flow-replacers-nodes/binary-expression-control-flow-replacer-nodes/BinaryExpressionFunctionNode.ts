import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../../types/TNodeWithBlockStatement';

import { IOptions } from '../../../interfaces/IOptions';

import { AppendState } from '../../../enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from '../../../preset-options/NoCustomNodesPreset';

import { BinaryExpressionFunctionTemplate } from '../../../templates/custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionFunctionTemplate';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../../JavaScriptObfuscator';
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
        return JavaScriptObfuscator.obfuscate(
            format(BinaryExpressionFunctionTemplate(), {
                functionName: Utils.getRandomVariableName(),
                operator: this.operator
            }),
            NO_CUSTOM_NODES_PRESET
        ).getObfuscatedCode();
    }
}
