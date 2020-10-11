import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
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
import { MetadataTransformer } from '../../../node-transformers/preparing-transformers/MetadataTransformer';
import { ObfuscatingGuardsTransformer } from '../../../node-transformers/preparing-transformers/ObfuscatingGuardsTransformer';
import { ParentificationTransformer } from '../../../node-transformers/preparing-transformers/ParentificationTransformer';
import { ReservedStringObfuscatingGuard } from '../../../node-transformers/preparing-transformers/obfuscating-guards/ReservedStringObfuscatingGuard';
import { VariablePreserveTransformer } from '../../../node-transformers/preparing-transformers/VariablePreserveTransformer';

export const preparingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // preparing transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(CustomCodeHelpersTransformer)
        .whenTargetNamed(NodeTransformer.CustomCodeHelpersTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(EvalCallExpressionTransformer)
        .whenTargetNamed(NodeTransformer.EvalCallExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MetadataTransformer)
        .whenTargetNamed(NodeTransformer.MetadataTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ObfuscatingGuardsTransformer)
        .whenTargetNamed(NodeTransformer.ObfuscatingGuardsTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ParentificationTransformer)
        .whenTargetNamed(NodeTransformer.ParentificationTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(VariablePreserveTransformer)
        .whenTargetNamed(NodeTransformer.VariablePreserveTransformer);

    // obfuscating guards
    bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
        .to(BlackListObfuscatingGuard)
        .inSingletonScope()
        .whenTargetNamed(ObfuscatingGuard.BlackListObfuscatingGuard);

    bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
        .to(ConditionalCommentObfuscatingGuard)
        .inSingletonScope()
        .whenTargetNamed(ObfuscatingGuard.ConditionalCommentObfuscatingGuard);

    bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
        .to(ForceTransformStringObfuscatingGuard)
        .inSingletonScope()
        .whenTargetNamed(ObfuscatingGuard.ForceTransformStringObfuscatingGuard);

    bind<IObfuscatingGuard>(ServiceIdentifiers.INodeGuard)
        .to(ReservedStringObfuscatingGuard)
        .inSingletonScope()
        .whenTargetNamed(ObfuscatingGuard.ReservedStringObfuscatingGuard);

    // obfuscating guards factory
    bind<IObfuscatingGuard>(ServiceIdentifiers.Factory__INodeGuard)
        .toFactory<IObfuscatingGuard>(InversifyContainerFacade
            .getCacheFactory<ObfuscatingGuard, IObfuscatingGuard>(
                ServiceIdentifiers.INodeGuard
            ));
});
