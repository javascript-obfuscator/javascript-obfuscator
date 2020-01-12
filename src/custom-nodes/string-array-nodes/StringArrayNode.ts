import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import { TIdentifierNamesGeneratorFactory } from '../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TStatement } from '../../types/node/TStatement';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { ICustomNodeFormatter } from '../../interfaces/custom-nodes/ICustomNodeFormatter';
import { IStringArrayStorage } from '../../interfaces/storages/string-array-storage/IStringArrayStorage';

import { initializable } from '../../decorators/Initializable';

import { StringArrayTemplate } from '../../templates/string-array-nodes/string-array-node/StringArrayTemplate';

import { AbstractCustomNode } from '../AbstractCustomNode';
import { NodeUtils } from '../../node/NodeUtils';

@injectable()
export class StringArrayNode extends AbstractCustomNode {
    /**
     * @type {IStringArrayStorage}
     */
    @initializable()
    private stringArrayStorage!: IStringArrayStorage;

    /**
     * @type {string}
     */
    @initializable()
    private stringArrayName!: string;

    /**
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {ICustomNodeFormatter} customNodeFormatter
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    constructor (
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.ICustomNodeFormatter) customNodeFormatter: ICustomNodeFormatter,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, customNodeFormatter, randomGenerator, options);
    }

    /**
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {string} stringArrayName
     */
    public initialize (
        stringArrayStorage: IStringArrayStorage,
        stringArrayName: string
    ): void {
        this.stringArrayStorage = stringArrayStorage;
        this.stringArrayName = stringArrayName;
    }

    /**
     * @param {string} nodeTemplate
     * @returns {TStatement[]}
     */
    protected getNodeStructure (nodeTemplate: string): TStatement[] {
        return NodeUtils.convertCodeToStructure(nodeTemplate);
    }

    /**
     * @returns {string}
     */
    protected getNodeTemplate (): string {
        return this.customNodeFormatter.formatTemplate(StringArrayTemplate(), {
            stringArrayName: this.stringArrayName,
            stringArray: this.stringArrayStorage.toString()
        });
    }
}
