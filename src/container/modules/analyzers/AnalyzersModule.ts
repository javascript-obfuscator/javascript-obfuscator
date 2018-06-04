import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICalleeDataExtractor } from '../../../interfaces/analyzers/stack-trace-analyzer/ICalleeDataExtractor';
import { IStackTraceAnalyzer } from '../../../interfaces/analyzers/stack-trace-analyzer/IStackTraceAnalyzer';

import { CalleeDataExtractor } from '../../../enums/analyzers/stack-trace-analyzer/CalleeDataExtractor';
import { FunctionDeclarationCalleeDataExtractor } from '../../../analyzers/stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor';
import { FunctionExpressionCalleeDataExtractor } from '../../../analyzers/stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor';
import { ObjectExpressionCalleeDataExtractor } from '../../../analyzers/stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor';
import { StackTraceAnalyzer } from '../../../analyzers/stack-trace-analyzer/StackTraceAnalyzer';

export const analyzersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // stack trace analyzer
    bind<IStackTraceAnalyzer>(ServiceIdentifiers.IStackTraceAnalyzer)
        .to(StackTraceAnalyzer)
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
