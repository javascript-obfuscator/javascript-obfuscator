import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import format from 'string-template';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';
import { TStringArrayStorage } from '../../types/storages/TStringArrayStorage';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';

import { initializable } from '../../decorators/Initializable';

import { StringArrayTemplate } from '../../templates/string-array-nodes/string-array-node/StringArrayTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';
import { StringArrayStorage } from '../../storages/string-array/StringArrayStorage';

@injectable()
export class StringArrayNode extends AbstractCustomNode {
    /**
     * @type {TStringArrayStorage}
     */
    @initializable()
    private stringArrayStorage!: TStringArrayStorage;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayName!: string;

    /**
     * @type {number}
     */
    @initializable()
    private stringArrayRotateValue!: number;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);
    }

    /**
     * @param {TStringArrayStorage} stringArrayStorage
     * @param {string} stringArrayName
     * @param {number} stringArrayRotateValue
     */
    public initialize (
        stringArrayStorage: TStringArrayStorage,
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
     * @returns {TStatement[]}
     */
    protected getNodeStructure (): TStatement[] {
        return NodeUtils.convertCodeToStructure(this.getTemplate());
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
