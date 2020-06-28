import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { IfStatementSimplifyTransformer } from '../../../node-transformers/minification-transformers/IfStatementSimplifyTransformer';
import { VariableDeclarationsMergeTransformer } from '../../../node-transformers/minification-transformers/VariableDeclarationsMergeTransformer';

export const minificationTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // minification transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(IfStatementSimplifyTransformer)
        .whenTargetNamed(NodeTransformer.IfStatementSimplifyTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(VariableDeclarationsMergeTransformer)
        .whenTargetNamed(NodeTransformer.VariableDeclarationsMergeTransformer);
});
