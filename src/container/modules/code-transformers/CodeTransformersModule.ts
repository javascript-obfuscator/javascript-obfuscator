import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, ContainerModuleLoadOptions, Factory } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICodeTransformer } from '../../../interfaces/code-transformers/ICodeTransformer';
import { ITransformerNamesGroupsBuilder } from '../../../interfaces/utils/ITransformerNamesGroupsBuilder';

import { CodeTransformer } from '../../../enums/code-transformers/CodeTransformer';

import { CodeTransformerNamesGroupsBuilder } from '../../../code-transformers/CodeTransformerNamesGroupsBuilder';
import { HashbangOperatorTransformer } from '../../../code-transformers/preparing-transformers/HashbangOperatorTransformer';

export const codeTransformersModule: ContainerModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    // code transformers factory
    options
        .bind<Factory<ICodeTransformer, [CodeTransformer]>>(ServiceIdentifiers.Factory__ICodeTransformer)
        .toFactory(
            InversifyContainerFacade.getCacheFactory<CodeTransformer, ICodeTransformer>(
                ServiceIdentifiers.ICodeTransformer
            )
        );

    // code transformer names groups builder
    options
        .bind<
            ITransformerNamesGroupsBuilder<CodeTransformer, ICodeTransformer>
        >(ServiceIdentifiers.ICodeTransformerNamesGroupsBuilder)
        .to(CodeTransformerNamesGroupsBuilder)
        .inSingletonScope();

    // preparing code transformers
    options
        .bind<ICodeTransformer>(ServiceIdentifiers.ICodeTransformer)
        .to(HashbangOperatorTransformer)
        .whenNamed(CodeTransformer.HashbangOperatorTransformer);
});
