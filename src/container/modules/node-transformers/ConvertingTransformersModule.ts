import { ContainerModule, interfaces } from 'inversify';
import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';
import { IObjectExpressionExtractor } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractor';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';
import { ObjectExpressionExtractor } from '../../../enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor';

import { BasePropertiesExtractor } from '../../../node-transformers/converting-transformers/object-expression-extractors/BasePropertiesExtractor';
import { BooleanLiteralTransformer } from '../../../node-transformers/converting-transformers/BooleanLiteralTransformer';
import { MemberExpressionTransformer } from '../../../node-transformers/converting-transformers/MemberExpressionTransformer';
import { MethodDefinitionTransformer } from '../../../node-transformers/converting-transformers/MethodDefinitionTransformer';
import { NumberLiteralTransformer } from '../../../node-transformers/converting-transformers/NumberLiteralTransformer';
import { NumberToNumericalExpressionTransformer } from '../../../node-transformers/converting-transformers/NumberToNumericalExpressionTransformer';
import { ObjectExpressionKeysTransformer } from '../../../node-transformers/converting-transformers/ObjectExpressionKeysTransformer';
import { ObjectExpressionToVariableDeclarationExtractor } from '../../../node-transformers/converting-transformers/object-expression-extractors/ObjectExpressionToVariableDeclarationExtractor';
import { ObjectExpressionTransformer } from '../../../node-transformers/converting-transformers/ObjectExpressionTransformer';
import { ObjectPatternPropertiesTransformer } from '../../../node-transformers/converting-transformers/ObjectPatternPropertiesTransformer';
import { SplitStringTransformer } from '../../../node-transformers/converting-transformers/SplitStringTransformer';
import { TemplateLiteralTransformer } from '../../../node-transformers/converting-transformers/TemplateLiteralTransformer';

export const convertingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // converting transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(BooleanLiteralTransformer)
        .whenTargetNamed(NodeTransformer.BooleanLiteralTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MemberExpressionTransformer)
        .whenTargetNamed(NodeTransformer.MemberExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MethodDefinitionTransformer)
        .whenTargetNamed(NodeTransformer.MethodDefinitionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(NumberLiteralTransformer)
        .whenTargetNamed(NodeTransformer.NumberLiteralTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(NumberToNumericalExpressionTransformer)
        .whenTargetNamed(NodeTransformer.NumberToNumericalExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ObjectExpressionKeysTransformer)
        .whenTargetNamed(NodeTransformer.ObjectExpressionKeysTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ObjectExpressionTransformer)
        .whenTargetNamed(NodeTransformer.ObjectExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ObjectPatternPropertiesTransformer)
        .whenTargetNamed(NodeTransformer.ObjectPatternPropertiesTransformer);

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
