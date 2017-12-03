import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as format from 'string-template';

import { TIdentifierNameGeneratorFactory } from '../../types/container/generators/TIdentifierNameGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IStorage } from '../../interfaces/storages/IStorage';

import { initializable } from '../../decorators/Initializable';

import { StringArrayTemplate } from '../../templates/string-array-nodes/string-array-node/StringArrayTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';
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
     * @param {TIdentifierNameGeneratorFactory} identifierNameGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNameGenerator)
            identifierNameGeneratorFactory: TIdentifierNameGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNameGeneratorFactory, randomGenerator, options);
    }

    /**
     * @param {IStorage<string>} stringArrayStorage
     * @param {string} stringArrayName
     * @param {number} stringArrayRotateValue
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
