import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICalleeDataExtractor } from '../../../interfaces/stack-trace-analyzer/ICalleeDataExtractor';
import { IStackTraceAnalyzer } from '../../../interfaces/stack-trace-analyzer/IStackTraceAnalyzer';

import { CalleeDataExtractor } from '../../../enums/container/stack-trace-analyzer/CalleeDataExtractor';
import { FunctionDeclarationCalleeDataExtractor } from '../../../stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor';
import { FunctionExpressionCalleeDataExtractor } from '../../../stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor';
import { ObjectExpressionCalleeDataExtractor } from '../../../stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor';
import { StackTraceAnalyzer } from '../../../stack-trace-analyzer/StackTraceAnalyzer';

export const stackTraceAnalyzerModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
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

    // node transformers factory
    bind<ICalleeDataExtractor>(ServiceIdentifiers.Factory__ICalleeDataExtractor)
        .toFactory<ICalleeDataExtractor>(InversifyContainerFacade
            .getCacheFactory<CalleeDataExtractor, ICalleeDataExtractor>(
                ServiceIdentifiers.ICalleeDataExtractor
            ));
});
