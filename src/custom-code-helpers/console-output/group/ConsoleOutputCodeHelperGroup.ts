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
import { ConsoleOutputDisableCodeHelper } from '../ConsoleOutputDisableCodeHelper';
import { NodeAppender } from '../../../node/NodeAppender';
import { NodeLexicalScopeUtils } from '../../../node/NodeLexicalScopeUtils';
import { NodeGuards } from '../../../node/NodeGuards';

@injectable()
export class ConsoleOutputCodeHelperGroup extends AbstractCustomCodeHelperGroup {
    /**
     * @type {ObfuscationEvent}
     */
    protected readonly appendEvent: ObfuscationEvent = ObfuscationEvent.BeforeObfuscation;

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
        if (!this.options.disableConsoleOutput) {
            return;
        }

        const randomCallsGraphIndex: number = this.getRandomCallsGraphIndex(callsGraphData.length);

        const consoleOutputDisableHostNode: TNodeWithStatements = callsGraphData.length
            ? NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex)
            : nodeWithStatements;
        const callsControllerHostNode: TNodeWithStatements = callsGraphData.length
            ? NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex, 1)
            : nodeWithStatements;

        const consoleOutputDisableLexicalScopeNode: TNodeWithLexicalScope | null = NodeLexicalScopeUtils
            .getLexicalScope(consoleOutputDisableHostNode) ?? null;

        const consoleOutputDisableFunctionName: string = consoleOutputDisableLexicalScopeNode
            && NodeGuards.isProgramNode(consoleOutputDisableLexicalScopeNode)
            ? this.identifierNamesGenerator.generate(consoleOutputDisableLexicalScopeNode)
            : this.randomGenerator.getRandomString(5);
        const callsControllerFunctionName: string = consoleOutputDisableLexicalScopeNode
            && NodeGuards.isProgramNode(consoleOutputDisableLexicalScopeNode)
            ? this.identifierNamesGenerator.generate(consoleOutputDisableLexicalScopeNode)
            : this.randomGenerator.getRandomString(5);

        // consoleOutputDisableExpression helper nodes append
        this.appendCustomNodeIfExist(
            CustomCodeHelper.ConsoleOutputDisable,
            (customCodeHelper: ICustomCodeHelper<TInitialData<ConsoleOutputDisableCodeHelper>>) => {
                customCodeHelper.initialize(callsControllerFunctionName, consoleOutputDisableFunctionName);

                NodeAppender.prepend(consoleOutputDisableHostNode, customCodeHelper.getNode());
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
    }

    public initialize (): void {
        this.customCodeHelpers = new Map <CustomCodeHelper, ICustomCodeHelper>();

        if (!this.options.disableConsoleOutput) {
            return;
        }

        const consoleOutputDisableExpressionCodeHelper: ICustomCodeHelper<TInitialData<ConsoleOutputDisableCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.ConsoleOutputDisable);
        const callsControllerFunctionCodeHelper: ICustomCodeHelper<TInitialData<CallsControllerFunctionCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.CallsControllerFunction);

        this.customCodeHelpers.set(CustomCodeHelper.ConsoleOutputDisable, consoleOutputDisableExpressionCodeHelper);
        this.customCodeHelpers.set(CustomCodeHelper.CallsControllerFunction, callsControllerFunctionCodeHelper);
    }
}
