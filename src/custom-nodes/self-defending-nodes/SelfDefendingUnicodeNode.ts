import * as esprima from 'esprima';

import { INode } from "../../interfaces/nodes/INode";
import { IOptions } from "../../interfaces/IOptions";

import { TBlockScopeNode } from "../../types/TBlockScopeNode";

import { AppendState } from "../../enums/AppendState";

import { NO_CUSTOM_NODES_PRESET } from "../../preset-options/NoCustomNodesPreset";

import { JavaScriptObfuscator } from "../../JavaScriptObfuscator";
import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";

export class SelfDefendingUnicodeNode extends Node {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @param options
     */
    constructor (options: IOptions = {}) {
        super(options);

        this.node = this.getNodeStructure();
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TBlockScopeNode): void {
        NodeUtils.prependNode(blockScopeNode.body, this.getNode());
    }

    /**
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        let node: INode = esprima.parse(
             JavaScriptObfuscator.obfuscate(`
               
            `, NO_CUSTOM_NODES_PRESET)
        );

        NodeUtils.addXVerbatimPropertyToLiterals(node);

        return NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
