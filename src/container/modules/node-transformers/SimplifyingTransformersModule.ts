import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { BlockStatementSimplifyTransformer } from '../../../node-transformers/simplifying-transformers/BlockStatementSimplifyTransformer';
import { ExpressionStatementsMergeTransformer } from '../../../node-transformers/simplifying-transformers/ExpressionStatementsMergeTransformer';
import { IfStatementSimplifyTransformer } from '../../../node-transformers/simplifying-transformers/IfStatementSimplifyTransformer';
import { VariableDeclarationsMergeTransformer } from '../../../node-transformers/simplifying-transformers/VariableDeclarationsMergeTransformer';

export const simplifyingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // simplifying transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(BlockStatementSimplifyTransformer)
        .whenTargetNamed(NodeTransformer.BlockStatementSimplifyTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ExpressionStatementsMergeTransformer)
        .whenTargetNamed(NodeTransformer.ExpressionStatementsMergeTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(IfStatementSimplifyTransformer)
        .whenTargetNamed(NodeTransformer.IfStatementSimplifyTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(VariableDeclarationsMergeTransformer)
        .whenTargetNamed(NodeTransformer.VariableDeclarationsMergeTransformer);
});
