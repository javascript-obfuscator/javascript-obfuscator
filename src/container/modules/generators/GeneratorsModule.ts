import { ContainerModule, ContainerModuleLoadOptions, ResolutionContext, Factory } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IIdentifierNamesGenerator } from '../../../interfaces/generators/identifier-names-generators/IIdentifierNamesGenerator';
import { IOptions } from '../../../interfaces/options/IOptions';

import { IdentifierNamesGenerator } from '../../../enums/generators/identifier-names-generators/IdentifierNamesGenerator';

import { DictionaryIdentifierNamesGenerator } from '../../../generators/identifier-names-generators/DictionaryIdentifierNamesGenerator';
import { HexadecimalIdentifierNamesGenerator } from '../../../generators/identifier-names-generators/HexadecimalIdentifierNamesGenerator';
import { MangledIdentifierNamesGenerator } from '../../../generators/identifier-names-generators/MangledIdentifierNamesGenerator';
import { MangledShuffledIdentifierNamesGenerator } from '../../../generators/identifier-names-generators/MangledShuffledIdentifierNamesGenerator';

export const generatorsModule: ContainerModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    // identifier name generators
    options
        .bind<IIdentifierNamesGenerator>(ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(DictionaryIdentifierNamesGenerator)
        .inSingletonScope()
        .whenNamed(IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator);

    options
        .bind<IIdentifierNamesGenerator>(ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(HexadecimalIdentifierNamesGenerator)
        .inSingletonScope()
        .whenNamed(IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator);

    options
        .bind<IIdentifierNamesGenerator>(ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(MangledIdentifierNamesGenerator)
        .inSingletonScope()
        .whenNamed(IdentifierNamesGenerator.MangledIdentifierNamesGenerator);

    options
        .bind<IIdentifierNamesGenerator>(ServiceIdentifiers.IIdentifierNamesGenerator)
        .to(MangledShuffledIdentifierNamesGenerator)
        .inSingletonScope()
        .whenNamed(IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator);

    // identifier name generator factory
    function identifierNameGeneratorFactory(): (
        context: ResolutionContext
    ) => (generatorOptions: IOptions) => IIdentifierNamesGenerator {
        let cachedIdentifierNamesGenerator: IIdentifierNamesGenerator | null = null;

        return (context: ResolutionContext): ((generatorOptions: IOptions) => IIdentifierNamesGenerator) =>
            (generatorOptions: IOptions): IIdentifierNamesGenerator => {
                if (cachedIdentifierNamesGenerator) {
                    return cachedIdentifierNamesGenerator;
                }

                let identifierNamesGenerator: IIdentifierNamesGenerator;

                switch (generatorOptions.identifierNamesGenerator) {
                    case IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator:
                        identifierNamesGenerator = context.get<IIdentifierNamesGenerator>(
                            ServiceIdentifiers.IIdentifierNamesGenerator,
                            { name: IdentifierNamesGenerator.DictionaryIdentifierNamesGenerator }
                        );

                        break;

                    case IdentifierNamesGenerator.MangledIdentifierNamesGenerator:
                        identifierNamesGenerator = context.get<IIdentifierNamesGenerator>(
                            ServiceIdentifiers.IIdentifierNamesGenerator,
                            { name: IdentifierNamesGenerator.MangledIdentifierNamesGenerator }
                        );

                        break;

                    case IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator:
                        identifierNamesGenerator = context.get<IIdentifierNamesGenerator>(
                            ServiceIdentifiers.IIdentifierNamesGenerator,
                            { name: IdentifierNamesGenerator.MangledShuffledIdentifierNamesGenerator }
                        );

                        break;

                    case IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator:
                    default:
                        identifierNamesGenerator = context.get<IIdentifierNamesGenerator>(
                            ServiceIdentifiers.IIdentifierNamesGenerator,
                            { name: IdentifierNamesGenerator.HexadecimalIdentifierNamesGenerator }
                        );
                }

                cachedIdentifierNamesGenerator = identifierNamesGenerator;

                return identifierNamesGenerator;
            };
    }
    options
        .bind<Factory<IIdentifierNamesGenerator, [IOptions]>>(ServiceIdentifiers.Factory__IIdentifierNamesGenerator)
        .toFactory(identifierNameGeneratorFactory());
});
