import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IIdentifierObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IIdentifierObfuscatingReplacer';
import { IObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/IObfuscatingReplacer';

import { IdentifierObfuscatingReplacer } from '../../../enums/container/node-transformers/IdentifierObfuscatingReplacer';
import { LiteralObfuscatingReplacer } from '../../../enums/container/node-transformers/LiteralObfuscatingReplacer';

import { BaseIdentifierObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer';
import { BooleanLiteralObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer';
import { NumberLiteralObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer';
import { StringLiteralObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer';

export const obfuscatingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // literal obfuscating replacers
    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(BooleanLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(NumberLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(StringLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacer.StringLiteralObfuscatingReplacer);

    // identifier obfuscating replacers
    bind<IIdentifierObfuscatingReplacer>(ServiceIdentifiers.IIdentifierObfuscatingReplacer)
        .to(BaseIdentifierObfuscatingReplacer)
        .whenTargetNamed(IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);

    // literal obfuscating replacer factory
    bind<IObfuscatingReplacer>(ServiceIdentifiers.Factory__IObfuscatingReplacer)
        .toFactory<IObfuscatingReplacer>(InversifyContainerFacade
            .getCacheFactory<LiteralObfuscatingReplacer, IObfuscatingReplacer>(
                ServiceIdentifiers.IObfuscatingReplacer
            ));

    // identifier obfuscating replacer factory
    bind<IIdentifierObfuscatingReplacer>(ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)
        .toFactory<IIdentifierObfuscatingReplacer>(InversifyContainerFacade
            .getCacheFactory<IdentifierObfuscatingReplacer, IIdentifierObfuscatingReplacer>(
                ServiceIdentifiers.IIdentifierObfuscatingReplacer
            ));
});
