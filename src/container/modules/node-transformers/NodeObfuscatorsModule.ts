import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IObfuscatorReplacer } from '../../../interfaces/node-transformers/IObfuscatorReplacer';

import { NodeObfuscatorsReplacers } from '../../../enums/container/NodeObfuscatorsReplacers';

import { BooleanLiteralReplacer } from '../../../node-transformers/node-obfuscators/replacers/BooleanLiteralReplacer';
import { IdentifierReplacer } from '../../../node-transformers/node-obfuscators/replacers/IdentifierReplacer';
import { NumberLiteralReplacer } from '../../../node-transformers/node-obfuscators/replacers/NumberLiteralReplacer';
import { StringLiteralReplacer } from '../../../node-transformers/node-obfuscators/replacers/StringLiteralReplacer';

export const nodeObfuscatorsModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IObfuscatorReplacer>(ServiceIdentifiers.IObfuscatorReplacer)
        .to(BooleanLiteralReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.BooleanReplacer);

    bind<IObfuscatorReplacer>(ServiceIdentifiers.IObfuscatorReplacer)
        .to(IdentifierReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.IdentifierReplacer);

    bind<IObfuscatorReplacer>(ServiceIdentifiers.IObfuscatorReplacer)
        .to(NumberLiteralReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.NumberLiteralReplacer);

    bind<IObfuscatorReplacer>(ServiceIdentifiers.IObfuscatorReplacer)
        .to(StringLiteralReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.StringLiteralReplacer);

    bind<IObfuscatorReplacer>(ServiceIdentifiers['Factory<IObfuscatorReplacer>'])
        .toFactory<IObfuscatorReplacer>((context: interfaces.Context) => {
            const cache: Map <NodeObfuscatorsReplacers, IObfuscatorReplacer> = new Map();

            return (replacerName: NodeObfuscatorsReplacers) => {
                if (cache.has(replacerName)) {
                    return <IObfuscatorReplacer>cache.get(replacerName);
                }

                const obfuscationReplacer: IObfuscatorReplacer = context.container.getNamed<IObfuscatorReplacer>(
                    ServiceIdentifiers.IObfuscatorReplacer,
                    replacerName
                );

                cache.set(replacerName, obfuscationReplacer);

                return obfuscationReplacer;
            };
        });
});
