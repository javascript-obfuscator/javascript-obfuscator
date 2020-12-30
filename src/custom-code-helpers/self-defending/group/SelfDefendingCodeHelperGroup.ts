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
import { NodeTransformationStage } from '../../../enums/node-transformers/NodeTransformationStage';

import { AbstractCustomCodeHelperGroup } from '../../AbstractCustomCodeHelperGroup';
import { CallsControllerFunctionCodeHelper } from '../../calls-controller/CallsControllerFunctionCodeHelper';
import { NodeAppender } from '../../../node/NodeAppender';
import { NodeLexicalScopeUtils } from '../../../node/NodeLexicalScopeUtils';
import { SelfDefendingUnicodeCodeHelper } from '../SelfDefendingUnicodeCodeHelper';

@injectable()
export class SelfDefendingCodeHelperGroup extends AbstractCustomCodeHelperGroup {
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
    public appendOnPreparingStage (nodeWithStatements: TNodeWithStatements, callsGraphData: ICallsGraphData[]): void {
        if (!this.options.selfDefending) {
            return;
        }

        const randomCallsGraphIndex: number = this.getRandomCallsGraphIndex(callsGraphData.length);

        const selfDefendingFunctionHostNode: TNodeWithStatements = callsGraphData.length
            ? NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex)
            : nodeWithStatements;
        const callsControllerHostNode: TNodeWithStatements = callsGraphData.length
            ? NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex, 1)
            : nodeWithStatements;

        const selfDefendingFunctionLexicalScopeNode: TNodeWithLexicalScope | null = NodeLexicalScopeUtils
            .getLexicalScope(selfDefendingFunctionHostNode) ?? null;

        const selfDefendingFunctionName: string = selfDefendingFunctionLexicalScopeNode
            ? this.identifierNamesGenerator.generate(selfDefendingFunctionLexicalScopeNode)
            : this.identifierNamesGenerator.generateNext();
        const callsControllerFunctionName: string = selfDefendingFunctionLexicalScopeNode
            ? this.identifierNamesGenerator.generate(selfDefendingFunctionLexicalScopeNode)
            : this.identifierNamesGenerator.generateNext();

        // selfDefendingUnicode helper nodes append
        this.appendCustomNodeIfExist(
            CustomCodeHelper.SelfDefendingUnicode,
            (customCodeHelper: ICustomCodeHelper<TInitialData<SelfDefendingUnicodeCodeHelper>>) => {
                customCodeHelper.initialize(callsControllerFunctionName, selfDefendingFunctionName);

                NodeAppender.prepend(selfDefendingFunctionHostNode, customCodeHelper.getNode());
            }
        );

        // nodeCallsControllerFunction helper nodes append
        this.appendCustomNodeIfExist(
            CustomCodeHelper.CallsControllerFunction,
            (customCodeHelper: ICustomCodeHelper<TInitialData<CallsControllerFunctionCodeHelper>>) => {
                customCodeHelper.initialize(NodeTransformationStage.Preparing, callsControllerFunctionName);

                NodeAppender.prepend(callsControllerHostNode, customCodeHelper.getNode());
            }
        );
    }

    public initialize (): void {
        this.customCodeHelpers = new Map <CustomCodeHelper, ICustomCodeHelper>();

        if (!this.options.selfDefending) {
            return;
        }

        const selfDefendingUnicodeCodeHelper: ICustomCodeHelper<TInitialData<SelfDefendingUnicodeCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.SelfDefendingUnicode);
        const callsControllerFunctionCodeHelper: ICustomCodeHelper<TInitialData<CallsControllerFunctionCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.CallsControllerFunction);

        this.customCodeHelpers.set(CustomCodeHelper.SelfDefendingUnicode, selfDefendingUnicodeCodeHelper);
        this.customCodeHelpers.set(CustomCodeHelper.CallsControllerFunction, callsControllerFunctionCodeHelper);
    }
}
