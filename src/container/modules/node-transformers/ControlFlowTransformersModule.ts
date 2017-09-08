import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';
import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { ControlFlowReplacer } from '../../../enums/node-transformers/obfuscating-transformers/obfuscating-replacers/ControlFlowReplacer';
import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { BinaryExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer';
import { BlockStatementControlFlowTransformer } from '../../../node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer';
import { CallExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer';
import { DeadCodeInjectionTransformer } from '../../../node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer';
import { FunctionControlFlowTransformer } from '../../../node-transformers/control-flow-transformers/FunctionControlFlowTransformer';
import { LogicalExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer';
import { StringLiteralControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer';

export const controlFlowTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // control flow transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(BlockStatementControlFlowTransformer)
        .whenTargetNamed(NodeTransformer.BlockStatementControlFlowTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(DeadCodeInjectionTransformer)
        .whenTargetNamed(NodeTransformer.DeadCodeInjectionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionControlFlowTransformer)
        .whenTargetNamed(NodeTransformer.FunctionControlFlowTransformer);

    // control flow replacers
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

    // control flow replacer factory
    bind<IControlFlowReplacer>(ServiceIdentifiers.Factory__IControlFlowReplacer)
        .toFactory<IControlFlowReplacer>(InversifyContainerFacade
            .getCacheFactory<ControlFlowReplacer, IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer));
});
