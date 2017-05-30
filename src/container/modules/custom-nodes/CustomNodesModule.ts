import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';
import { IOptions } from '../../../interfaces/options/IOptions';

import { CustomNode } from '../../../enums/container/custom-nodes/CustomNode';
import { CustomNodeGroup } from '../../../enums/container/custom-nodes/CustomNodeGroup';

import { ConsoleOutputCustomNodeGroup } from '../../../custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup';
import { DebugProtectionCustomNodeGroup } from '../../../custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup';
import { DomainLockCustomNodeGroup } from '../../../custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup';
import { SelfDefendingCustomNodeGroup } from '../../../custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup';
import { StringArrayCustomNodeGroup } from '../../../custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup';

import { BinaryExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode';
import { BlockStatementControlFlowFlatteningNode } from '../../../custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode';
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
    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(BinaryExpressionFunctionNode)
        .whenTargetNamed(CustomNode.BinaryExpressionFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(BlockStatementControlFlowFlatteningNode)
        .whenTargetNamed(CustomNode.BlockStatementControlFlowFlatteningNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(CallExpressionControlFlowStorageCallNode)
        .whenTargetNamed(CustomNode.CallExpressionControlFlowStorageCallNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(CallExpressionFunctionNode)
        .whenTargetNamed(CustomNode.CallExpressionFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ControlFlowStorageNode)
        .whenTargetNamed(CustomNode.ControlFlowStorageNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ConsoleOutputDisableExpressionNode)
        .whenTargetNamed(CustomNode.ConsoleOutputDisableExpressionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(DebugProtectionFunctionCallNode)
        .whenTargetNamed(CustomNode.DebugProtectionFunctionCallNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(DebugProtectionFunctionIntervalNode)
        .whenTargetNamed(CustomNode.DebugProtectionFunctionIntervalNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(DebugProtectionFunctionNode)
        .whenTargetNamed(CustomNode.DebugProtectionFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(DomainLockNode)
        .whenTargetNamed(CustomNode.DomainLockNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ExpressionWithOperatorControlFlowStorageCallNode)
        .whenTargetNamed(CustomNode.ExpressionWithOperatorControlFlowStorageCallNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(LogicalExpressionFunctionNode)
        .whenTargetNamed(CustomNode.LogicalExpressionFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(NodeCallsControllerFunctionNode)
        .whenTargetNamed(CustomNode.NodeCallsControllerFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(SelfDefendingUnicodeNode)
        .whenTargetNamed(CustomNode.SelfDefendingUnicodeNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringArrayCallsWrapper)
        .whenTargetNamed(CustomNode.StringArrayCallsWrapper);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringArrayNode)
        .whenTargetNamed(CustomNode.StringArrayNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringArrayRotateFunctionNode)
        .whenTargetNamed(CustomNode.StringArrayRotateFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringLiteralControlFlowStorageCallNode)
        .whenTargetNamed(CustomNode.StringLiteralControlFlowStorageCallNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringLiteralNode)
        .whenTargetNamed(CustomNode.StringLiteralNode);

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
        .toFactory<ICustomNode>((context: interfaces.Context) => {
            const cache: Map <CustomNode, interfaces.Newable<ICustomNode>> = new Map();

            let cachedOptions: IOptions;

            return (customNodeName: CustomNode) => {
                if (!cachedOptions) {
                    cachedOptions = context.container.get<IOptions>(ServiceIdentifiers.IOptions);
                }

                if (cache.has(customNodeName)) {
                    return new (<interfaces.Newable<ICustomNode>>cache.get(customNodeName));
                }

                const constructor: interfaces.Newable<ICustomNode> = context.container
                    .getNamed<interfaces.Newable<ICustomNode>>(
                        ServiceIdentifiers.Newable__ICustomNode,
                        customNodeName
                    );

                cache.set(customNodeName, constructor);

                return new constructor(cachedOptions);
            };
        });

    // customNodeGroup factory
    bind<ICustomNodeGroup>(ServiceIdentifiers.Factory__ICustomNodeGroup)
        .toFactory<ICustomNodeGroup>(InversifyContainerFacade
            .getFactory<CustomNodeGroup, ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup));
});
