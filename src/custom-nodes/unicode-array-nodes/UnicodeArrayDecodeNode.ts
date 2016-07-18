
import { INode } from "../../interfaces/nodes/INode";
import { IOptions } from "../../interfaces/IOptions";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { SelfDefendingTemplate } from "../../templates/custom-nodes/unicode-array-nodes/unicode-array-decode-node/SelfDefendingTemplate";
import { UnicodeArrayDecodeTemplate } from "../../templates/custom-nodes/unicode-array-nodes/unicode-array-decode-node/UnicodeArrayDecodeTemplate";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

export class UnicodeArrayDecodeNode extends Node {
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
     * @param unicodeArrayName
     * @param unicodeArray
     * @param options
     */
    constructor (
        unicodeArrayName: string,
        unicodeArray: string[],
        options: IOptions
    ) {
        super(options);

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
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
        const forLoopFunctionName: string = Utils.getRandomVariableName();

        let code: string = '';

        if (this.options.selfDefending) {
            code = SelfDefendingTemplate(this.unicodeArrayName, forLoopFunctionName);
        } else {
            code = `${forLoopFunctionName}();`;
        }

        return NodeUtils.convertCodeToStructure(
            UnicodeArrayDecodeTemplate(code, this.unicodeArrayName, forLoopFunctionName)
        );
    }
}
