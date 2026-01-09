import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, ContainerModuleLoadOptions, Factory } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';
import { IObfuscatingGuard } from '../../../interfaces/node-transformers/preparing-transformers/obfuscating-guards/IObfuscatingGuard';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';
import { ObfuscatingGuard } from '../../../enums/node-transformers/preparing-transformers/obfuscating-guards/ObfuscatingGuard';

import { BlackListObfuscatingGuard } from '../../../node-transformers/preparing-transformers/obfuscating-guards/BlackListObfuscatingGuard';
import { ConditionalCommentObfuscatingGuard } from '../../../node-transformers/preparing-transformers/obfuscating-guards/ConditionalCommentObfuscatingGuard';
import { CustomCodeHelpersTransformer } from '../../../node-transformers/preparing-transformers/CustomCodeHelpersTransformer';
import { EvalCallExpressionTransformer } from '../../../node-transformers/preparing-transformers/EvalCallExpressionTransformer';
import { ForceTransformStringObfuscatingGuard } from '../../../node-transformers/preparing-transformers/obfuscating-guards/ForceTransformStringObfuscatingGuard';
import { IgnoredImportObfuscatingGuard } from '../../../node-transformers/preparing-transformers/obfuscating-guards/IgnoredImportObfuscatingGuard';
import { ImportMetaObfuscationGuard } from '../../../node-transformers/preparing-transformers/obfuscating-guards/ImportMetaObfuscationGuard';
import { ProcessEnvObfuscationGuard } from '../../../node-transformers/preparing-transformers/obfuscating-guards/ProcessEnvObfuscationGuard';
import { MetadataTransformer } from '../../../node-transformers/preparing-transformers/MetadataTransformer';
import { ObfuscatingGuardsTransformer } from '../../../node-transformers/preparing-transformers/ObfuscatingGuardsTransformer';
import { ParentificationTransformer } from '../../../node-transformers/preparing-transformers/ParentificationTransformer';
import { ReservedStringObfuscatingGuard } from '../../../node-transformers/preparing-transformers/obfuscating-guards/ReservedStringObfuscatingGuard';
import { VariablePreserveTransformer } from '../../../node-transformers/preparing-transformers/VariablePreserveTransformer';

export const preparingTransformersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        // preparing transformers
        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(CustomCodeHelpersTransformer)
            .whenNamed(NodeTransformer.CustomCodeHelpersTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(EvalCallExpressionTransformer)
            .whenNamed(NodeTransformer.EvalCallExpressionTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(MetadataTransformer)
            .whenNamed(NodeTransformer.MetadataTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(ObfuscatingGuardsTransformer)
            .whenNamed(NodeTransformer.ObfuscatingGuardsTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(ParentificationTransformer)
            .whenNamed(NodeTransformer.ParentificationTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(VariablePreserveTransformer)
            .whenNamed(NodeTransformer.VariablePreserveTransformer);

        // obfuscating guards
        options
            .bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
            .to(BlackListObfuscatingGuard)
            .inSingletonScope()
            .whenNamed(ObfuscatingGuard.BlackListObfuscatingGuard);

        options
            .bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
            .to(ConditionalCommentObfuscatingGuard)
            .inSingletonScope()
            .whenNamed(ObfuscatingGuard.ConditionalCommentObfuscatingGuard);

        options
            .bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
            .to(ForceTransformStringObfuscatingGuard)
            .inSingletonScope()
            .whenNamed(ObfuscatingGuard.ForceTransformStringObfuscatingGuard);

        options
            .bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
            .to(IgnoredImportObfuscatingGuard)
            .inSingletonScope()
            .whenNamed(ObfuscatingGuard.IgnoredImportObfuscatingGuard);

        options
            .bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
            .to(ImportMetaObfuscationGuard)
            .inSingletonScope()
            .whenNamed(ObfuscatingGuard.ImportMetaObfuscationGuard);

        options
            .bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
            .to(ProcessEnvObfuscationGuard)
            .inSingletonScope()
            .whenNamed(ObfuscatingGuard.ProcessEnvObfuscationGuard);

        options
            .bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
            .to(ReservedStringObfuscatingGuard)
            .inSingletonScope()
            .whenNamed(ObfuscatingGuard.ReservedStringObfuscatingGuard);

        // obfuscating guards factory
        options
            .bind<Factory<IObfuscatingGuard, [ObfuscatingGuard]>>(ServiceIdentifiers.Factory__INodeGuard)
            .toFactory(
                InversifyContainerFacade.getCacheFactory<ObfuscatingGuard, IObfuscatingGuard>(
                    ServiceIdentifiers.INodeGuard
                )
            );
    }
);
