import * as ESTree from 'estree';

import 'format-unicorn';

import { IOptions } from "../../interfaces/IOptions";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from "../../enums/AppendState";

import { UnicodeArrayCallsWrapperTemplate } from "../../templates/custom-nodes/unicode-array-nodes/unicode-array-calls-wrapper/UnicodeArrayCallsWrapperTemplate";

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from "../../NodeUtils";
import { UnicodeArray } from "../../UnicodeArray";
import { Utils } from "../../Utils";

export class UnicodeArrayCallsWrapper extends AbstractCustomNode {
    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {UnicodeArray}
     */
    private unicodeArray: UnicodeArray;

    /**
     * @type {string}
     */
    private unicodeArrayName: string;

    /**
     * @type {string}
     */
    private unicodeArrayCallsWrapperName: string;

    /**
     * @param unicodeArrayCallsWrapperName
     * @param unicodeArrayName
     * @param unicodeArray
     * @param options
     */
    constructor (
        unicodeArrayCallsWrapperName: string,
        unicodeArrayName: string,
        unicodeArray: UnicodeArray,
        options: IOptions
    ) {
        super(options);

        this.unicodeArrayCallsWrapperName = unicodeArrayCallsWrapperName;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArray = unicodeArray;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.unicodeArray.getLength()) {
            return;
        }

        NodeUtils.insertNodeAtIndex(blockScopeNode.body, this.getNode(), 1);
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.unicodeArrayCallsWrapperName;
    };

    /**
     * @returns {ESTree.Node}
     */
    public getNode (): ESTree.Node {
        return super.getNode();
    }

    /**
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
        let keyName: string = Utils.getRandomVariableName();

        return NodeUtils.convertCodeToStructure(
            UnicodeArrayCallsWrapperTemplate().formatUnicorn({
                keyName: keyName,
                unicodeArrayCallsWrapperName: this.unicodeArrayCallsWrapperName,
                unicodeArrayName: this.unicodeArrayName
            })
        );
    }
}
