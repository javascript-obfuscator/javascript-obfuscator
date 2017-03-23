import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/IControlFlowReplacer';

import { ControlFlowReplacers } from '../../../enums/container/ControlFlowReplacers';

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
        .toFactory<IControlFlowReplacer>((context: interfaces.Context) => {
            const cache: Map <ControlFlowReplacers, IControlFlowReplacer> = new Map();

            return (replacerName: ControlFlowReplacers) => {
                if (cache.has(replacerName)) {
                    return <IControlFlowReplacer>cache.get(replacerName);
                }

                const controlFlowReplacer: IControlFlowReplacer = context.container.getNamed<IControlFlowReplacer>(
                    ServiceIdentifiers.IControlFlowReplacer,
                    replacerName
                );

                cache.set(replacerName, controlFlowReplacer);

                return controlFlowReplacer;
            };
        });
});
