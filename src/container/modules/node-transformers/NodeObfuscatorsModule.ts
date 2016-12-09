import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IReplacer } from '../../../interfaces/node-transformers/IReplacer';

import { NodeObfuscatorsReplacers } from '../../../enums/container/NodeObfuscatorsReplacers';

import { BooleanLiteralReplacer } from '../../../node-transformers/node-obfuscators/replacers/BooleanLiteralReplacer';
import { IdentifierReplacer } from '../../../node-transformers/node-obfuscators/replacers/IdentifierReplacer';
import { NumberLiteralReplacer } from '../../../node-transformers/node-obfuscators/replacers/NumberLiteralReplacer';
import { StringLiteralReplacer } from '../../../node-transformers/node-obfuscators/replacers/StringLiteralReplacer';

export const nodeObfuscatorsModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IReplacer>(ServiceIdentifiers.IReplacer)
        .to(BooleanLiteralReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.BooleanReplacer);

    bind<IReplacer>(ServiceIdentifiers.IReplacer)
        .to(IdentifierReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.IdentifierReplacer);

    bind<IReplacer>(ServiceIdentifiers.IReplacer)
        .to(NumberLiteralReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.NumberLiteralReplacer);

    bind<IReplacer>(ServiceIdentifiers.IReplacer)
        .to(StringLiteralReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.StringLiteralReplacer);

    bind<IReplacer>(ServiceIdentifiers['Factory<IReplacer>'])
        .toFactory<IReplacer>((context: interfaces.Context) => {
            const cache: Map <NodeObfuscatorsReplacers, IReplacer> = new Map <NodeObfuscatorsReplacers, IReplacer> ();

            return (replacerName: NodeObfuscatorsReplacers) => {
                if (cache.has(replacerName)) {
                    return <IReplacer>cache.get(replacerName);
                }

                const obfuscationReplacer: IReplacer = context.container.getNamed<IReplacer>(
                    ServiceIdentifiers.IReplacer,
                    replacerName
                );

                cache.set(replacerName, obfuscationReplacer);

                return obfuscationReplacer;
            };
        });
});
