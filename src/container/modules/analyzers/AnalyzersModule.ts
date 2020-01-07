import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICalleeDataExtractor } from '../../../interfaces/analyzers/calls-graph-analyzer/ICalleeDataExtractor';
import { ICallsGraphAnalyzer } from '../../../interfaces/analyzers/calls-graph-analyzer/ICallsGraphAnalyzer';

import { CalleeDataExtractor } from '../../../enums/analyzers/calls-graph-analyzer/CalleeDataExtractor';
import { CallsGraphAnalyzer } from '../../../analyzers/calls-graph-analyzer/CallsGraphAnalyzer';
import { FunctionDeclarationCalleeDataExtractor } from '../../../analyzers/calls-graph-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor';
import { FunctionExpressionCalleeDataExtractor } from '../../../analyzers/calls-graph-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor';
import { ObjectExpressionCalleeDataExtractor } from '../../../analyzers/calls-graph-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor';

export const analyzersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // calls graph analyzer
    bind<ICallsGraphAnalyzer>(ServiceIdentifiers.ICallsGraphAnalyzer)
        .to(CallsGraphAnalyzer)
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
