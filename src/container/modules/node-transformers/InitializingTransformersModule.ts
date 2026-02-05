import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { CommentsTransformer } from '../../../node-transformers/initializing-transformers/CommentsTransformer';

export const initializingTransformersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        // preparing transformers
        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(CommentsTransformer)
            .whenNamed(NodeTransformer.CommentsTransformer);
    }
);
