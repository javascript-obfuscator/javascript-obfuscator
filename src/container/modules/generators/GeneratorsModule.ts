import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IIdentifierNamesGenerator } from '../../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../../interfaces/options/IOptions';

import { IdentifierNamesGenerator } from '../../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { DictionaryIdentifierNamesGenerator } from '../../../generators/identifier-names-generators/DictionaryIdentifierNamesGenerator';
import { HexadecimalIdentifierNamesGenerator } from '../../../generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator';
import { MangledIdentifierNamesGenerator } from '../../../generators/identifier-names-generators/MangledIdentifierNamesGenerator';
import { MangledShuffledIdentifierNamesGenerator } from '../../../generators/identifier-names-generators/MangledShuffledIdentifierNamesGenerator';

export const generatorsModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // identifier name generators
    bind<IIdentifierNamesGenerator>(ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(DictionaryIdentifierNamesGenerator)
        .inSingletonScope()
        .whenTargetNamed(IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator);

    bind<IIdentifierNamesGenerator>(ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(HexadecimalIdentifierNamesGenerator)
        .inSingletonScope()
        .whenTargetNamed(IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator);

    bind<IIdentifierNamesGenerator>(ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(MangledIdentifierNamesGenerator)
        .inSingletonScope()
        .whenTargetNamed(IdentifierNamesGenerator.MangledIdentifierNamesGenerator);

    bind<IIdentifierNamesGenerator>(ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(MangledShuffledIdentifierNamesGenerator)
        .inSingletonScope()
        .whenTargetNamed(IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator);

    // identifier name generator factory
    function identifierNameGeneratorFactory (): (context: interfaces.Context) => (options: IOptions) => IIdentifierNamesGenerator {
        let cachedIdentifierNamesGenerator: IIdentifierNamesGenerator | null = null;

        return (context: interfaces.Context): (options: IOptions) => IIdentifierNamesGenerator => (options: IOptions): IIdentifierNamesGenerator => {
            if (cachedIdentifierNamesGenerator) {
                return cachedIdentifierNamesGenerator;
            }

            let identifierNamesGenerator: IIdentifierNamesGenerator;

            switch (options.identifierNamesGenerator) {
                case IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator:
                    identifierNamesGenerator = context.container.getNamed<IIdentifierNamesGenerator>(
                        ServiceIdentifiers.IIdentifierNamesGenerator,
                        IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator
                    );

                    break;

                case IdentifierNamesGenerator.MangledIdentifierNamesGenerator:
                    identifierNamesGenerator = context.container.getNamed<IIdentifierNamesGenerator>(
                        ServiceIdentifiers.IIdentifierNamesGenerator,
                        IdentifierNamesGenerator.MangledIdentifierNamesGenerator
                    );

                    break;

                case IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator:
                    identifierNamesGenerator = context.container.getNamed<IIdentifierNamesGenerator>(
                        ServiceIdentifiers.IIdentifierNamesGenerator,
                        IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator
                    );

                    break;

                case IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator:
                default:
                    identifierNamesGenerator = context.container.getNamed<IIdentifierNamesGenerator>(
                        ServiceIdentifiers.IIdentifierNamesGenerator,
                        IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator
                    );
            }

            cachedIdentifierNamesGenerator = identifierNamesGenerator;

            return identifierNamesGenerator;
        };
    }
    bind<IIdentifierNamesGenerator>(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
        .toFactory<IIdentifierNamesGenerator>(identifierNameGeneratorFactory());
});
