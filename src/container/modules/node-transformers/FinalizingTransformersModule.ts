import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { AstToEvalCallExpressionTransformer } from '../../../node-transformers/finalizing-transformers/AstToEvalCallExpressionTransformer';

export const finalizingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // finalizing transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(AstToEvalCallExpressionTransformer)
        .whenTargetNamed(NodeTransformer.AstToEvalCallExpressionTransformer);
});
