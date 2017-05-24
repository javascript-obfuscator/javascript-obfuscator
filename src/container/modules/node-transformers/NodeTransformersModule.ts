import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformers } from '../../../enums/container/node-transformers/NodeTransformers';

import { FunctionControlFlowTransformer } from '../../../node-transformers/control-flow-transformers/FunctionControlFlowTransformer';

import { BlockStatementControlFlowTransformer } from '../../../node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer';
import { DeadCodeInjectionTransformer } from '../../../node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer';
import { CatchClauseTransformer } from '../../../node-transformers/obfuscating-transformers/CatchClauseTransformer';
import { FunctionDeclarationTransformer } from '../../../node-transformers/obfuscating-transformers/FunctionDeclarationTransformer';
import { FunctionTransformer } from '../../../node-transformers/obfuscating-transformers/FunctionTransformer';
import { LabeledStatementTransformer } from '../../../node-transformers/obfuscating-transformers/LabeledStatementTransformer';
import { LiteralTransformer } from '../../../node-transformers/obfuscating-transformers/LiteralTransformer';
import { MemberExpressionTransformer } from '../../../node-transformers/converting-transformers/MemberExpressionTransformer';
import { MethodDefinitionTransformer } from '../../../node-transformers/converting-transformers/MethodDefinitionTransformer';
import { ObjectExpressionTransformer } from '../../../node-transformers/obfuscating-transformers/ObjectExpressionTransformer';
import { TemplateLiteralTransformer } from '../../../node-transformers/converting-transformers/TemplateLiteralTransformer';
import { VariableDeclarationTransformer } from '../../../node-transformers/obfuscating-transformers/VariableDeclarationTransformer';

export const nodeTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // control flow transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(BlockStatementControlFlowTransformer)
        .whenTargetNamed(NodeTransformers.BlockStatementControlFlowTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(DeadCodeInjectionTransformer)
        .whenTargetNamed(NodeTransformers.DeadCodeInjectionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionControlFlowTransformer)
        .whenTargetNamed(NodeTransformers.FunctionControlFlowTransformer);

    // converting transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MemberExpressionTransformer)
        .whenTargetNamed(NodeTransformers.MemberExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MethodDefinitionTransformer)
        .whenTargetNamed(NodeTransformers.MethodDefinitionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(TemplateLiteralTransformer)
        .whenTargetNamed(NodeTransformers.TemplateLiteralTransformer);

    // obfuscation transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(CatchClauseTransformer)
        .whenTargetNamed(NodeTransformers.CatchClauseTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionDeclarationTransformer)
        .whenTargetNamed(NodeTransformers.FunctionDeclarationTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionTransformer)
        .whenTargetNamed(NodeTransformers.FunctionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LabeledStatementTransformer)
        .whenTargetNamed(NodeTransformers.LabeledStatementTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LiteralTransformer)
        .whenTargetNamed(NodeTransformers.LiteralTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ObjectExpressionTransformer)
        .whenTargetNamed(NodeTransformers.ObjectExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(VariableDeclarationTransformer)
        .whenTargetNamed(NodeTransformers.VariableDeclarationTransformer);

    // node transformers factory
    bind<INodeTransformer>(ServiceIdentifiers.Factory__INodeTransformer)
        .toFactory<INodeTransformer>((context: interfaces.Context) => {
            const cache: Map <NodeTransformers, INodeTransformer> = new Map();

            return (nodeTransformerName: NodeTransformers) => {
                if (cache.has(nodeTransformerName)) {
                    return <INodeTransformer>cache.get(nodeTransformerName);
                }

                const nodeTransformer: INodeTransformer = context.container
                    .getNamed<INodeTransformer>(
                        ServiceIdentifiers.INodeTransformer,
                        nodeTransformerName
                    );

                cache.set(nodeTransformerName, nodeTransformer);

                return nodeTransformer;
            };
        });
});
