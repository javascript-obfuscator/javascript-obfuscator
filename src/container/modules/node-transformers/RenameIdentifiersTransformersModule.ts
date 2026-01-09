import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IIdentifierReplacer } from '../../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IIdentifierReplacer';
import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { DeadCodeInjectionIdentifiersTransformer } from '../../../node-transformers/dead-code-injection-transformers/DeadCodeInjectionIdentifiersTransformer';
import { IdentifierReplacer } from '../../../node-transformers/rename-identifiers-transformers/replacer/IdentifierReplacer';
import { LabeledStatementTransformer } from '../../../node-transformers/rename-identifiers-transformers/LabeledStatementTransformer';
import { ScopeIdentifiersTransformer } from '../../../node-transformers/rename-identifiers-transformers/ScopeIdentifiersTransformer';
import { ScopeThroughIdentifiersTransformer } from '../../../node-transformers/rename-identifiers-transformers/ScopeThroughIdentifiersTransformer';
import { ThroughIdentifierReplacer } from '../../../node-transformers/rename-identifiers-transformers/through-replacer/ThroughIdentifierReplacer';
import { IThroughIdentifierReplacer } from '../../../interfaces/node-transformers/rename-identifiers-transformers/replacer/IThroughIdentifierReplacer';

export const renameIdentifiersTransformersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        // rename identifiers transformers
        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(DeadCodeInjectionIdentifiersTransformer)
            .whenNamed(NodeTransformer.DeadCodeInjectionIdentifiersTransformer);

        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(LabeledStatementTransformer)
            .whenNamed(NodeTransformer.LabeledStatementTransformer);

        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(ScopeIdentifiersTransformer)
            .whenNamed(NodeTransformer.ScopeIdentifiersTransformer);

        options.bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(ScopeThroughIdentifiersTransformer)
            .whenNamed(NodeTransformer.ScopeThroughIdentifiersTransformer);

        // identifier replacer
        options.bind<IIdentifierReplacer>(ServiceIdentifiers.IIdentifierReplacer).to(IdentifierReplacer).inSingletonScope();

        options.bind<IThroughIdentifierReplacer>(ServiceIdentifiers.IThroughIdentifierReplacer)
            .to(ThroughIdentifierReplacer)
            .inSingletonScope();
    }
);
