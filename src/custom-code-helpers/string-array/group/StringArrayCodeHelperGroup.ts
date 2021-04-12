import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomCodeHelperFactory } from '../../../types/container/custom-code-helpers/TCustomCodeHelperFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TInitialData } from '../../../types/TInitialData';
import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';
import { TStringArrayEncoding } from '../../../types/options/TStringArrayEncoding';

import { ICallsGraphData } from '../../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';
import { ICustomCodeHelper } from '../../../interfaces/custom-code-helpers/ICustomCodeHelper';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { IStringArrayStorage } from '../../../interfaces/storages/string-array-transformers/IStringArrayStorage';

import { initializable } from '../../../decorators/Initializable';

import { CustomCodeHelper } from '../../../enums/custom-code-helpers/CustomCodeHelper';
import { StringArrayEncoding } from '../../../enums/node-transformers/string-array-transformers/StringArrayEncoding';

import { AbstractCustomCodeHelperGroup } from '../../AbstractCustomCodeHelperGroup';
import { NodeAppender } from '../../../node/NodeAppender';
import { StringArrayCallsWrapperCodeHelper } from '../StringArrayCallsWrapperCodeHelper';
import { StringArrayCodeHelper } from '../StringArrayCodeHelper';
import { TStatement } from '../../../types/node/TStatement';

@injectable()
export class StringArrayCodeHelperGroup extends AbstractCustomCodeHelperGroup {
    /**
     * @type {Map<TStringArrayEncoding, CustomCodeHelper>}
     */
    private static readonly stringArrayCallsWrapperCodeHelperMap: Map<TStringArrayEncoding, CustomCodeHelper> = new Map([
        [StringArrayEncoding.None, CustomCodeHelper.StringArrayCallsWrapper],
        [StringArrayEncoding.Base64, CustomCodeHelper.StringArrayCallsWrapperBase64],
        [StringArrayEncoding.Rc4, CustomCodeHelper.StringArrayCallsWrapperRc4]
    ]);

    /**
     * @type {Map<CustomCodeHelper, ICustomCodeHelper>}
     */
    @initializable()
    protected customCodeHelpers!: Map <CustomCodeHelper, ICustomCodeHelper>;

    /**
     * @type {TCustomCodeHelperFactory}
     */
    private readonly customCodeHelperFactory: TCustomCodeHelperFactory;

    /**
     * @type {IStringArrayStorage}
     */
    private readonly stringArrayStorage: IStringArrayStorage;

    /**
     * @param {TCustomCodeHelperFactory} customCodeHelperFactory
     * @param {IStringArrayStorage} stringArrayStorage
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__ICustomCodeHelper) customCodeHelperFactory: TCustomCodeHelperFactory,
        @inject(ServiceIdentifiers.IStringArrayStorage) stringArrayStorage: IStringArrayStorage,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);

        this.customCodeHelperFactory = customCodeHelperFactory;
        this.stringArrayStorage = stringArrayStorage;
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {ICallsGraphData[]} callsGraphData
     */
    public appendOnFinalizingStage (nodeWithStatements: TNodeWithStatements, callsGraphData: ICallsGraphData[]): void {
        if (!this.stringArrayStorage.getLength()) {
            return;
        }

        // stringArray helper nodes append
        this.appendCustomNodeIfExist(
            CustomCodeHelper.StringArray,
            (customCodeHelper: ICustomCodeHelper<TInitialData<StringArrayCodeHelper>>) => {
                NodeAppender.prepend(nodeWithStatements, customCodeHelper.getNode());
            }
        );

        // stringArrayCallsWrapper helper nodes append
        const stringArrayEncodingsLength: number = this.options.stringArrayEncoding.length;
        // Stating from index 1 and forward. 0 index is reserved for string array itself.
        let randomIndex: number = 1;
        for (let i = 0; i < stringArrayEncodingsLength; i++, randomIndex++) {
            const stringArrayEncoding: TStringArrayEncoding = this.options.stringArrayEncoding[i];
            const stringArrayCallsWrapperCodeHelperName: CustomCodeHelper = this.getStringArrayCallsWrapperCodeHelperName(stringArrayEncoding);

            const scopeStatements: TStatement[] = NodeAppender.getScopeStatements(nodeWithStatements);
            randomIndex = this.randomGenerator.getRandomInteger(
                randomIndex,
                scopeStatements.length - 1
            );

            this.appendCustomNodeIfExist(
                stringArrayCallsWrapperCodeHelperName,
                (customCodeHelper: ICustomCodeHelper<TInitialData<StringArrayCallsWrapperCodeHelper>>) => {
                    NodeAppender.insertAtIndex(nodeWithStatements, customCodeHelper.getNode(), randomIndex);
                }
            );
        }
    }

    public initialize (): void {
        this.customCodeHelpers = new Map <CustomCodeHelper, ICustomCodeHelper>();

        if (!this.options.stringArray) {
            return;
        }

        // stringArray helper initialize
        const stringArrayCodeHelper: ICustomCodeHelper<TInitialData<StringArrayCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.StringArray);
        const stringArrayName: string = this.stringArrayStorage.getStorageName();

        stringArrayCodeHelper.initialize(this.stringArrayStorage, stringArrayName);
        this.customCodeHelpers.set(CustomCodeHelper.StringArray, stringArrayCodeHelper);

        // stringArrayCallsWrapper helper initialize
        for (const stringArrayEncoding of this.options.stringArrayEncoding) {
            const stringArrayCallsWrapperCodeHelperName: CustomCodeHelper = this.getStringArrayCallsWrapperCodeHelperName(stringArrayEncoding);
            const stringArrayCallsWrapperCodeHelper: ICustomCodeHelper<TInitialData<StringArrayCallsWrapperCodeHelper>> =
                this.customCodeHelperFactory(stringArrayCallsWrapperCodeHelperName);
            const stringArrayCallsWrapperName: string = this.stringArrayStorage.getStorageCallsWrapperName(stringArrayEncoding);
            stringArrayCallsWrapperCodeHelper.initialize(
                stringArrayName,
                stringArrayCallsWrapperName,
                this.stringArrayStorage.getIndexShiftAmount()
            );

            this.customCodeHelpers.set(stringArrayCallsWrapperCodeHelperName, stringArrayCallsWrapperCodeHelper);
        }
    }

    /**
     * @param {TStringArrayEncoding} stringArrayEncoding
     * @returns {CustomCodeHelper}
     */
    private getStringArrayCallsWrapperCodeHelperName (stringArrayEncoding: TStringArrayEncoding): CustomCodeHelper {
        return StringArrayCodeHelperGroup
                .stringArrayCallsWrapperCodeHelperMap.get(stringArrayEncoding)
            ?? CustomCodeHelper.StringArrayCallsWrapper;
    }
}
