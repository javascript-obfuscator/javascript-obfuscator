import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { CallExpressionTransformer } from '../../../node-transformers/converting-transformers/CallExpressionTransformer';
import { MemberExpressionTransformer } from '../../../node-transformers/converting-transformers/MemberExpressionTransformer';
import { MethodDefinitionTransformer } from '../../../node-transformers/converting-transformers/MethodDefinitionTransformer';
import { TemplateLiteralTransformer } from '../../../node-transformers/converting-transformers/TemplateLiteralTransformer';

export const convertingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // converting transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(CallExpressionTransformer)
        .whenTargetNamed(NodeTransformer.CallExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MemberExpressionTransformer)
        .whenTargetNamed(NodeTransformer.MemberExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MethodDefinitionTransformer)
        .whenTargetNamed(NodeTransformer.MethodDefinitionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(TemplateLiteralTransformer)
        .whenTargetNamed(NodeTransformer.TemplateLiteralTransformer);
});
