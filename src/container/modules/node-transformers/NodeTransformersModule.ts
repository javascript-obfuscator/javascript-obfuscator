import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, ContainerModuleLoadOptions, Factory } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';
import { ITransformerNamesGroupsBuilder } from '../../../interfaces/utils/ITransformerNamesGroupsBuilder';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { NodeTransformerNamesGroupsBuilder } from '../../../node-transformers/NodeTransformerNamesGroupsBuilder';

export const nodeTransformersModule: ContainerModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    // node transformers factory
    options
        .bind<Factory<INodeTransformer, [NodeTransformer]>>(ServiceIdentifiers.Factory__INodeTransformer)
        .toFactory(
            InversifyContainerFacade.getCacheFactory<NodeTransformer, INodeTransformer>(
                ServiceIdentifiers.INodeTransformer
            )
        );

    // node transformer names groups builder
    options
        .bind<
            ITransformerNamesGroupsBuilder<NodeTransformer, INodeTransformer>
        >(ServiceIdentifiers.INodeTransformerNamesGroupsBuilder)
        .to(NodeTransformerNamesGroupsBuilder)
        .inSingletonScope();
});
