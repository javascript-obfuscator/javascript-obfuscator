import 'format-unicorn';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { IOptions } from '../../interfaces/IOptions';

import { AppendState } from '../../enums/AppendState';

import { StringsArray } from '../../StringsArray';

import { StringsArrayTemplate } from '../../templates/custom-nodes/strings-array-nodes/strings-array-node/StringsArrayTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeAppender } from '../../node/NodeAppender';
import { NodeUtils } from '../../node/NodeUtils';

export class StringsArrayNode extends AbstractCustomNode {
    /**
     * @type {number}
     */
    public static ARRAY_RANDOM_LENGTH: number = 4;

    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {StringsArray}
     */
    private stringsArray: StringsArray;

    /**
     * @type {string}
     */
    private stringsArrayName: string;

    /**
     * @type {number}
     */
    private stringsArrayRotateValue: number;

    /**
     * @param stringsArray
     * @param stringsArrayName
     * @param stringsArrayRotateValue
     * @param options
     */
    constructor (
        stringsArray: StringsArray,
        stringsArrayName: string,
        stringsArrayRotateValue: number = 0,
        options: IOptions
    ) {
        super(options);

        this.stringsArray = stringsArray;
        this.stringsArrayName = stringsArrayName;
        this.stringsArrayRotateValue = stringsArrayRotateValue;
    }

    /**
     * @param blockScopeNode
     */
    public appendNode (blockScopeNode: TNodeWithBlockStatement): void {
        if (!this.stringsArray.getLength()) {
            return;
        }

        NodeAppender.prependNode(blockScopeNode, this.getNode());
    }

    /**
     * @returns {string}
     */
    public getNodeIdentifier (): string {
        return this.stringsArrayName;
    }

    /**
     * @returns {StringsArray}
     */
    public getNodeData (): StringsArray {
        return this.stringsArray;
    }

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        this.stringsArray.rotateArray(this.stringsArrayRotateValue);

        return super.getNode();
    }

    /**
     * @param data
     */
    public updateNodeData (data: string): void {
        this.stringsArray.addToArray(data);
    }

    /**
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(
            StringsArrayTemplate().formatUnicorn({
                stringsArrayName: this.stringsArrayName,
                stringsArray: this.stringsArray.toString()
            })
        );
    }
}
