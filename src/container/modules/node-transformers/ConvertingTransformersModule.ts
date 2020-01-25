import { ContainerModule, interfaces } from 'inversify';
import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';
import { IObjectExpressionExtractor } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractor';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';
import { ObjectExpressionExtractor } from '../../../enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor';

import { ObjectExpressionToVariableDeclarationExtractor } from '../../../node-transformers/converting-transformers/object-expression-extractors/ObjectExpressionToVariableDeclarationExtractor';
import { MemberExpressionTransformer } from '../../../node-transformers/converting-transformers/MemberExpressionTransformer';
import { MethodDefinitionTransformer } from '../../../node-transformers/converting-transformers/MethodDefinitionTransformer';
import { ObjectExpressionKeysTransformer } from '../../../node-transformers/converting-transformers/ObjectExpressionKeysTransformer';
import { ObjectExpressionTransformer } from '../../../node-transformers/converting-transformers/ObjectExpressionTransformer';
import { SplitStringTransformer } from '../../../node-transformers/converting-transformers/SplitStringTransformer';
import { TemplateLiteralTransformer } from '../../../node-transformers/converting-transformers/TemplateLiteralTransformer';
import { BasePropertiesExtractor } from '../../../node-transformers/converting-transformers/object-expression-extractors/BasePropertiesExtractor';

export const convertingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // converting transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MemberExpressionTransformer)
        .whenTargetNamed(NodeTransformer.MemberExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MethodDefinitionTransformer)
        .whenTargetNamed(NodeTransformer.MethodDefinitionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ObjectExpressionKeysTransformer)
        .whenTargetNamed(NodeTransformer.ObjectExpressionKeysTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ObjectExpressionTransformer)
        .whenTargetNamed(NodeTransformer.ObjectExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(SplitStringTransformer)
        .whenTargetNamed(NodeTransformer.SplitStringTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(TemplateLiteralTransformer)
        .whenTargetNamed(NodeTransformer.TemplateLiteralTransformer);

    // object expression extractors
    bind<IObjectExpressionExtractor>(ServiceIdentifiers.IObjectExpressionExtractor)
        .to(ObjectExpressionToVariableDeclarationExtractor)
        .whenTargetNamed(ObjectExpressionExtractor.ObjectExpressionToVariableDeclarationExtractor);

    bind<IObjectExpressionExtractor>(ServiceIdentifiers.IObjectExpressionExtractor)
        .to(BasePropertiesExtractor)
        .whenTargetNamed(ObjectExpressionExtractor.BasePropertiesExtractor);

    // object expression extractor factory
    bind<IObjectExpressionExtractor>(ServiceIdentifiers.Factory__IObjectExpressionExtractor)
        .toFactory<IObjectExpressionExtractor>(InversifyContainerFacade
            .getCacheFactory<ObjectExpressionExtractor, IObjectExpressionExtractor>(
                ServiceIdentifiers.IObjectExpressionExtractor
            ));
});
