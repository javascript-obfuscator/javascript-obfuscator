import { ContainerModule, ContainerModuleLoadOptions, Factory } from 'inversify';
import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';
import { IObjectExpressionExtractor } from '../../../interfaces/node-transformers/converting-transformers/object-expression-extractors/IObjectExpressionExtractor';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';
import { ObjectExpressionExtractor } from '../../../enums/node-transformers/converting-transformers/properties-extractors/ObjectExpressionExtractor';

import { BasePropertiesExtractor } from '../../../node-transformers/converting-transformers/object-expression-extractors/BasePropertiesExtractor';
import { BooleanLiteralTransformer } from '../../../node-transformers/converting-transformers/BooleanLiteralTransformer';
import { ExportSpecifierTransformer } from '../../../node-transformers/converting-transformers/ExportSpecifierTransformer';
import { MemberExpressionTransformer } from '../../../node-transformers/converting-transformers/MemberExpressionTransformer';
import { ClassFieldTransformer } from '../../../node-transformers/converting-transformers/ClassFieldTransformer';
import { NumberLiteralTransformer } from '../../../node-transformers/converting-transformers/NumberLiteralTransformer';
import { NumberToNumericalExpressionTransformer } from '../../../node-transformers/converting-transformers/NumberToNumericalExpressionTransformer';
import { ObjectExpressionKeysTransformer } from '../../../node-transformers/converting-transformers/ObjectExpressionKeysTransformer';
import { ObjectExpressionToVariableDeclarationExtractor } from '../../../node-transformers/converting-transformers/object-expression-extractors/ObjectExpressionToVariableDeclarationExtractor';
import { ObjectExpressionTransformer } from '../../../node-transformers/converting-transformers/ObjectExpressionTransformer';
import { ObjectPatternPropertiesTransformer } from '../../../node-transformers/converting-transformers/ObjectPatternPropertiesTransformer';
import { SplitStringTransformer } from '../../../node-transformers/converting-transformers/SplitStringTransformer';
import { TemplateLiteralTransformer } from '../../../node-transformers/converting-transformers/TemplateLiteralTransformer';

export const convertingTransformersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        // converting transformers
        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(BooleanLiteralTransformer)
            .whenNamed(NodeTransformer.BooleanLiteralTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(ExportSpecifierTransformer)
            .whenNamed(NodeTransformer.ExportSpecifierTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(MemberExpressionTransformer)
            .whenNamed(NodeTransformer.MemberExpressionTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(ClassFieldTransformer)
            .whenNamed(NodeTransformer.ClassFieldTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(NumberLiteralTransformer)
            .whenNamed(NodeTransformer.NumberLiteralTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(NumberToNumericalExpressionTransformer)
            .whenNamed(NodeTransformer.NumberToNumericalExpressionTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(ObjectExpressionKeysTransformer)
            .whenNamed(NodeTransformer.ObjectExpressionKeysTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(ObjectExpressionTransformer)
            .whenNamed(NodeTransformer.ObjectExpressionTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(ObjectPatternPropertiesTransformer)
            .whenNamed(NodeTransformer.ObjectPatternPropertiesTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(SplitStringTransformer)
            .whenNamed(NodeTransformer.SplitStringTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(TemplateLiteralTransformer)
            .whenNamed(NodeTransformer.TemplateLiteralTransformer);

        // object expression extractors
        options
            .bind<IObjectExpressionExtractor>(ServiceIdentifiers.IObjectExpressionExtractor)
            .to(ObjectExpressionToVariableDeclarationExtractor)
            .whenNamed(ObjectExpressionExtractor.ObjectExpressionToVariableDeclarationExtractor);

        options
            .bind<IObjectExpressionExtractor>(ServiceIdentifiers.IObjectExpressionExtractor)
            .to(BasePropertiesExtractor)
            .whenNamed(ObjectExpressionExtractor.BasePropertiesExtractor);

        // object expression extractor factory
        options
            .bind<
                Factory<IObjectExpressionExtractor, [ObjectExpressionExtractor]>
            >(ServiceIdentifiers.Factory__IObjectExpressionExtractor)
            .toFactory(
                InversifyContainerFacade.getCacheFactory<ObjectExpressionExtractor, IObjectExpressionExtractor>(
                    ServiceIdentifiers.IObjectExpressionExtractor
                )
            );
    }
);
