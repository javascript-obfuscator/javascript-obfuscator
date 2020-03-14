import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';
import { ITransformerNamesGroupsBuilder } from '../../../interfaces/utils/ITransformerNamesGroupsBuilder';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { NodeTransformerNamesGroupsBuilder } from '../../../node-transformers/NodeTransformerNamesGroupsBuilder';

export const nodeTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // node transformers factory
    bind<INodeTransformer>(ServiceIdentifiers.Factory__INodeTransformer)
        .toFactory<INodeTransformer>(InversifyContainerFacade
            .getCacheFactory<NodeTransformer, INodeTransformer>(ServiceIdentifiers.INodeTransformer));

    // node transformer names groups builder
    bind<ITransformerNamesGroupsBuilder<NodeTransformer, INodeTransformer>>(ServiceIdentifiers.INodeTransformerNamesGroupsBuilder)
        .to(NodeTransformerNamesGroupsBuilder)
        .inSingletonScope();
});
