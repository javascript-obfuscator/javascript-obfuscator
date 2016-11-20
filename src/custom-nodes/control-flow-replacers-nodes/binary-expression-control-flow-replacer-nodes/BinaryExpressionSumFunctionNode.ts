import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../../types/TNodeWithBlockStatement';

import { AppendState } from '../../../enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from '../../../preset-options/NoCustomNodesPreset';

import { BinaryExpressionSumFunctionTemplate } from '../../../templates/custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionSumFunctionTemplate';

import { AbstractCustomNode } from '../../AbstractCustomNode';
import { JavaScriptObfuscator } from '../../../JavaScriptObfuscator';
import { Utils } from '../../../Utils';

export class BinaryExpressionSumFunctionNode extends AbstractCustomNode {
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
            BinaryExpressionSumFunctionTemplate().formatUnicorn({
                functionName: Utils.getRandomVariableName()
            }),
            NO_CUSTOM_NODES_PRESET
        ).getObfuscatedCode();
    }
}
