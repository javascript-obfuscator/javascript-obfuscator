import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeGuard } from '../../../interfaces/node-guards/INodeGuard';

import { NodeGuard } from '../../../enums/container/node-guards/NodeGuard';

import { BlackListNodeGuard } from '../../../node-guards/BlackListNodeGuard';
import { ConditionalCommentNodeGuard } from '../../../node-guards/ConditionalCommentNodeGuard';

export const nodeGuardsModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // node guards
    bind<INodeGuard>(ServiceIdentifiers.INodeGuard)
        .to(BlackListNodeGuard)
        .inSingletonScope()
        .whenTargetNamed(NodeGuard.BlackListNodeGuard);

    bind<INodeGuard>(ServiceIdentifiers.INodeGuard)
        .to(ConditionalCommentNodeGuard)
        .inSingletonScope()
        .whenTargetNamed(NodeGuard.ConditionalCommentNodeGuard);

    // node guards factory
    bind<INodeGuard>(ServiceIdentifiers.Factory__INodeGuard)
        .toFactory<INodeGuard>(InversifyContainerFacade
            .getCacheFactory<NodeGuard, INodeGuard>(
                ServiceIdentifiers.INodeGuard
            ));
});
