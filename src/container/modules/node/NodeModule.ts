import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IScopeIdentifiersTraverser } from '../../../interfaces/node/IScopeIdentifiersTraverser';

import { ScopeIdentifiersTraverser } from '../../../node/ScopeIdentifiersTraverser';

export const nodeModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // scope identifiers traverser
    bind<IScopeIdentifiersTraverser>(ServiceIdentifiers.IScopeIdentifiersTraverser)
        .to(ScopeIdentifiersTraverser)
        .inSingletonScope();
});
