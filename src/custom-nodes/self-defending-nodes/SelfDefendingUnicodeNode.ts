import * as esprima from 'esprima';

import { INode } from "../../interfaces/nodes/INode";
import { IOptions } from "../../interfaces/IOptions";

import { TBlockScopeNode } from "../../types/TBlockScopeNode";

import { AppendState } from "../../enums/AppendState";

import { NO_CUSTOM_NODES_PRESET } from "../../preset-options/NoCustomNodesPreset";

import { JavaScriptObfuscator } from "../../JavaScriptObfuscator";
import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

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
        let programBodyLength: number = blockScopeNode.body.length,
            randomIndex: number = 0;

        if (programBodyLength > 2) {
            randomIndex = Utils.getRandomInteger(programBodyLength / 2, programBodyLength);
        }

        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), randomIndex);
    }

    /**
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        let node: INode = esprima.parse(
            JavaScriptObfuscator.obfuscate(`
                (function () {                                
                    var func = function () {
                        return '\x77\x69\x6e\x64\x6f\x77';
                    };
                                        
                    if (
                        !/(\\\\\[x|u](\\w){2,4})+/.test(func.toString())
                    ) {
                        []["filter"]["constructor"]((+(32))["toString"](33) + (+(101))["toString"](21)[1] + ([false]+undefined)[10] + (false+"")[2] + (true+"")[3] + '(!![]){}')();
                    }
                })();
            `, NO_CUSTOM_NODES_PRESET)
        );

        NodeUtils.addXVerbatimPropertyToLiterals(node);

        return NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
