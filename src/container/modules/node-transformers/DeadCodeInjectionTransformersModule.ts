import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { DeadCodeInjectionTransformer } from '../../../node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer';

export const deadCodeInjectionTransformersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        // dead code injection
        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(DeadCodeInjectionTransformer)
            .whenNamed(NodeTransformer.DeadCodeInjectionTransformer);
    }
);
