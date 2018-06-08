import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IIdentifierObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IIdentifierObfuscatingReplacer';
import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';
import { IObfuscatingReplacer } from '../../../interfaces/node-transformers/obfuscating-transformers/obfuscating-replacers/IObfuscatingReplacer';

import { IdentifierObfuscatingReplacer } from '../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/IdentifierObfuscatingReplacer';
import { LiteralObfuscatingReplacer } from '../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/LiteralObfuscatingReplacer';
import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { BaseIdentifierObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/identifier-obfuscating-replacers/BaseIdentifierObfuscatingReplacer';
import { BooleanLiteralObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/BooleanLiteralObfuscatingReplacer';
import { CatchClauseTransformer } from '../../../node-transformers/obfuscating-transformers/CatchClauseTransformer';
import { ClassDeclarationTransformer } from '../../../node-transformers/obfuscating-transformers/ClassDeclarationTransformer';
import { FunctionDeclarationTransformer } from '../../../node-transformers/obfuscating-transformers/FunctionDeclarationTransformer';
import { FunctionTransformer } from '../../../node-transformers/obfuscating-transformers/FunctionTransformer';
import { ImportDeclarationTransformer } from '../../../node-transformers/obfuscating-transformers/ImportDeclarationTransformer';
import { LabeledStatementTransformer } from '../../../node-transformers/obfuscating-transformers/LabeledStatementTransformer';
import { LiteralTransformer } from '../../../node-transformers/obfuscating-transformers/LiteralTransformer';
import { NumberLiteralObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/NumberLiteralObfuscatingReplacer';
import { StringLiteralObfuscatingReplacer } from '../../../node-transformers/obfuscating-transformers/obfuscating-replacers/literal-obfuscating-replacers/StringLiteralObfuscatingReplacer';
import { VariableDeclarationTransformer } from '../../../node-transformers/obfuscating-transformers/VariableDeclarationTransformer';

export const obfuscatingTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // obfuscating transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(CatchClauseTransformer)
        .whenTargetNamed(NodeTransformer.CatchClauseTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ClassDeclarationTransformer)
        .whenTargetNamed(NodeTransformer.ClassDeclarationTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionDeclarationTransformer)
        .whenTargetNamed(NodeTransformer.FunctionDeclarationTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionTransformer)
        .whenTargetNamed(NodeTransformer.FunctionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ImportDeclarationTransformer)
        .whenTargetNamed(NodeTransformer.ImportDeclarationTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LabeledStatementTransformer)
        .whenTargetNamed(NodeTransformer.LabeledStatementTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LiteralTransformer)
        .whenTargetNamed(NodeTransformer.LiteralTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(VariableDeclarationTransformer)
        .whenTargetNamed(NodeTransformer.VariableDeclarationTransformer);

    // literal obfuscating replacers
    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(BooleanLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacer.BooleanLiteralObfuscatingReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(NumberLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacer.NumberLiteralObfuscatingReplacer);

    bind<IObfuscatingReplacer>(ServiceIdentifiers.IObfuscatingReplacer)
        .to(StringLiteralObfuscatingReplacer)
        .whenTargetNamed(LiteralObfuscatingReplacer.StringLiteralObfuscatingReplacer);

    // identifier obfuscating replacers
    bind<IIdentifierObfuscatingReplacer>(ServiceIdentifiers.IIdentifierObfuscatingReplacer)
        .to(BaseIdentifierObfuscatingReplacer)
        .whenTargetNamed(IdentifierObfuscatingReplacer.BaseIdentifierObfuscatingReplacer);

    // literal obfuscating replacer factory
    bind<IObfuscatingReplacer>(ServiceIdentifiers.Factory__IObfuscatingReplacer)
        .toFactory<IObfuscatingReplacer>(InversifyContainerFacade
            .getCacheFactory<LiteralObfuscatingReplacer, IObfuscatingReplacer>(
                ServiceIdentifiers.IObfuscatingReplacer
            ));

    // identifier obfuscating replacer factory
    bind<IIdentifierObfuscatingReplacer>(ServiceIdentifiers.Factory__IIdentifierObfuscatingReplacer)
        .toFactory<IIdentifierObfuscatingReplacer>(InversifyContainerFacade
            .getCacheFactory<IdentifierObfuscatingReplacer, IIdentifierObfuscatingReplacer>(
                ServiceIdentifiers.IIdentifierObfuscatingReplacer
            ));
});
