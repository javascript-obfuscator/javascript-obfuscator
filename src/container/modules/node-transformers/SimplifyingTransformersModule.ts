import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { BlockStatementSimplifyTransformer } from '../../../node-transformers/simplifying-transformers/BlockStatementSimplifyTransformer';
import { ExpressionStatementsMergeTransformer } from '../../../node-transformers/simplifying-transformers/ExpressionStatementsMergeTransformer';
import { IfStatementSimplifyTransformer } from '../../../node-transformers/simplifying-transformers/IfStatementSimplifyTransformer';
import { VariableDeclarationsMergeTransformer } from '../../../node-transformers/simplifying-transformers/VariableDeclarationsMergeTransformer';

export const simplifyingTransformersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        // simplifying transformers
        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(BlockStatementSimplifyTransformer)
            .whenNamed(NodeTransformer.BlockStatementSimplifyTransformer);

        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(ExpressionStatementsMergeTransformer)
            .whenNamed(NodeTransformer.ExpressionStatementsMergeTransformer);

        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(IfStatementSimplifyTransformer)
            .whenNamed(NodeTransformer.IfStatementSimplifyTransformer);

        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(VariableDeclarationsMergeTransformer)
            .whenNamed(NodeTransformer.VariableDeclarationsMergeTransformer);
    }
);
