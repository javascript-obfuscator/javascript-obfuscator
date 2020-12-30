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
import { DomainLockCodeHelper } from '../DomainLockCodeHelper';
import { NodeAppender } from '../../../node/NodeAppender';
import { NodeLexicalScopeUtils } from '../../../node/NodeLexicalScopeUtils';

@injectable()
export class DomainLockCustomCodeHelperGroup extends AbstractCustomCodeHelperGroup {
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
        if (!this.options.domainLock.length) {
            return;
        }

        const randomCallsGraphIndex: number = this.getRandomCallsGraphIndex(callsGraphData.length);

        const domainLockFunctionHostNode: TNodeWithStatements = callsGraphData.length
            ? NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex)
            : nodeWithStatements;
        const callsControllerHostNode: TNodeWithStatements = callsGraphData.length
            ? NodeAppender.getOptimalBlockScope(callsGraphData, randomCallsGraphIndex, 1)
            : nodeWithStatements;

        const domainLockFunctionLexicalScopeNode: TNodeWithLexicalScope | null = NodeLexicalScopeUtils
            .getLexicalScope(domainLockFunctionHostNode) ?? null;

        const domainLockFunctionName: string = domainLockFunctionLexicalScopeNode
            ? this.identifierNamesGenerator.generate(domainLockFunctionLexicalScopeNode)
            : this.identifierNamesGenerator.generateNext();
        const callsControllerFunctionName: string = domainLockFunctionLexicalScopeNode
            ? this.identifierNamesGenerator.generate(domainLockFunctionLexicalScopeNode)
            : this.identifierNamesGenerator.generateNext();

        // domainLock helper nodes append
        this.appendCustomNodeIfExist(
            CustomCodeHelper.DomainLock,
            (customCodeHelper: ICustomCodeHelper<TInitialData<DomainLockCodeHelper>>) => {
                customCodeHelper.initialize(callsControllerFunctionName, domainLockFunctionName);

                NodeAppender.prepend(domainLockFunctionHostNode, customCodeHelper.getNode());
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

        if (!this.options.domainLock.length) {
            return;
        }

        const domainLockCodeHelper: ICustomCodeHelper<TInitialData<DomainLockCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.DomainLock);
        const callsControllerFunctionCodeHelper: ICustomCodeHelper<TInitialData<CallsControllerFunctionCodeHelper>> =
            this.customCodeHelperFactory(CustomCodeHelper.CallsControllerFunction);

        this.customCodeHelpers.set(CustomCodeHelper.DomainLock, domainLockCodeHelper);
        this.customCodeHelpers.set(CustomCodeHelper.CallsControllerFunction, callsControllerFunctionCodeHelper);
    }
}
