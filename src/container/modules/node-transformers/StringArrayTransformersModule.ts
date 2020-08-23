import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { MemberExpressionTransformer } from '../../../node-transformers/string-array-transformers/MemberExpressionTransformer';
import { StringArrayTransformer } from '../../../node-transformers/string-array-transformers/StringArrayTransformer';

export const stringArrayTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // string array transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MemberExpressionTransformer)
        .whenTargetNamed(NodeTransformer.MemberExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(StringArrayTransformer)
        .whenTargetNamed(NodeTransformer.StringArrayTransformer);
});
