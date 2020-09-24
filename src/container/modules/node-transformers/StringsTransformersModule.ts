import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { EscapeSequenceTransformer } from '../../../node-transformers/strings-transformers/EscapeSequenceTransformer';
import { StringArrayScopeCallsWrapperTransformer } from '../../../node-transformers/strings-transformers/StringArrayScopeCallsWrapperTransformer';
import { StringArrayTransformer } from '../../../node-transformers/strings-transformers/StringArrayTransformer';

export const stringsTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // strings transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(EscapeSequenceTransformer)
        .whenTargetNamed(NodeTransformer.EscapeSequenceTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(StringArrayScopeCallsWrapperTransformer)
        .whenTargetNamed(NodeTransformer.StringArrayScopeCallsWrapperTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(StringArrayTransformer)
        .whenTargetNamed(NodeTransformer.StringArrayTransformer);
});
