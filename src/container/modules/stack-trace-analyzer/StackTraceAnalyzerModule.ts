import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICalleeDataExtractor } from '../../../interfaces/stack-trace-analyzer/ICalleeDataExtractor';
import { IStackTraceAnalyzer } from '../../../interfaces/stack-trace-analyzer/IStackTraceAnalyzer';

import { CalleeDataExtractors } from '../../../enums/container/CalleeDataExtractors';
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
        .whenTargetNamed(CalleeDataExtractors.FunctionDeclarationCalleeDataExtractor);

    bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(FunctionExpressionCalleeDataExtractor)
        .whenTargetNamed(CalleeDataExtractors.FunctionExpressionCalleeDataExtractor);

    bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(ObjectExpressionCalleeDataExtractor)
        .whenTargetNamed(CalleeDataExtractors.ObjectExpressionCalleeDataExtractor);

    // node transformers factory
    bind<ICalleeDataExtractor>(ServiceIdentifiers.Factory__ICalleeDataExtractor)
        .toFactory<ICalleeDataExtractor>((context: interfaces.Context) => {
            const cache: Map <CalleeDataExtractors, ICalleeDataExtractor> = new Map();

            return (calleeDataExtractorName: CalleeDataExtractors) => {
                if (cache.has(calleeDataExtractorName)) {
                    return <ICalleeDataExtractor>cache.get(calleeDataExtractorName);
                }

                const calleeDataExtractor: ICalleeDataExtractor = context.container.getNamed<ICalleeDataExtractor>(
                    ServiceIdentifiers.ICalleeDataExtractor,
                    calleeDataExtractorName
                );

                cache.set(calleeDataExtractorName, calleeDataExtractor);

                return calleeDataExtractor;
            };
        });
});
