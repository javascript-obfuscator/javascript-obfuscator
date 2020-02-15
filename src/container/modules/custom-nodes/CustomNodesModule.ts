import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';

import { ControlFlowCustomNode } from '../../../enums/custom-nodes/ControlFlowCustomNode';
import { DeadCodeInjectionCustomNode } from '../../../enums/custom-nodes/DeadCodeInjectionCustomNode';
import { ObjectExpressionKeysTransformerCustomNode } from '../../../enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode';

import { ObjectExpressionVariableDeclarationHostNode } from '../../../custom-nodes/object-expression-keys-transformer-nodes/ObjectExpressionVariableDeclarationHostNode';
import { BinaryExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode';
import { BlockStatementControlFlowFlatteningNode } from '../../../custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode';
import { BlockStatementDeadCodeInjectionNode } from '../../../custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode';
import { CallExpressionControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode';
import { CallExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode';
import { ControlFlowStorageNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode';
import { ExpressionWithOperatorControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode';
import { LogicalExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode';
import { StringLiteralControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode';
import { StringLiteralNode } from '../../../custom-nodes/control-flow-flattening-nodes/StringLiteralNode';

export const customNodesModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // control flow custom nodes
    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(BinaryExpressionFunctionNode)
        .whenTargetNamed(ControlFlowCustomNode.BinaryExpressionFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(BlockStatementControlFlowFlatteningNode)
        .whenTargetNamed(ControlFlowCustomNode.BlockStatementControlFlowFlatteningNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(CallExpressionControlFlowStorageCallNode)
        .whenTargetNamed(ControlFlowCustomNode.CallExpressionControlFlowStorageCallNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(CallExpressionFunctionNode)
        .whenTargetNamed(ControlFlowCustomNode.CallExpressionFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ControlFlowStorageNode)
        .whenTargetNamed(ControlFlowCustomNode.ControlFlowStorageNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ExpressionWithOperatorControlFlowStorageCallNode)
        .whenTargetNamed(ControlFlowCustomNode.ExpressionWithOperatorControlFlowStorageCallNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(LogicalExpressionFunctionNode)
        .whenTargetNamed(ControlFlowCustomNode.LogicalExpressionFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringLiteralNode)
        .whenTargetNamed(ControlFlowCustomNode.StringLiteralNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringLiteralControlFlowStorageCallNode)
        .whenTargetNamed(ControlFlowCustomNode.StringLiteralControlFlowStorageCallNode);

    // dead code injection custom nodes
    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(BlockStatementDeadCodeInjectionNode)
        .whenTargetNamed(DeadCodeInjectionCustomNode.BlockStatementDeadCodeInjectionNode);

    // object expression keys transformer nodes
    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ObjectExpressionVariableDeclarationHostNode)
        .whenTargetNamed(ObjectExpressionKeysTransformerCustomNode.ObjectExpressionVariableDeclarationHostNode);

    // control flow customNode constructor factory
    bind<ICustomNode>(ServiceIdentifiers.Factory__IControlFlowCustomNode)
        .toFactory<ICustomNode>(InversifyContainerFacade
            .getConstructorFactory<ControlFlowCustomNode, ICustomNode>(
                ServiceIdentifiers.Newable__ICustomNode,
                ServiceIdentifiers.Factory__IIdentifierNamesGenerator,
                ServiceIdentifiers.ICustomCodeHelperFormatter,
                ServiceIdentifiers.IRandomGenerator,
                ServiceIdentifiers.IOptions,
                ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer
            ));

    // dead code injection customNode constructor factory
    bind<ICustomNode>(ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode)
        .toFactory<ICustomNode>(InversifyContainerFacade
            .getConstructorFactory<DeadCodeInjectionCustomNode, ICustomNode>(
                ServiceIdentifiers.Newable__ICustomNode,
                ServiceIdentifiers.Factory__IIdentifierNamesGenerator,
                ServiceIdentifiers.ICustomCodeHelperFormatter,
                ServiceIdentifiers.IRandomGenerator,
                ServiceIdentifiers.IOptions
            ));

    // object expression keys transformer customNode constructor factory
    bind<ICustomNode>(ServiceIdentifiers.Factory__IObjectExpressionKeysTransformerCustomNode)
        .toFactory<ICustomNode>(InversifyContainerFacade
            .getConstructorFactory<ObjectExpressionKeysTransformerCustomNode, ICustomNode>(
                ServiceIdentifiers.Newable__ICustomNode,
                ServiceIdentifiers.Factory__IIdentifierNamesGenerator,
                ServiceIdentifiers.ICustomCodeHelperFormatter,
                ServiceIdentifiers.IRandomGenerator,
                ServiceIdentifiers.IOptions,
                ServiceIdentifiers.IPrevailingKindOfVariablesAnalyzer
            ));
});
