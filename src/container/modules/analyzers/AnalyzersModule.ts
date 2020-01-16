import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICalleeDataExtractor } from '../../../interfaces/analyzers/calls-graph-analyzer/ICalleeDataExtractor';
import { ICallsGraphAnalyzer } from '../../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer';
import { IPrevailingKindOfVariablesAnalyzer } from '../../../interfaces/analyzers/calls-graph-analyzer/IPrevailingKindOfVariablesAnalyzer';
import { IScopeAnalyzer } from '../../../interfaces/analyzers/scope-analyzer/IScopeAnalyzer';
import { IStringArrayStorageAnalyzer } from '../../../interfaces/analyzers/string-array-storage-analyzer/IStringArrayStorageAnalyzer';

import { CalleeDataExtractor } from '../../../enums/analyzers/calls-graph-analyzer/CalleeDataExtractor';
import { CallsGraphAnalyzer } from '../../../analyzers/calls-graph-analyzer/CallsGraphAnalyzer';
import { FunctionDeclarationCalleeDataExtractor } from '../../../analyzers/calls-graph-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor';
import { FunctionExpressionCalleeDataExtractor } from '../../../analyzers/calls-graph-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor';
import { ObjectExpressionCalleeDataExtractor } from '../../../analyzers/calls-graph-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor';
import { PrevailingKindOfVariablesAnalyzer } from '../../../analyzers/prevailing-kind-of-variables-analyzer/PrevailingKindOfVariablesAnalyzer';
import { ScopeAnalyzer } from '../../../analyzers/scope-analyzer/ScopeAnalyzer';
import { StringArrayStorageAnalyzer } from '../../../analyzers/string-array-storage-analyzer/StringArrayStorageAnalyzer';

export const analyzersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // calls graph analyzer
    bind<ICallsGraphAnalyzer>(ServiceIdentifiers.ICallsGraphAnalyzer)
        .to(CallsGraphAnalyzer)
        .inSingletonScope();

    // prevailing kind of variables analyzer
    bind<IPrevailingKindOfVariablesAnalyzer>(ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer)
        .to(PrevailingKindOfVariablesAnalyzer)
        .inSingletonScope();

    // scope analyzer
    bind<IScopeAnalyzer>(ServiceIdentifiers.IScopeAnalyzer)
        .to(ScopeAnalyzer)
        .inSingletonScope();

    // string array storage analyzer
    bind<IStringArrayStorageAnalyzer>(ServiceIdentifiers.IStringArrayStorageAnalyzer)
        .to(StringArrayStorageAnalyzer)
        .inSingletonScope();

    // callee data extractors
    bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(FunctionDeclarationCalleeDataExtractor)
        .whenTargetNamed(CalleeDataExtractor.FunctionDeclarationCalleeDataExtractor);

    bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(FunctionExpressionCalleeDataExtractor)
        .whenTargetNamed(CalleeDataExtractor.FunctionExpressionCalleeDataExtractor);

    bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(ObjectExpressionCalleeDataExtractor)
        .whenTargetNamed(CalleeDataExtractor.ObjectExpressionCalleeDataExtractor);

    // callee data extractor factory
    bind<ICalleeDataExtractor>(ServiceIdentifiers.Factory__ICalleeDataExtractor)
        .toFactory<ICalleeDataExtractor>(InversifyContainerFacade
            .getCacheFactory<CalleeDataExtractor, ICalleeDataExtractor>(
                ServiceIdentifiers.ICalleeDataExtractor
            ));
});
