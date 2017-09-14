import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

export const nodeTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // node transformers factory
    bind<INodeTransformer>(ServiceIdentifiers.Factory__INodeTransformer)
        .toFactory<INodeTransformer>(InversifyContainerFacade
            .getCacheFactory<NodeTransformer, INodeTransformer>(ServiceIdentifiers.INodeTransformer));
});
