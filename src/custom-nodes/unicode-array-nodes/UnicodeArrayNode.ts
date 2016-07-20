import { INode } from '../../interfaces/nodes/INode';
import { IOptions } from "../../interfaces/IOptions";

import { TNodeWithBlockStatement } from "../../types/TNodeWithBlockStatement";

import { AppendState } from '../../enums/AppendState';

import { Node } from '../Node';
import { NodeUtils } from "../../NodeUtils";
import { Utils } from '../../Utils';
import {UnicodeArrayTemplate} from "../../templates/custom-nodes/unicode-array-nodes/unicode-array-node/UnicodeArrayTemplate";

export class UnicodeArrayNode extends Node {
    /**
     * @type {number}
     */
    public static UNICODE_ARRAY_RANDOM_LENGTH: number = 4;

    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {string[]}
     */
    private unicodeArray: string[] = [];

    /**
     * @type {string}
     */
    private unicodeArrayName: string;

    /**
     * @type {number}
     */
    private unicodeArrayRotateValue: number;

    /**
     * @param unicodeArrayName
     * @param unicodeArrayRotateValue
     * @param options
     */
    constructor (
        unicodeArrayName: string,
        unicodeArrayRotateValue: number = 0,
        options: IOptions
    ) {
        super(options);

        this.unicodeArrayName = unicodeArrayName;
        this.unicodeArrayRotateValue = unicodeArrayRotateValue;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.unicodeArray.length) {
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
     * @returns {string[]}
     */
    public getNodeData (): string[] {
        return this.unicodeArray;
    }

    /**
     * @returns {INode}
     */
    public getNode (): INode {
        Utils.arrayRotate <string> (this.unicodeArray, this.unicodeArrayRotateValue);

        return super.getNode();
    }

    /**
     * @param data
     */
    public updateNodeData (data: string): void {
        this.unicodeArray.push(data);
    }

    /**
     * @returns {INode}
     */
    protected getNodeStructure (): INode {
        return NodeUtils.convertCodeToStructure(
            UnicodeArrayTemplate(this.unicodeArrayName, this.unicodeArray.join(','))
        );
    }
}
