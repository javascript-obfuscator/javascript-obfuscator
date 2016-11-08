import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';

import { UnicodeArray } from '../../UnicodeArray';

import { UnicodeArrayTemplate } from '../../templates/custom-nodes/unicode-array-nodes/unicode-array-node/UnicodeArrayTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeUtils } from '../../node/NodeUtils';

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

        NodeAppender.prependNode(blockScopeNode, this.getNode());
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
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
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
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(
            UnicodeArrayTemplate().formatUnicorn({
                unicodeArrayName: this.unicodeArrayName,
                unicodeArray: this.unicodeArray.toString()
            })
        );
    }
}
