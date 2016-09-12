import * as ESTree from 'estree';

import 'format-unicorn';

import { IOptions } from "../../interfaces/IOptions";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from '../../enums/AppendState';

import { UnicodeArray } from '../../UnicodeArray';

import { UnicodeArrayTemplate } from "../../templates/custom-nodes/unicode-array-nodes/unicode-array-node/UnicodeArrayTemplate";

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from "../../NodeUtils";

export class UnicodeArrayNode extends AbstractCustomNode {
    /**
     * @type {number}
     */
    public static UNICODE_ARRAY_RANDOM_LENGTH: number = 4;

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
     * @type {number}
     */
    private unicodeArrayRotateValue: number;

    /**
     * @param unicodeArray
     * @param unicodeArrayName
     * @param unicodeArrayRotateValue
     * @param options
     */
    constructor (
        unicodeArray: UnicodeArray,
        unicodeArrayName: string,
        unicodeArrayRotateValue: number = 0,
        options: IOptions
    ) {
        super(options);

        this.unicodeArray = unicodeArray;
        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.unicodeArray.getLength()) {
            return;
        }

        NodeUtils.prependNode(blockScopeNode.body, this.getNode());
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.unicodeArrayName;
    }

    /**
     * @returns {UnicodeArray}
     */
    public getNodeData (): UnicodeArray {
        return this.unicodeArray;
    }

    /**
     * @returns {ESTree.Node}
     */
    public getNode (): ESTree.Node {
        this.unicodeArray.rotateArray(this.unicodeArrayRotateValue);

        return super.getNode();
    }

    /**
     * @param data
     */
    public updateNodeData (data: string): void {
        this.unicodeArray.addToArray(data);
    }

    /**
     * @returns {ESTree.Node}
     */
    protected getNodeStructure (): ESTree.Node {
        return NodeUtils.convertCodeToStructure(
            UnicodeArrayTemplate().formatUnicorn({
                unicodeArrayName: this.unicodeArrayName,
                unicodeArray: this.unicodeArray.toString()
            })
        );
    }
}
