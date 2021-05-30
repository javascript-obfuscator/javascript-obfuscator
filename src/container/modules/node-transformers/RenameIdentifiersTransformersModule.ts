import { ContainerModule, interfaces } from 'inversify';
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

export const renameIdentifiersTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // rename identifiers transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(DeadCodeInjectionIdentifiersTransformer)
        .whenTargetNamed(NodeTransformer.DeadCodeInjectionIdentifiersTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LabeledStatementTransformer)
        .whenTargetNamed(NodeTransformer.LabeledStatementTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ScopeIdentifiersTransformer)
        .whenTargetNamed(NodeTransformer.ScopeIdentifiersTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ScopeThroughIdentifiersTransformer)
        .whenTargetNamed(NodeTransformer.ScopeThroughIdentifiersTransformer);

    // identifier replacer
    bind<IIdentifierReplacer>(ServiceIdentifiers.IIdentifierReplacer)
        .to(IdentifierReplacer)
        .inSingletonScope();

    bind<IThroughIdentifierReplacer>(ServiceIdentifiers.IThroughIdentifierReplacer)
        .to(ThroughIdentifierReplacer)
        .inSingletonScope();
});
