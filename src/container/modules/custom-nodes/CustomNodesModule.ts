import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';

import { ControlFlowCustomNode } from "../../../enums/custom-nodes/ControlFlowCustomNode";
import { CustomNode } from '../../../enums/custom-nodes/CustomNode';
import { CustomNodeGroup } from '../../../enums/custom-nodes/CustomNodeGroup';
import { DeadCodeInjectionCustomNode } from '../../../enums/custom-nodes/DeadCodeInjectionCustomNode';

import { ConsoleOutputCustomNodeGroup } from '../../../custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup';
import { DebugProtectionCustomNodeGroup } from '../../../custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup';
import { DomainLockCustomNodeGroup } from '../../../custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup';
import { SelfDefendingCustomNodeGroup } from '../../../custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup';
import { StringArrayCustomNodeGroup } from '../../../custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup';

import { BinaryExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode';
import { BlockStatementControlFlowFlatteningNode } from '../../../custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode';
import { BlockStatementDeadCodeInjectionNode } from '../../../custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode';
import { CallExpressionControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode';
import { CallExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode';
import { ControlFlowStorageNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode';
import { ConsoleOutputDisableExpressionNode } from '../../../custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode';
import { DebugProtectionFunctionCallNode } from '../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode';
import { DebugProtectionFunctionIntervalNode } from '../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode';
import { DebugProtectionFunctionNode } from '../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode';
import { DomainLockNode } from '../../../custom-nodes/domain-lock-nodes/DomainLockNode';
import { ExpressionWithOperatorControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode';
import { LogicalExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode';
import { NodeCallsControllerFunctionNode } from '../../../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode';
import { SelfDefendingUnicodeNode } from '../../../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode';
import { StringArrayCallsWrapper } from '../../../custom-nodes/string-array-nodes/StringArrayCallsWrapper';
import { StringArrayNode } from '../../../custom-nodes/string-array-nodes/StringArrayNode';
import { StringArrayRotateFunctionNode } from '../../../custom-nodes/string-array-nodes/StringArrayRotateFunctionNode';
import { StringLiteralControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode';
import { StringLiteralNode } from '../../../custom-nodes/control-flow-flattening-nodes/StringLiteralNode';

export const customNodesModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // custom nodes
    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(ConsoleOutputDisableExpressionNode)
        .whenTargetNamed(CustomNode.ConsoleOutputDisableExpressionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionCallNode)
        .whenTargetNamed(CustomNode.DebugProtectionFunctionCallNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionIntervalNode)
        .whenTargetNamed(CustomNode.DebugProtectionFunctionIntervalNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionNode)
        .whenTargetNamed(CustomNode.DebugProtectionFunctionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DomainLockNode)
        .whenTargetNamed(CustomNode.DomainLockNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(NodeCallsControllerFunctionNode)
        .whenTargetNamed(CustomNode.NodeCallsControllerFunctionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(SelfDefendingUnicodeNode)
        .whenTargetNamed(CustomNode.SelfDefendingUnicodeNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(StringArrayCallsWrapper)
        .whenTargetNamed(CustomNode.StringArrayCallsWrapper);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(StringArrayNode)
        .whenTargetNamed(CustomNode.StringArrayNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(StringArrayRotateFunctionNode)
        .whenTargetNamed(CustomNode.StringArrayRotateFunctionNode);

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

    // node groups
    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(ConsoleOutputCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroup.ConsoleOutputCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(DebugProtectionCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroup.DebugProtectionCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(DomainLockCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroup.DomainLockCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(SelfDefendingCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroup.SelfDefendingCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(StringArrayCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroup.StringArrayCustomNodeGroup);

    // customNode factory
    bind<ICustomNode>(ServiceIdentifiers.Factory__ICustomNode)
        .toFactory<ICustomNode>(InversifyContainerFacade
            .getFactory<CustomNode, ICustomNode>(ServiceIdentifiers.ICustomNode));

    // control flow customNode constructor factory
    bind<ICustomNode>(ServiceIdentifiers.Factory__IControlFlowCustomNode)
        .toFactory<ICustomNode>(InversifyContainerFacade
            .getConstructorFactory<ControlFlowCustomNode, ICustomNode>(
                ServiceIdentifiers.Newable__ICustomNode,
                ServiceIdentifiers.Factory__IIdentifierNamesGenerator,
                ServiceIdentifiers.IRandomGenerator,
                ServiceIdentifiers.IOptions
            ));

    // dead code injection customNode constructor factory
    bind<ICustomNode>(ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode)
        .toFactory<ICustomNode>(InversifyContainerFacade
            .getConstructorFactory<DeadCodeInjectionCustomNode, ICustomNode>(
                ServiceIdentifiers.Newable__ICustomNode,
                ServiceIdentifiers.Factory__IIdentifierNamesGenerator,
                ServiceIdentifiers.IRandomGenerator,
                ServiceIdentifiers.IOptions
            ));

    // customNodeGroup factory
    bind<ICustomNodeGroup>(ServiceIdentifiers.Factory__ICustomNodeGroup)
        .toFactory<ICustomNodeGroup>(InversifyContainerFacade
            .getFactory<CustomNodeGroup, ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup));
});
