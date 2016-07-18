import { INode } from "../../interfaces/nodes/INode";
import { IOptions } from "../../interfaces/IOptions";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { NO_CUSTOM_NODES_PRESET } from "../../preset-options/NoCustomNodesPreset";

import { SelfDefendingTemplate } from "../../templates/custom-nodes/unicode-array-nodes/unicode-array-rotate-function-node/SelfDefendingTemplate";
import { UnicodeArrayRotateFunctionTemplate } from "../../templates/custom-nodes/unicode-array-nodes/unicode-array-rotate-function-node/UnicodeArrayRotateFunctionTemplate";

import { JavaScriptObfuscator } from "../../JavaScriptObfuscator";
import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

export class UnicodeArrayRotateFunctionNode extends Node {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string[]}
     */
    private unicodeArray: string[];

    /**
     * @type {string}
     */
    private unicodeArrayName: string;

    /**
     * @param {number}
     */
    private unicodeArrayRotateValue: number;

    /**
     * @param unicodeArrayName
     * @param unicodeArray
     * @param unicodeArrayRotateValue
     * @param options
     */
    constructor (
        unicodeArrayName: string,
        unicodeArray: string[],
        unicodeArrayRotateValue: number,
        options: IOptions
    ) {
        super(options);

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.unicodeArray.length) {
            return;
        }

        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }

    /**
     * @returns {INode}
     */
    public getNode (): INode {
        return super.getNode();
    }

    /**
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        let code: string = '',
            timesName: string = Utils.getRandomVariableName(),
            whileFunctionName: string = Utils.getRandomVariableName();

        if (this.options.selfDefending) {
            code = JavaScriptObfuscator.obfuscate(
                SelfDefendingTemplate(whileFunctionName, timesName),
                NO_CUSTOM_NODES_PRESET
            ).getObfuscatedCode();
        } else {
            code = `${whileFunctionName}(++${timesName})`;
        }

        return NodeUtils.convertCodeToStructure(
            UnicodeArrayRotateFunctionTemplate(
                code,
                this.unicodeArrayName,
                this.unicodeArrayRotateValue,
                whileFunctionName,
                timesName
            )
        );
    }
}
