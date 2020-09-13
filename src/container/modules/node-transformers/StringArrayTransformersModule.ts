import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { StringArrayScopeCallsWrapperTransformer } from '../../../node-transformers/string-array-transformers/StringArrayScopeCallsWrapperTransformer';
import { StringArrayTransformer } from '../../../node-transformers/string-array-transformers/StringArrayTransformer';

export const stringArrayTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // string array transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(StringArrayScopeCallsWrapperTransformer)
        .whenTargetNamed(NodeTransformer.StringArrayScopeCallsWrapperTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(StringArrayTransformer)
        .whenTargetNamed(NodeTransformer.StringArrayTransformer);
});
