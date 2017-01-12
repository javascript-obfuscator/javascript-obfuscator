import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IObfuscationReplacer } from '../../../interfaces/node-transformers/IObfuscationReplacer';

import { NodeObfuscatorsReplacers } from '../../../enums/container/NodeObfuscationReplacers';

import { BooleanLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/replacers/BooleanLiteralReplacer';
import { IdentifierReplacer } from '../../../node-transformers/obfuscating-transformers/replacers/IdentifierReplacer';
import { NumberLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/replacers/NumberLiteralReplacer';
import { StringLiteralReplacer } from '../../../node-transformers/obfuscating-transformers/replacers/StringLiteralReplacer';

export const obfuscatingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IObfuscationReplacer>(ServiceIdentifiers.IObfuscatorReplacer)
        .to(BooleanLiteralReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.BooleanReplacer);

    bind<IObfuscationReplacer>(ServiceIdentifiers.IObfuscatorReplacer)
        .to(IdentifierReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.IdentifierReplacer);

    bind<IObfuscationReplacer>(ServiceIdentifiers.IObfuscatorReplacer)
        .to(NumberLiteralReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.NumberLiteralReplacer);

    bind<IObfuscationReplacer>(ServiceIdentifiers.IObfuscatorReplacer)
        .to(StringLiteralReplacer)
        .whenTargetNamed(NodeObfuscatorsReplacers.StringLiteralReplacer);

    bind<IObfuscationReplacer>(ServiceIdentifiers.Factory__IObfuscatorReplacer)
        .toFactory<IObfuscationReplacer>((context: interfaces.Context) => {
            const cache: Map <NodeObfuscatorsReplacers, IObfuscationReplacer> = new Map();

            return (replacerName: NodeObfuscatorsReplacers) => {
                if (cache.has(replacerName)) {
                    return <IObfuscationReplacer>cache.get(replacerName);
                }

                const obfuscationReplacer: IObfuscationReplacer = context.container.getNamed<IObfuscationReplacer>(
                    ServiceIdentifiers.IObfuscatorReplacer,
                    replacerName
                );

                cache.set(replacerName, obfuscationReplacer);

                return obfuscationReplacer;
            };
        });
});
