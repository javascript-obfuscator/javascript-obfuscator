import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IObfuscatingReplacer';

import { ObfuscatingReplacers } from '../../../enums/container/ObfuscatingReplacers';

import { BooleanLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/BooleanLiteralReplacer';
import { IdentifierReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierReplacer';
import { NumberLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/NumberLiteralReplacer';
import { StringLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/StringLiteralReplacer';

export const obfuscatingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(BooleanLiteralReplacer)
        .whenTargetNamed(ObfuscatingReplacers.BooleanReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(IdentifierReplacer)
        .whenTargetNamed(ObfuscatingReplacers.IdentifierReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(NumberLiteralReplacer)
        .whenTargetNamed(ObfuscatingReplacers.NumberLiteralReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(StringLiteralReplacer)
        .whenTargetNamed(ObfuscatingReplacers.StringLiteralReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.Factory__IObfuscatingReplacer)
        .toFactory<IObfuscatingReplacer>((context: interfaces.Context) => {
            const cache: Map <ObfuscatingReplacers, IObfuscatingReplacer> = new Map();

            return (replacerName: ObfuscatingReplacers) => {
                if (cache.has(replacerName)) {
                    return <IObfuscatingReplacer>cache.get(replacerName);
                }

                const obfuscationReplacer: IObfuscatingReplacer = context.container.getNamed<IObfuscatingReplacer>(
                    ServiceIdentifiers.IObfuscatingReplacer,
                    replacerName
                );

                cache.set(replacerName, obfuscationReplacer);

                return obfuscationReplacer;
            };
        });
});
