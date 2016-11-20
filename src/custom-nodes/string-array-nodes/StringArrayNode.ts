import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';

import { StringArray } from '../../StringArray';

import { StringArrayTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-node/StringArrayTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeAppender } from '../../node/NodeAppender';

export class StringArrayNode extends AbstractCustomNode {
    /**
     * @type {number}
     */
    public static ARRAY_RANDOM_LENGTH: number = 4;

    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {StringArray}
     */
    private stringArray: StringArray;

    /**
     * @type {string}
     */
    private stringArrayName: string;

    /**
     * @type {number}
     */
    private stringArrayRotateValue: number;

    /**
     * @param stringArray
     * @param stringArrayName
     * @param stringArrayRotateValue
     * @param options
     */
    constructor (
        stringArray: StringArray,
        stringArrayName: string,
        stringArrayRotateValue: number = 0,
        options: IOptions
    ) {
        super(options);

        this.stringArray = stringArray;
        this.stringArrayName = stringArrayName;
        this.stringArrayRotateValue = stringArrayRotateValue;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.stringArray.getLength()) {
            return;
        }

        NodeAppender.prependNode(blockScopeNode, this.getNode());
    }

    /**
     * @returns {string}
     */
    public getCode (): string {
        return StringArrayTemplate().formatUnicorn({
            stringArrayName: this.stringArrayName,
            stringArray: this.stringArray.toString()
        });
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.stringArrayName;
    }

    /**
     * @returns {StringArray}
     */
    public getNodeData (): StringArray {
        return this.stringArray;
    }

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        this.stringArray.rotateArray(this.stringArrayRotateValue);

        return super.getNode();
    }

    /**
     * @param data
     */
    public updateNodeData (data: string): void {
        this.stringArray.addToArray(data);
    }
}
