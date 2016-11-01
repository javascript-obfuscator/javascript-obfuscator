import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IStackTraceData } from '../../interfaces/stack-trace-analyzer/IStackTraceData';

import { AppendState } from '../../enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from '../../preset-options/NoCustomNodesPreset';

import { SelfDefendingTemplate } from '../../templates/custom-nodes/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { CustomNodeAppender } from '../CustomNodeAppender';
import { JavaScriptObfuscator } from '../../JavaScriptObfuscator';
import { NodeUtils } from '../../NodeUtils';
import { Utils } from '../../Utils';

export class SelfDefendingUnicodeNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @param blockScopeNode
     * @param stackTraceData
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement, stackTraceData: IStackTraceData[]): void {
        CustomNodeAppender.appendNode(
            stackTraceData,
            blockScopeNode,
            this.getNode(),
            CustomNodeAppender.getRandomStackTraceIndex(stackTraceData.length)
        );
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(
            JavaScriptObfuscator.obfuscate(
                SelfDefendingTemplate().formatUnicorn({
                    selfDefendingFunctionName: Utils.getRandomVariableName()
                }),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode()
        );
    }
}
