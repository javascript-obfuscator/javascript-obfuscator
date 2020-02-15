import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomCodeHelperFactory } from '../../../types/container/custom-code-helpers/TCustomCodeHelperFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TInitialData } from '../../../types/TInitialData';
import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';

import { ICustomCodeHelper } from '../../../interfaces/custom-code-helpers/ICustomCodeHelper';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { ICallsGraphData } from '../../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';

import { initializable } from '../../../decorators/Initializable';

import { CustomCodeHelper } from '../../../enums/custom-code-helpers/CustomCodeHelper';
import { ObfuscationEvent } from '../../../enums/event-emitters/ObfuscationEvent';

import { AbstractCustomCodeHelperGroup } from '../../AbstractCustomCodeHelperGroup';
import { NodeAppender } from '../../../node/NodeAppender';
import { CallsControllerFunctionCodeHelper } from '../../calls-controller/CallsControllerFunctionCodeHelper';
import { SelfDefendingUnicodeCodeHelper } from '../SelfDefendingUnicodeCodeHelper';

@injectable()
export class SelfDefendingCodeHelperGroup extends AbstractCustomCodeHelperGroup {
    /**
     * @type {ObfuscationEvent}
     */
    protected appendEvent: ObfuscationEvent = ObfuscationEvent.AfterObfuscation;

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
     * @param {TCustomCodeHelperFactory} customCodeHelperFactory
     * @param {TIdentifierNamesGeneratorFactory} identifierNamesGeneratorFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__ICustomCodeHelper) customCodeHelperFactory: TCustomCodeHelperFactory,
        @inject(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
            identifierNamesGeneratorFactory: TIdentifierNamesGeneratorFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(identifierNamesGeneratorFactory, randomGenerator, options);

        this.customCodeHelperFactory = customCodeHelperFactory;
    }

    /**
     * @param {TNodeWithStatements} nodeWithStatements
     * @param {ICallsGraphData[]} callsGraphData
     */
    public appendNodes (nodeWithStatements: TNodeWithStatements, callsGraphData: ICallsGraphData[]): void {
        const randomCallsGraphIndex: number = this.getRandomCallsGraphIndex(callsGraphData.length);

        // selfDefendingUnicode helper nodes append
        this.appendCustomNodeIfExist(CustomCodeHelper.SelfDefendingUnicode, (customCodeHelper: ICustomCodeHelper) => {
            NodeAppender.appendToOptimalBlockScope(
                callsGraphData,
                nodeWithStatements,
                customCodeHelper.getNode(),
                randomCallsGraphIndex
            );
        });

        // nodeCallsControllerFunction helper nodes append
        this.appendCustomNodeIfExist(CustomCodeHelper.CallsControllerFunction, (customCodeHelper: ICustomCodeHelper) => {
            const targetNodeWithStatements: TNodeWithStatements = callsGraphData.length
                ? NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex, 1)
                : nodeWithStatements;

            NodeAppender.prepend(targetNodeWithStatements, customCodeHelper.getNode());
        });
    }

    public initialize (): void {
        this.customCodeHelpers = new Map <CustomCodeHelper, ICustomCodeHelper>();

        if (!this.options.selfDefending) {
            return;
        }

        const callsControllerFunctionName: string = this.identifierNamesGenerator.generate();

        const selfDefendingUnicodeCodeHelper: ICustomCodeHelper<TInitialData<SelfDefendingUnicodeCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.SelfDefendingUnicode);
        const nodeCallsControllerFunctionCodeHelper: ICustomCodeHelper<TInitialData<CallsControllerFunctionCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.CallsControllerFunction);

        selfDefendingUnicodeCodeHelper.initialize(callsControllerFunctionName);
        nodeCallsControllerFunctionCodeHelper.initialize(this.appendEvent, callsControllerFunctionName);

        this.customCodeHelpers.set(CustomCodeHelper.SelfDefendingUnicode, selfDefendingUnicodeCodeHelper);
        this.customCodeHelpers.set(CustomCodeHelper.CallsControllerFunction, nodeCallsControllerFunctionCodeHelper);
    }
}
