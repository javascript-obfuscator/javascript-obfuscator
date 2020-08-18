import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { DeadCodeInjectionTransformer } from '../../../node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer';

export const deadCodeInjectionTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // dead code injection
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(DeadCodeInjectionTransformer)
        .whenTargetNamed(NodeTransformer.DeadCodeInjectionTransformer);
});
