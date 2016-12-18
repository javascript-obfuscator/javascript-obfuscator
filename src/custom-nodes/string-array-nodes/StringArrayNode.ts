import { injectable, inject } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IStorage } from '../../interfaces/storages/IStorage';

import { initializable } from '../../decorators/Initializable';

import { StringArrayTemplate } from '../../templates/custom-nodes/string-array-nodes/string-array-node/StringArrayTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { StringArrayStorage } from '../../storages/string-array/StringArrayStorage';

@injectable()
export class StringArrayNode extends AbstractCustomNode {
    /**
     * @type {IStorage <string>}
     */
    @initializable()
    private stringArrayStorage: IStorage <string>;

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
     * @param stringArrayStorage
     * @param stringArrayName
     * @param stringArrayRotateValue
     */
    public initialize (
        stringArrayStorage: IStorage <string>,
        stringArrayName: string,
        stringArrayRotateValue: number
    ): void {
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayName = stringArrayName;
        this.stringArrayRotateValue = stringArrayRotateValue;
    }

    /**
     * @returns {TStatement[]}
     */
    public getNode (): TStatement[] {
        (<StringArrayStorage>this.stringArrayStorage).rotateArray(this.stringArrayRotateValue);

        return super.getNode();
    }

    /**
     * @returns {string}
     */
    protected getTemplate (): string {
        return format(StringArrayTemplate(), {
            stringArrayName: this.stringArrayName,
            stringArray: this.stringArrayStorage.toString()
        });
    }
}
