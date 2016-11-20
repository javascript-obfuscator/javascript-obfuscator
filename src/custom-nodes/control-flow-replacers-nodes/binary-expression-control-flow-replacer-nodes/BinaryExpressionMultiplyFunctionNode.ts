import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../../types/TNodeWithBlockStatement';

import { AppendState } from '../../../enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from '../../../preset-options/NoCustomNodesPreset';

import { BinaryExpressionMultiplyFunctionTemplate } from '../../../templates/custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionMultiplyFunctionTemplate';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../../JavaScriptObfuscator';
import { Utils } from '../../../Utils';

export class BinaryExpressionMultiplyFunctionNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.BeforeObfuscation;

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {

    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        return JavaScriptObfuscator.obfuscate(
            format(BinaryExpressionMultiplyFunctionTemplate(), {
                functionName: Utils.getRandomVariableName()
            }),
            NO_CUSTOM_NODES_PRESET
        ).getObfuscatedCode();
    }
}
