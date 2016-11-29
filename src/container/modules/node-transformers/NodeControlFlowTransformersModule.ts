import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IControlFlowReplacer } from '../../../interfaces/IControlFlowReplacer';

import { NodeControlFlowTransformersReplacers } from '../../../enums/container/NodeControlFlowTransformersReplacers';

import { BinaryExpressionControlFlowReplacer } from '../../../node-transformers/node-control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer';

export const nodeControlFlowTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    const nodeControlFlowTransformersReplacersTag: string = 'nodeControlFlowTransformersReplacers';

    bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
        .to(BinaryExpressionControlFlowReplacer)
        .whenTargetTagged(
            nodeControlFlowTransformersReplacersTag,
            NodeControlFlowTransformersReplacers.BinaryExpressionControlFlowReplacer
        );

    bind<IControlFlowReplacer>(ServiceIdentifiers['Factory<IControlFlowReplacer>'])
        .toFactory<IControlFlowReplacer>((context: interfaces.Context) => {
            const cache: Map <NodeControlFlowTransformersReplacers, IControlFlowReplacer> = new Map <NodeControlFlowTransformersReplacers, IControlFlowReplacer> ();

            return (replacer: NodeControlFlowTransformersReplacers) => {
                if (cache.has(replacer)) {
                    return <IControlFlowReplacer>cache.get(replacer);
                }

                const controlFlowReplacer: IControlFlowReplacer = context.container.getTagged<IControlFlowReplacer>(
                    ServiceIdentifiers.IControlFlowReplacer,
                    nodeControlFlowTransformersReplacersTag,
                    replacer
                );

                cache.set(replacer, controlFlowReplacer);

                return controlFlowReplacer;
            };
        });
});
