import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, ContainerModuleLoadOptions, Factory } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { IControlFlowReplacer } from '../../../interfaces/node-transformers/control-flow-transformers/IControlFlowReplacer';
import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { ControlFlowReplacer } from '../../../enums/node-transformers/control-flow-transformers/control-flow-replacers/ControlFlowReplacer';
import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

import { BinaryExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/BinaryExpressionControlFlowReplacer';
import { BlockStatementControlFlowTransformer } from '../../../node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer';
import { CallExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/CallExpressionControlFlowReplacer';
import { FunctionControlFlowTransformer } from '../../../node-transformers/control-flow-transformers/FunctionControlFlowTransformer';
import { LogicalExpressionControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/LogicalExpressionControlFlowReplacer';
import { StringArrayCallControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/StringArrayCallControlFlowReplacer';
import { StringArrayControlFlowTransformer } from '../../../node-transformers/control-flow-transformers/StringArrayControlFlowTransformer';
import { StringLiteralControlFlowReplacer } from '../../../node-transformers/control-flow-transformers/control-flow-replacers/StringLiteralControlFlowReplacer';

export const controlFlowTransformersModule: ContainerModule = new ContainerModule(
    (options: ContainerModuleLoadOptions) => {
        // control flow transformers
        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(BlockStatementControlFlowTransformer)
            .whenNamed(NodeTransformer.BlockStatementControlFlowTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(FunctionControlFlowTransformer)
            .whenNamed(NodeTransformer.FunctionControlFlowTransformer);

        options
            .bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
            .to(StringArrayControlFlowTransformer)
            .whenNamed(NodeTransformer.StringArrayControlFlowTransformer);

        // control flow replacers
        options
            .bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
            .to(BinaryExpressionControlFlowReplacer)
            .whenNamed(ControlFlowReplacer.BinaryExpressionControlFlowReplacer);

        options
            .bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
            .to(CallExpressionControlFlowReplacer)
            .whenNamed(ControlFlowReplacer.CallExpressionControlFlowReplacer);

        options
            .bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
            .to(LogicalExpressionControlFlowReplacer)
            .whenNamed(ControlFlowReplacer.LogicalExpressionControlFlowReplacer);

        options
            .bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
            .to(StringArrayCallControlFlowReplacer)
            .whenNamed(ControlFlowReplacer.StringArrayCallControlFlowReplacer);

        options
            .bind<IControlFlowReplacer>(ServiceIdentifiers.IControlFlowReplacer)
            .to(StringLiteralControlFlowReplacer)
            .whenNamed(ControlFlowReplacer.StringLiteralControlFlowReplacer);

        // control flow replacer factory
        options
            .bind<
                Factory<IControlFlowReplacer, [ControlFlowReplacer]>
            >(ServiceIdentifiers.Factory__IControlFlowReplacer)
            .toFactory(
                InversifyContainerFacade.getCacheFactory<ControlFlowReplacer, IControlFlowReplacer>(
                    ServiceIdentifiers.IControlFlowReplacer
                )
            );
    }
);
