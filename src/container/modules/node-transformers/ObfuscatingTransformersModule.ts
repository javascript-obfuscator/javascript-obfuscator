import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IObfuscationReplacer } from '../../../interfaces/node-transformers/IObfuscationReplacer';

import { ObfuscationReplacers } from '../../../enums/container/ObfuscationReplacers';

import { BooleanLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/replacers/BooleanLiteralReplacer';
import { IdentifierReplacer } from '../../../node-transformers/obfuscating-transformers/replacers/IdentifierReplacer';
import { NumberLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/replacers/NumberLiteralReplacer';
import { StringLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/replacers/StringLiteralReplacer';

export const obfuscatingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IObfuscationReplacer>(ServiceIdentifiers.IObfuscationReplacer)
        .to(BooleanLiteralReplacer)
        .whenTargetNamed(ObfuscationReplacers.BooleanReplacer);

    bind<IObfuscationReplacer>(ServiceIdentifiers.IObfuscationReplacer)
        .to(IdentifierReplacer)
        .whenTargetNamed(ObfuscationReplacers.IdentifierReplacer);

    bind<IObfuscationReplacer>(ServiceIdentifiers.IObfuscationReplacer)
        .to(NumberLiteralReplacer)
        .whenTargetNamed(ObfuscationReplacers.NumberLiteralReplacer);

    bind<IObfuscationReplacer>(ServiceIdentifiers.IObfuscationReplacer)
        .to(StringLiteralReplacer)
        .whenTargetNamed(ObfuscationReplacers.StringLiteralReplacer);

    bind<IObfuscationReplacer>(ServiceIdentifiers.Factory__IObfuscationReplacer)
        .toFactory<IObfuscationReplacer>((context: interfaces.Context) => {
            const cache: Map <ObfuscationReplacers, IObfuscationReplacer> = new Map();

            return (replacerName: ObfuscationReplacers) => {
                if (cache.has(replacerName)) {
                    return <IObfuscationReplacer>cache.get(replacerName);
                }

                const obfuscationReplacer: IObfuscationReplacer = context.container.getNamed<IObfuscationReplacer>(
                    ServiceIdentifiers.IObfuscationReplacer,
                    replacerName
                );

                cache.set(replacerName, obfuscationReplacer);

                return obfuscationReplacer;
            };
        });
});
