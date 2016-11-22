import * as format from 'string-template';

import { TNodeWithBlockStatement } from '../../types/TNodeWithBlockStatement';
import { TStatement } from '../../types/TStatement';

import { ICustomNodeWithData } from '../../interfaces/custom-nodes/ICustomNodeWithData';
import { IOptions } from '../../interfaces/IOptions';
import { IStorage } from '../../interfaces/IStorage';

import { AppendState } from '../../enums/AppendState';

import { StringArrayTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-node/StringArrayTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeAppender } from '../../node/NodeAppender';
import { StringArrayStorage } from '../../storages/string-array/StringArrayStorage';

export class StringArrayNode extends AbstractCustomNode implements ICustomNodeWithData {
    /**
     * @type {number}
     */
    public static ARRAY_RANDOM_LENGTH: number = 4;

    /**
     * @type {AppendState}
     */
    protected appendState: AppendState = AppendState.AfterObfuscation;

    /**
     * @type {IStorage <string>}
     */
    private stringArray: IStorage <string>;

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
        stringArray: IStorage <string>,
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
        return format(StringArrayTemplate(), {
            stringArrayName: this.stringArrayName,
            stringArray: this.stringArray.toString()
        });
    }

    /**
     * @returns {IStorage <string>}
     */
    public getNodeData (): IStorage <string> {
        return this.stringArray;
    }

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        (<StringArrayStorage>this.stringArray).rotateArray(this.stringArrayRotateValue);

        return super.getNode();
    }
}
