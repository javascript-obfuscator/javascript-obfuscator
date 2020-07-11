import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../../container/ServiceIdentifiers';

import { TCustomCodeHelperFactory } from '../../../types/container/custom-code-helpers/TCustomCodeHelperFactory';
import { TIdentifierNamesGeneratorFactory } from '../../../types/container/generators/TIdentifierNamesGeneratorFactory';
import { TInitialData } from '../../../types/TInitialData';
import { TNodeWithLexicalScope } from '../../../types/node/TNodeWithLexicalScope';
import { TNodeWithStatements } from '../../../types/node/TNodeWithStatements';

import { ICustomCodeHelper } from '../../../interfaces/custom-code-helpers/ICustomCodeHelper';
import { IOptions } from '../../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../../interfaces/utils/IRandomGenerator';
import { ICallsGraphData } from '../../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphData';

import { initializable } from '../../../decorators/Initializable';

import { CustomCodeHelper } from '../../../enums/custom-code-helpers/CustomCodeHelper';
import { ObfuscationEvent } from '../../../enums/event-emitters/ObfuscationEvent';

import { AbstractCustomCodeHelperGroup } from '../../AbstractCustomCodeHelperGroup';
import { CallsControllerFunctionCodeHelper } from '../../calls-controller/CallsControllerFunctionCodeHelper';
import { DebugProtectionFunctionCodeHelper } from '../DebugProtectionFunctionCodeHelper';
import { DebugProtectionFunctionCallCodeHelper } from '../DebugProtectionFunctionCallCodeHelper';
import { DebugProtectionFunctionIntervalCodeHelper } from '../DebugProtectionFunctionIntervalCodeHelper';
import { NodeAppender } from '../../../node/NodeAppender';
import { NodeGuards } from '../../../node/NodeGuards';
import { NodeLexicalScopeUtils } from '../../../node/NodeLexicalScopeUtils';

@injectable()
export class DebugProtectionCodeHelperGroup extends AbstractCustomCodeHelperGroup {
    /**
     * @type {Map<CustomCodeHelper, ICustomCodeHelper>}
     */
    @initializable()
    protected customCodeHelpers!: Map <CustomCodeHelper, ICustomCodeHelper>;

    /**
     * @type {ObfuscationEvent}
     */
    protected readonly appendEvent: ObfuscationEvent = ObfuscationEvent.BeforeObfuscation;

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
        if (!this.options.debugProtection) {
            return;
        }

        const randomCallsGraphIndex: number = this.getRandomCallsGraphIndex(callsGraphData.length);

        const debugProtectionFunctionCallHostNode: TNodeWithStatements = callsGraphData.length
            ? NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex)
            : nodeWithStatements;
        const callsControllerHostNode: TNodeWithStatements = callsGraphData.length
            ? NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex, 1)
            : nodeWithStatements;

        const debugProtectionFunctionCallScopeNode: TNodeWithLexicalScope | null = NodeLexicalScopeUtils
            .getLexicalScope(debugProtectionFunctionCallHostNode) ?? null;

        const debugProtectionFunctionName: string = debugProtectionFunctionCallScopeNode
            ? this.identifierNamesGenerator.generate(debugProtectionFunctionCallScopeNode)
            : this.identifierNamesGenerator.generateNext();
        const callsControllerFunctionName: string = debugProtectionFunctionCallScopeNode
            ? this.identifierNamesGenerator.generate(debugProtectionFunctionCallScopeNode)
            : this.identifierNamesGenerator.generateNext();

        // debugProtectionFunctionCall helper nodes append
        this.appendCustomNodeIfExist(
            CustomCodeHelper.DebugProtectionFunctionCall,
            (customCodeHelper: ICustomCodeHelper<TInitialData<DebugProtectionFunctionCallCodeHelper>>) => {
                customCodeHelper.initialize(debugProtectionFunctionName, callsControllerFunctionName);

                NodeAppender.prepend(debugProtectionFunctionCallHostNode, customCodeHelper.getNode());
            }
        );

        // nodeCallsControllerFunction helper nodes append
        this.appendCustomNodeIfExist(
            CustomCodeHelper.CallsControllerFunction,
            (customCodeHelper: ICustomCodeHelper<TInitialData<CallsControllerFunctionCodeHelper>>) => {
                customCodeHelper.initialize(this.appendEvent, callsControllerFunctionName);

                NodeAppender.prepend(callsControllerHostNode, customCodeHelper.getNode());
            }
        );

        // debugProtectionFunction helper nodes append
        this.appendCustomNodeIfExist(
            CustomCodeHelper.DebugProtectionFunction,
                (customCodeHelper: ICustomCodeHelper<TInitialData<DebugProtectionFunctionCodeHelper>>) => {
                customCodeHelper.initialize(debugProtectionFunctionName);

                NodeAppender.append(nodeWithStatements, customCodeHelper.getNode());
            }
        );

        // debugProtectionFunctionInterval helper nodes append
        this.appendCustomNodeIfExist(
            CustomCodeHelper.DebugProtectionFunctionInterval,
            (customCodeHelper: ICustomCodeHelper<TInitialData<DebugProtectionFunctionIntervalCodeHelper>>) => {
                const programBodyLength: number = NodeGuards.isSwitchCaseNode(nodeWithStatements)
                    ? nodeWithStatements.consequent.length
                    : nodeWithStatements.body.length;
                const randomIndex: number = this.randomGenerator.getRandomInteger(0, programBodyLength);

                customCodeHelper.initialize(debugProtectionFunctionName);

                NodeAppender.insertAtIndex(nodeWithStatements, customCodeHelper.getNode(), randomIndex);
            }
        );
    }

    public initialize (): void {
        this.customCodeHelpers = new Map <CustomCodeHelper, ICustomCodeHelper>();

        if (!this.options.debugProtection) {
            return;
        }

        const debugProtectionFunctionCodeHelper: ICustomCodeHelper<TInitialData<DebugProtectionFunctionCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.DebugProtectionFunction);
        const debugProtectionFunctionCallCodeHelper: ICustomCodeHelper<TInitialData<DebugProtectionFunctionCallCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.DebugProtectionFunctionCall);
        const debugProtectionFunctionIntervalCodeHelper: ICustomCodeHelper<TInitialData<DebugProtectionFunctionIntervalCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.DebugProtectionFunctionInterval);
        const callsControllerFunctionCodeHelper: ICustomCodeHelper<TInitialData<CallsControllerFunctionCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.CallsControllerFunction);

        this.customCodeHelpers.set(CustomCodeHelper.DebugProtectionFunction, debugProtectionFunctionCodeHelper);
        this.customCodeHelpers.set(CustomCodeHelper.DebugProtectionFunctionCall, debugProtectionFunctionCallCodeHelper);

        if (this.options.debugProtectionInterval) {
            this.customCodeHelpers.set(CustomCodeHelper.DebugProtectionFunctionInterval, debugProtectionFunctionIntervalCodeHelper);
        }

        this.customCodeHelpers.set(CustomCodeHelper.CallsControllerFunction, callsControllerFunctionCodeHelper);
    }
}
