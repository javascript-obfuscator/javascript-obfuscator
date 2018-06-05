import { ContainerModule, interfaces } from 'inversify';
import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';
import { IPropertiesExtractor } from '../../../interfaces/node-transformers/converting-transformers/properties-extractors/IPropertiesExtractor';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';
import { PropertiesExtractor } from '../../../enums/node-transformers/converting-transformers/properties-extractors/PropertiesExtractor';

import { AssignmentExpressionPropertiesExtractor } from '../../../node-transformers/converting-transformers/properties-extractors/AssignmentExpressionPropertiesExtractor';
import { MemberExpressionTransformer } from '../../../node-transformers/converting-transformers/MemberExpressionTransformer';
import { MethodDefinitionTransformer } from '../../../node-transformers/converting-transformers/MethodDefinitionTransformer';
import { ObjectExpressionKeysTransformer } from '../../../node-transformers/converting-transformers/ObjectExpressionKeysTransformer';
import { ObjectExpressionTransformer } from '../../../node-transformers/converting-transformers/ObjectExpressionTransformer';
import { TemplateLiteralTransformer } from '../../../node-transformers/converting-transformers/TemplateLiteralTransformer';
import { VariableDeclaratorPropertiesExtractor } from '../../../node-transformers/converting-transformers/properties-extractors/VariableDeclaratorPropertiesExtractor';

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
        .to(TemplateLiteralTransformer)
        .whenTargetNamed(NodeTransformer.TemplateLiteralTransformer);

    // properties extractors
    bind<IPropertiesExtractor>(ServiceIdentifiers.IPropertiesExtractor)
        .to(AssignmentExpressionPropertiesExtractor)
        .whenTargetNamed(PropertiesExtractor.AssignmentExpressionPropertiesExtractor);

    bind<IPropertiesExtractor>(ServiceIdentifiers.IPropertiesExtractor)
        .to(VariableDeclaratorPropertiesExtractor)
        .whenTargetNamed(PropertiesExtractor.VariableDeclaratorPropertiesExtractor);

    // properties extractor factory
    bind<IPropertiesExtractor>(ServiceIdentifiers.Factory__IPropertiesExtractor)
        .toFactory<IPropertiesExtractor>(InversifyContainerFacade
            .getCacheFactory<PropertiesExtractor, IPropertiesExtractor>(
                ServiceIdentifiers.IPropertiesExtractor
            ));
});
