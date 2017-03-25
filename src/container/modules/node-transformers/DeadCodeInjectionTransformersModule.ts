import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IDeadCodeInjectionReplacer } from '../../../interfaces/node-transformers/IDeadCodeInjectionReplacer';
import { IfStatementDeadCodeInjectionReplacer } from '../../../node-transformers/dead-code-injection-transformers/dead-code-injection-replacers/IfStatementDeadCodeInjectionReplacer';

import { DeadCodeInjectionReplacers } from '../../../enums/container/DeadCodeInjectionReplacers';

export const deadCodeInjectionTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IDeadCodeInjectionReplacer>(ServiceIdentifiers.IDeadCodeInjectionReplacer)
        .to(IfStatementDeadCodeInjectionReplacer)
        .whenTargetNamed(DeadCodeInjectionReplacers.IfStatementDeadCodeInjectionReplacer);

    bind<IDeadCodeInjectionReplacer>(ServiceIdentifiers.Factory__IDeadCodeInjectionReplacer)
        .toFactory<IDeadCodeInjectionReplacer>((context: interfaces.Context) => {
            const cache: Map <DeadCodeInjectionReplacers, IDeadCodeInjectionReplacer> = new Map();

            return (replacerName: DeadCodeInjectionReplacers) => {
                if (cache.has(replacerName)) {
                    return <IDeadCodeInjectionReplacer>cache.get(replacerName);
                }

                const deadCodeInjectionReplacer: IDeadCodeInjectionReplacer = context.container.getNamed<IDeadCodeInjectionReplacer>(
                    ServiceIdentifiers.IDeadCodeInjectionReplacer,
                    replacerName
                );

                cache.set(replacerName, deadCodeInjectionReplacer);

                return deadCodeInjectionReplacer;
            };
        });
});
