import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICodeTransformer } from '../../../interfaces/code-transformers/ICodeTransformer';
import { ITransformerNamesGroupsBuilder } from '../../../interfaces/utils/ITransformerNamesGroupsBuilder';

import { CodeTransformer } from '../../../enums/code-transformers/CodeTransformer';

import { CodeTransformerNamesGroupsBuilder } from '../../../code-transformers/CodeTransformerNamesGroupsBuilder';
import { HashbangOperatorTransformer } from '../../../code-transformers/preparing-transformers/HashbangOperatorTransformer';

export const codeTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // code transformers factory
    bind<ICodeTransformer>(ServiceIdentifiers.Factory__ICodeTransformer)
        .toFactory<ICodeTransformer>(InversifyContainerFacade
            .getCacheFactory<CodeTransformer, ICodeTransformer>(ServiceIdentifiers.ICodeTransformer));

    // code transformer names groups builder
    bind<ITransformerNamesGroupsBuilder<CodeTransformer, ICodeTransformer>>(ServiceIdentifiers.ICodeTransformerNamesGroupsBuilder)
        .to(CodeTransformerNamesGroupsBuilder)
        .inSingletonScope();

    // preparing code transformers
    bind<ICodeTransformer>(ServiceIdentifiers.ICodeTransformer)
        .to(HashbangOperatorTransformer)
        .whenTargetNamed(CodeTransformer.HashbangOperatorTransformer);
});
