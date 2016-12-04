import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/IControlFlowReplacer';

import { NodeControlFlowTransformersReplacers } from '../../../enums/container/NodeControlFlowTransformersReplacers';

import { BinaryExpressionControlFlowReplacer } from '../../../node-transformers/node-control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer';

export const nodeControlFlowTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(BinaryExpressionControlFlowReplacer)
        .whenTargetNamed(NodeControlFlowTransformersReplacers.BinaryExpressionControlFlowReplacer);

    bind<IControlFlowReplacer>(ServiceIdentifiers['Factory<IControlFlowReplacer>'])
        .toFactory<IControlFlowReplacer>((context: interfaces.Context) => {
            const cache: Map <NodeControlFlowTransformersReplacers, IControlFlowReplacer> = new Map <NodeControlFlowTransformersReplacers, IControlFlowReplacer> ();

            return (replacer: NodeControlFlowTransformersReplacers) => {
                if (cache.has(replacer)) {
                    return <IControlFlowReplacer>cache.get(replacer);
                }

                const controlFlowReplacer: IControlFlowReplacer = context.container.getNamed<IControlFlowReplacer>(
                    ServiceIdentifiers.IControlFlowReplacer,
                    replacer
                );

                cache.set(replacer, controlFlowReplacer);

                return controlFlowReplacer;
            };
        });
});
