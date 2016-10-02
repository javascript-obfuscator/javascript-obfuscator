import * as ESTree from 'estree';

import { TNodeWithBlockStatement } from 'app/types/TNodeWithBlockStatement';

import { AppendState } from 'app/enums/AppendState';

import { NO_CUSTOM_NODES_PRESET } from 'app/preset-options/NoCustomNodesPreset';

import { SelfDefendingTemplate } from 'app/templates/custom-nodes/self-defending-nodes/self-defending-unicode-node/SelfDefendingTemplate';

import { AbstractCustomNode } from 'app/custom-nodes/AbstractCustomNode';
import { JavaScriptObfuscator } from 'app/JavaScriptObfuscator';
import { NodeUtils } from 'app/NodeUtils';
import { Utils } from 'app/Utils';

export class SelfDefendingUnicodeNode extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        let programBodyLength: number = blockScopeNode.body.length,
            randomIndex: number = 0;

        if (programBodyLength > 2) {
            randomIndex = Utils.getRandomGenerator().integer({
                min: programBodyLength / 2,
                max: programBodyLength - 1
            });
        }

        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
    }

    /**
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
        return NodeUtils.convertCodeToStructure(
            JavaScriptObfuscator.obfuscate(
                SelfDefendingTemplate(),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode()
        );
    }
}
