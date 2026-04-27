import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, ContainerModuleLoadOptions, Factory } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICalleeDataExtractor } from '../../../interfaces/analyzers/calls-graph-analyzer/ICalleeDataExtractor';
import { ICallsGraphAnalyzer } from '../../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer';
import { INumberNumericalExpressionAnalyzer } from '../../../interfaces/analyzers/number-numerical-expression-analyzer/INumberNumericalExpressionAnalyzer';
import { IPrevailingKindOfVariablesAnalyzer } from '../../../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';
import { IScopeAnalyzer } from '../../../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';
import { IStringArrayStorageAnalyzer } from '../../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';

import { CalleeDataExtractor } from '../../../enums/analyzers/calls-graph-analyzer/CalleeDataExtractor';
import { CallsGraphAnalyzer } from '../../../analyzers/calls-graph-analyzer/CallsGraphAnalyzer';
import { FunctionDeclarationCalleeDataExtractor } from '../../../analyzers/calls-graph-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor';
import { FunctionExpressionCalleeDataExtractor } from '../../../analyzers/calls-graph-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor';
import { NumberNumericalExpressionAnalyzer } from '../../../analyzers/number-numerical-expression-analyzer/NumberNumericalExpressionAnalyzer';
import { ObjectExpressionCalleeDataExtractor } from '../../../analyzers/calls-graph-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor';
import { PrevailingKindOfVariablesAnalyzer } from '../../../analyzers/prevailing-kind-of-variables-analyzer/PrevailingKindOfVariablesAnalyzer';
import { ScopeAnalyzer } from '../../../analyzers/scope-analyzer/ScopeAnalyzer';
import { StringArrayStorageAnalyzer } from '../../../analyzers/string-array-storage-analyzer/StringArrayStorageAnalyzer';

export const analyzersModule: ContainerModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    // calls graph analyzer
    options.bind<ICallsGraphAnalyzer>(ServiceIdentifiers.ICallsGraphAnalyzer).to(CallsGraphAnalyzer).inSingletonScope();

    // number numerical expression analyzer
    options
        .bind<INumberNumericalExpressionAnalyzer>(ServiceIdentifiers.INumberNumericalExpressionAnalyzer)
        .to(NumberNumericalExpressionAnalyzer)
        .inSingletonScope();

    // prevailing kind of variables analyzer
    options
        .bind<IPrevailingKindOfVariablesAnalyzer>(ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)
        .to(PrevailingKindOfVariablesAnalyzer)
        .inSingletonScope();

    // scope analyzer
    options.bind<IScopeAnalyzer>(ServiceIdentifiers.IScopeAnalyzer).to(ScopeAnalyzer).inSingletonScope();

    // string array storage analyzer
    options
        .bind<IStringArrayStorageAnalyzer>(ServiceIdentifiers.IStringArrayStorageAnalyzer)
        .to(StringArrayStorageAnalyzer)
        .inSingletonScope();

    // callee data extractors
    options
        .bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(FunctionDeclarationCalleeDataExtractor)
        .whenNamed(CalleeDataExtractor.FunctionDeclarationCalleeDataExtractor);

    options
        .bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(FunctionExpressionCalleeDataExtractor)
        .whenNamed(CalleeDataExtractor.FunctionExpressionCalleeDataExtractor);

    options
        .bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(ObjectExpressionCalleeDataExtractor)
        .whenNamed(CalleeDataExtractor.ObjectExpressionCalleeDataExtractor);

    // callee data extractor factory
    options
        .bind<Factory<ICalleeDataExtractor, [CalleeDataExtractor]>>(ServiceIdentifiers.Factory__ICalleeDataExtractor)
        .toFactory(
            InversifyContainerFacade.getCacheFactory<CalleeDataExtractor, ICalleeDataExtractor>(
                ServiceIdentifiers.ICalleeDataExtractor
            )
        );
});
