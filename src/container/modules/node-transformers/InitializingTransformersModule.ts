import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { CommentsTransformer } from '../../../node-transformers/initializing-transformers/CommentsTransformer';

export const initializingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // preparing transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(CommentsTransformer)
        .whenTargetNamed(NodeTransformer.CommentsTransformer);
});
