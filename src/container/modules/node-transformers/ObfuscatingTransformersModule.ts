import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IIdentifierObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IIdentifierObfuscatingReplacer';
import { IObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IObfuscatingReplacer';

import { IdentifierObfuscatingReplacers } from '../../../enums/container/node-transformers/IdentifierObfuscatingReplacers';
import { LiteralObfuscatingReplacers } from '../../../enums/container/node-transformers/LiteralObfuscatingReplacers';

import { BooleanLiteralObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer';
import { IdentifierObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/IdentifierObfuscatingReplacer';
import { NumberLiteralObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer';
import { StringLiteralObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer';

export const obfuscatingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // literal obfuscating replacers
    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(BooleanLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacers.BooleanLiteralObfuscatingReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(NumberLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacers.NumberLiteralObfuscatingReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(StringLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacers.StringLiteralObfuscatingReplacer);

    // identifier obfuscating replacers
    bind<IIdentifierObfuscatingReplacer>(ServiceIdentifiers.IIdentifierObfuscatingReplacer)
        .to(IdentifierObfuscatingReplacer)
        .whenTargetNamed(IdentifierObfuscatingReplacers.IdentifierObfuscatingReplacer);

    // literal obfuscating replacer factory
    bind<IObfuscatingReplacer>(ServiceIdentifiers.Factory__IObfuscatingReplacer)
        .toFactory<IObfuscatingReplacer>((context: interfaces.Context) => {
            const cache: Map <LiteralObfuscatingReplacers, IObfuscatingReplacer> = new Map();

            return (replacerName: LiteralObfuscatingReplacers) => {
                if (cache.has(replacerName)) {
                    return <IObfuscatingReplacer>cache.get(replacerName);
                }

                const replacer: IObfuscatingReplacer = context.container.getNamed<IObfuscatingReplacer>(
                    ServiceIdentifiers.IObfuscatingReplacer,
                    replacerName
                );

                cache.set(replacerName, replacer);

                return replacer;
            };
        });

    // identifier obfuscating replacer factory
    bind<IIdentifierObfuscatingReplacer>(ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)
        .toFactory<IIdentifierObfuscatingReplacer>((context: interfaces.Context) => {
            const cache: Map <IdentifierObfuscatingReplacers, IIdentifierObfuscatingReplacer> = new Map();

            return (replacerName: IdentifierObfuscatingReplacers) => {
                if (cache.has(replacerName)) {
                    return <IIdentifierObfuscatingReplacer>cache.get(replacerName);
                }

                const replacer: IIdentifierObfuscatingReplacer = context.container.getNamed<IIdentifierObfuscatingReplacer>(
                    ServiceIdentifiers.IIdentifierObfuscatingReplacer,
                    replacerName
                );

                cache.set(replacerName, replacer);

                return replacer;
            };
        });
});
