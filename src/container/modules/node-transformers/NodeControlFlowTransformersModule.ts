import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/IControlFlowReplacer';

import { NodeControlFlowReplacers } from '../../../enums/container/NodeControlFlowReplacers';

import { BinaryExpressionControlFlowReplacer } from '../../../node-transformers/node-control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer';
import { LogicalExpressionControlFlowReplacer } from '../../../node-transformers/node-control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer';

export const nodeControlFlowTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(BinaryExpressionControlFlowReplacer)
        .whenTargetNamed(NodeControlFlowReplacers.BinaryExpressionControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(LogicalExpressionControlFlowReplacer)
        .whenTargetNamed(NodeControlFlowReplacers.LogicalExpressionControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers.Factory__IControlFlowReplacer)
        .toFactory<IControlFlowReplacer>((context: interfaces.Context) => {
            const cache: Map <NodeControlFlowReplacers, IControlFlowReplacer> = new Map();

            return (replacerName: NodeControlFlowReplacers) => {
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
