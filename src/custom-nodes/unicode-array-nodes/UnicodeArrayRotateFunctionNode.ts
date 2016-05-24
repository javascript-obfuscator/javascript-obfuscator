import * as esprima from 'esprima';

import { INode } from "../../interfaces/nodes/INode";

import { BlockScopeNode } from "../../types/BlockScopeNode";

import { AppendState } from "../../enums/AppendState";

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
     */
    constructor (
        unicodeArrayName: string,
        unicodeArray: string[],
        unicodeArrayRotateValue: number
    ) {
        super();

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;

        this.node = this.getNodeStructure();
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: BlockScopeNode): void {
        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }

    /**
     * @returns {INode}
     */
    public getNode (): INode {
        if (!this.unicodeArray.length) {
            return;
        }

        return super.getNode();
    }

    /**
     * @returns any
     */
    protected getNodeStructure (): any {
        let arrayName: string = Utils.getRandomVariableName(),
            timesName: string = Utils.getRandomVariableName(),
            tempArrayName: string = Utils.getRandomVariableName(),
            node: INode = esprima.parse(`
                (function (${arrayName}, ${timesName}) {
                    if (${timesName} < 0x${Utils.decToHex(0)}) {
                        return;
                    }

                    var ${tempArrayName};

                    while (${timesName}--) {
                        ${tempArrayName} = ${arrayName}[${Utils.stringToUnicode('shift')}]();
                        ${arrayName}[${Utils.stringToUnicode('push')}](${tempArrayName});
                    }
                })(${this.unicodeArrayName}, 0x${Utils.decToHex(this.unicodeArrayRotateValue)});
            `);

        NodeUtils.addXVerbatimPropertyToLiterals(node);

        return NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
