import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';

import { ControlFlowReplacers } from '../../../enums/container/node-transformers/ControlFlowReplacers';

import { BinaryExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer';
import { CallExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer';
import { LogicalExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer';
import { StringLiteralControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer';

export const controlFlowTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(BinaryExpressionControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacers.BinaryExpressionControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(CallExpressionControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacers.CallExpressionControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(LogicalExpressionControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacers.LogicalExpressionControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(StringLiteralControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacers.StringLiteralControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers.Factory__IControlFlowReplacer)
        .toFactory<IControlFlowReplacer>(InversifyContainerFacade
            .getCacheFactory<ControlFlowReplacers, IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer));
});
