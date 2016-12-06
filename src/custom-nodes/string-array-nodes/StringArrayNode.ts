import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TStatement } from '../../types/node/TStatement';

import { ICustomNodeWithData } from '../../interfaces/custom-nodes/ICustomNodeWithData';
import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

import { initializable } from '../../decorators/Initializable';

import { StringArrayTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-node/StringArrayTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { StringArrayStorage } from '../../storages/string-array/StringArrayStorage';

@injectable()
export class StringArrayNode extends AbstractCustomNode implements ICustomNodeWithData {
    /**
     * @type {number}
     */
    public static ARRAY_RANDOM_LENGTH: number = 4;

    /**
     * @type {IStorage <string>}
     */
    @initializable()
    private stringArray: IStorage <string>;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayName: string;

    /**
     * @type {number}
     */
    @initializable()
    private stringArrayRotateValue: number;

    /**
     * @param options
     */
    constructor (
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(options);
    }

    /**
     * @param stringArray
     * @param stringArrayName
     * @param stringArrayRotateValue
     */
    public initialize (
        stringArray: IStorage <string>,
        stringArrayName: string,
        stringArrayRotateValue: number
    ): void {
        this.stringArray = stringArray;
        this.stringArrayName = stringArrayName;
        this.stringArrayRotateValue = stringArrayRotateValue;
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
