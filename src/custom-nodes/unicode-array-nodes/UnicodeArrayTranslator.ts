import * as esprima from 'esprima';

import { INode } from "../../interfaces/nodes/INode";

import { BlockScopeNode } from "../../types/BlockScopeNode";

import { AppendState } from "../../enums/AppendState";

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from "../../Utils";

export class UnicodeArrayTranslator extends Node {
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
     * @type {string}
     */
    private unicodeArrayTranslatorName: string;

    /**
     * @param unicodeArrayTranslatorName
     * @param unicodeArrayName
     * @param unicodeArray
     */
    constructor (
        unicodeArrayTranslatorName: string,
        unicodeArrayName: string,
        unicodeArray: string[]
    ) {
        super();

        this.unicodeArrayTranslatorName = unicodeArrayTranslatorName;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;

        this.node = this.getNodeStructure();
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: BlockScopeNode): void {
        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.unicodeArrayTranslatorName;
    };

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
        let keyName: string = Utils.getRandomVariableName(),
            node: INode = esprima.parse(`
                var ${this.unicodeArrayTranslatorName} = function (${keyName}) {
                    return ${this.unicodeArrayName}[parseInt(${keyName})]
                };
            `);

        NodeUtils.addXVerbatimPropertyToLiterals(node);

        return NodeUtils.getBlockScopeNodeByIndex(node);
    }
}
