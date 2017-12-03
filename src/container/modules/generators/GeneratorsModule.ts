import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IIdentifierNameGenerator } from '../../../interfaces/generators/identifier-name-generators/IIdentifierNameGenerator';
import { IOptions } from '../../../interfaces/options/IOptions';

import { IdentifierNameGenerator } from '../../../enums/generators/identifier-name-generators/IdentifierNameGenerator';

import { HexadecimalIdentifierNameGenerator } from '../../../generators/identifier-name-generators/HexadecimalIdentifierNameGenerator';
import { MangledIdentifierNameGenerator } from '../../../generators/identifier-name-generators/MangledIdentifierNameGenerator';

export const generatorsModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // identifier name generators
    bind<IIdentifierNameGenerator>(ServiceIdentifiers.IIdentifierNameGenerator)
        .to(HexadecimalIdentifierNameGenerator)
        .inSingletonScope()
        .whenTargetNamed(IdentifierNameGenerator.HexadecimalIdentifierNameGenerator);

    bind<IIdentifierNameGenerator>(ServiceIdentifiers.IIdentifierNameGenerator)
        .to(MangledIdentifierNameGenerator)
        .inSingletonScope()
        .whenTargetNamed(IdentifierNameGenerator.MangledIdentifierNameGenerator);

    // identifier name generator factory
    bind<IIdentifierNameGenerator>(ServiceIdentifiers.Factory__IIdentifierNameGenerator)
        .toFactory<IIdentifierNameGenerator>((context: interfaces.Context): (options: IOptions) => IIdentifierNameGenerator => {
            const cache: Map <boolean, IIdentifierNameGenerator> = new Map();

            return (options: IOptions) => {
                if (cache.has(options.mangle)) {
                    return <IIdentifierNameGenerator>cache.get(options.mangle);
                }

                let identifierNameGenerator: IIdentifierNameGenerator;

                switch (options.mangle) {
                    case true:
                        identifierNameGenerator = context.container.getNamed<IIdentifierNameGenerator>(
                            ServiceIdentifiers.IIdentifierNameGenerator,
                            IdentifierNameGenerator.MangledIdentifierNameGenerator
                        );

                        break;

                    case false:
                    default:
                        identifierNameGenerator = context.container.getNamed<IIdentifierNameGenerator>(
                            ServiceIdentifiers.IIdentifierNameGenerator,
                            IdentifierNameGenerator.HexadecimalIdentifierNameGenerator
                        );
                }

                cache.set(options.mangle, identifierNameGenerator);

                return identifierNameGenerator;
            };
        });
});
