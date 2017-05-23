import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IObfuscatingReplacer } from '../../../interfaces/node-transformers/IObfuscatingReplacer';

import { ObfuscationReplacers } from '../../../enums/container/ObfuscationReplacers';

import { BooleanLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/BooleanLiteralReplacer';
import { IdentifierReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierReplacer';
import { NumberLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/NumberLiteralReplacer';
import { StringLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/StringLiteralReplacer';

export const obfuscatingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscationReplacer)
        .to(BooleanLiteralReplacer)
        .whenTargetNamed(ObfuscationReplacers.BooleanReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscationReplacer)
        .to(IdentifierReplacer)
        .whenTargetNamed(ObfuscationReplacers.IdentifierReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscationReplacer)
        .to(NumberLiteralReplacer)
        .whenTargetNamed(ObfuscationReplacers.NumberLiteralReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscationReplacer)
        .to(StringLiteralReplacer)
        .whenTargetNamed(ObfuscationReplacers.StringLiteralReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.Factory__IObfuscationReplacer)
        .toFactory<IObfuscatingReplacer>((context: interfaces.Context) => {
            const cache: Map <ObfuscationReplacers, IObfuscatingReplacer> = new Map();

            return (replacerName: ObfuscationReplacers) => {
                if (cache.has(replacerName)) {
                    return <IObfuscatingReplacer>cache.get(replacerName);
                }

                const obfuscationReplacer: IObfuscatingReplacer = context.container.getNamed<IObfuscatingReplacer>(
                    ServiceIdentifiers.IObfuscationReplacer,
                    replacerName
                );

                cache.set(replacerName, obfuscationReplacer);

                return obfuscationReplacer;
            };
        });
});
