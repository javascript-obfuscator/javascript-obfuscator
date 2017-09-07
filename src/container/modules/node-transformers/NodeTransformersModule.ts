import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/container/node-transformers/NodeTransformer';

import { FunctionControlFlowTransformer } from '../../../node-transformers/control-flow-transformers/FunctionControlFlowTransformer';

import { BlockStatementControlFlowTransformer } from '../../../node-transformers/control-flow-transformers/BlockStatementControlFlowTransformer';
import { DeadCodeInjectionTransformer } from '../../../node-transformers/dead-code-injection-transformers/DeadCodeInjectionTransformer';
import { CatchClauseTransformer } from '../../../node-transformers/obfuscating-transformers/CatchClauseTransformer';
import { ClassDeclarationTransformer } from '../../../node-transformers/obfuscating-transformers/ClassDeclarationTransformer';
import { FunctionDeclarationTransformer } from '../../../node-transformers/obfuscating-transformers/FunctionDeclarationTransformer';
import { FunctionTransformer } from '../../../node-transformers/obfuscating-transformers/FunctionTransformer';
import { LabeledStatementTransformer } from '../../../node-transformers/obfuscating-transformers/LabeledStatementTransformer';
import { LiteralTransformer } from '../../../node-transformers/obfuscating-transformers/LiteralTransformer';
import { MemberExpressionTransformer } from '../../../node-transformers/converting-transformers/MemberExpressionTransformer';
import { MethodDefinitionTransformer } from '../../../node-transformers/converting-transformers/MethodDefinitionTransformer';
import { ObjectExpressionTransformer } from '../../../node-transformers/obfuscating-transformers/ObjectExpressionTransformer';
import { ParentizeTransformer } from '../../../node-transformers/preparing-transformers/ParentizeTransformer';
import { TemplateLiteralTransformer } from '../../../node-transformers/converting-transformers/TemplateLiteralTransformer';
import { VariableDeclarationTransformer } from '../../../node-transformers/obfuscating-transformers/VariableDeclarationTransformer';
import { NodeGuardTransformer } from '../../../node-transformers/preparing-transformers/NodeGuardTransformer';

export const nodeTransformersModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // preparing transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ParentizeTransformer)
        .whenTargetNamed(NodeTransformer.ParentizeTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(NodeGuardTransformer)
        .whenTargetNamed(NodeTransformer.NodeGuardTransformer);

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

    // converting transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MemberExpressionTransformer)
        .whenTargetNamed(NodeTransformer.MemberExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(MethodDefinitionTransformer)
        .whenTargetNamed(NodeTransformer.MethodDefinitionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(TemplateLiteralTransformer)
        .whenTargetNamed(NodeTransformer.TemplateLiteralTransformer);

    // obfuscation transformers
    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(CatchClauseTransformer)
        .whenTargetNamed(NodeTransformer.CatchClauseTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ClassDeclarationTransformer)
        .whenTargetNamed(NodeTransformer.ClassDeclarationTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionDeclarationTransformer)
        .whenTargetNamed(NodeTransformer.FunctionDeclarationTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(FunctionTransformer)
        .whenTargetNamed(NodeTransformer.FunctionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LabeledStatementTransformer)
        .whenTargetNamed(NodeTransformer.LabeledStatementTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(LiteralTransformer)
        .whenTargetNamed(NodeTransformer.LiteralTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(ObjectExpressionTransformer)
        .whenTargetNamed(NodeTransformer.ObjectExpressionTransformer);

    bind<INodeTransformer>(ServiceIdentifiers.INodeTransformer)
        .to(VariableDeclarationTransformer)
        .whenTargetNamed(NodeTransformer.VariableDeclarationTransformer);

    // node transformers factory
    bind<INodeTransformer>(ServiceIdentifiers.Factory__INodeTransformer)
        .toFactory<INodeTransformer>(InversifyContainerFacade
            .getCacheFactory<NodeTransformer, INodeTransformer>(ServiceIdentifiers.INodeTransformer));
});
