import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';

import { ControlFlowReplacer } from '../../../enums/container/node-transformers/ControlFlowReplacer';

import { BinaryExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer';
import { CallExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer';
import { LogicalExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer';
import { StringLiteralControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer';

export const controlFlowTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(BinaryExpressionControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacer.BinaryExpressionControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(CallExpressionControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacer.CallExpressionControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(LogicalExpressionControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacer.LogicalExpressionControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(StringLiteralControlFlowReplacer)
        .whenTargetNamed(ControlFlowReplacer.StringLiteralControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers.Factory__IControlFlowReplacer)
        .toFactory<IControlFlowReplacer>(InversifyContainerFacade
            .getCacheFactory<ControlFlowReplacer, IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer));
});
