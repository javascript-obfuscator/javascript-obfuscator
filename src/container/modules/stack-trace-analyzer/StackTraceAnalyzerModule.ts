import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICalleeDataExtractor } from '../../../interfaces/stack-trace-analyzer/ICalleeDataExtractor';
import { IStackTraceAnalyzer } from '../../../interfaces/stack-trace-analyzer/IStackTraceAnalyzer';

import { FunctionDeclarationCalleeDataExtractor } from '../../../stack-trace-analyzer/callee-data-extractors/FunctionDeclarationCalleeDataExtractor';
import { FunctionExpressionCalleeDataExtractor } from '../../../stack-trace-analyzer/callee-data-extractors/FunctionExpressionCalleeDataExtractor';
import { ObjectExpressionCalleeDataExtractor } from '../../../stack-trace-analyzer/callee-data-extractors/ObjectExpressionCalleeDataExtractor';
import { StackTraceAnalyzer } from '../../../stack-trace-analyzer/StackTraceAnalyzer';
import { CalleeDataExtractors } from '../../../enums/container/CalleeDataExtractors';

export const stackTraceAnalyzerModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    const calleeDataExtractorsTag: string = 'calleeDataExtractors';

    // stack trace analyzer
    bind<IStackTraceAnalyzer>(ServiceIdentifiers.IStackTraceAnalyzer)
        .to(StackTraceAnalyzer)
        .inSingletonScope();

    // callee data extractors
    bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(FunctionDeclarationCalleeDataExtractor)
        .whenTargetTagged(calleeDataExtractorsTag, CalleeDataExtractors.FunctionDeclarationCalleeDataExtractor);

    bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(FunctionExpressionCalleeDataExtractor)
        .whenTargetTagged(calleeDataExtractorsTag, CalleeDataExtractors.FunctionExpressionCalleeDataExtractor);

    bind<ICalleeDataExtractor>(ServiceIdentifiers.ICalleeDataExtractor)
        .to(ObjectExpressionCalleeDataExtractor)
        .whenTargetTagged(calleeDataExtractorsTag, CalleeDataExtractors.ObjectExpressionCalleeDataExtractor);

    // node transformers factory
    bind<ICalleeDataExtractor>(ServiceIdentifiers['Factory<ICalleeDataExtractor>'])
        .toFactory<ICalleeDataExtractor>((context: interfaces.Context) => {
            const cache: Map <CalleeDataExtractors, ICalleeDataExtractor> = new Map <CalleeDataExtractors, ICalleeDataExtractor> ();

            return (calleeDataExtractorName: CalleeDataExtractors) => {
                if (cache.has(calleeDataExtractorName)) {
                    return <ICalleeDataExtractor>cache.get(calleeDataExtractorName);
                }

                const calleeDataExtractor: ICalleeDataExtractor = context.container.getTagged<ICalleeDataExtractor>(
                    ServiceIdentifiers.ICalleeDataExtractor,
                    calleeDataExtractorsTag,
                    calleeDataExtractorName
                );

                cache.set(calleeDataExtractorName, calleeDataExtractor);

                return calleeDataExtractor;
            };
        });
});
