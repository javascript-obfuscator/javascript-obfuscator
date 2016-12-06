import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';

import { CustomNodes } from '../../../enums/container/CustomNodes';
import { CustomNodeGroups } from '../../../enums/container/CustomNodeGroups';

import { ConsoleOutputCustomNodeGroup } from '../../../custom-nodes/console-output-nodes/group/ConsoleOutputCustomNodeGroup';
import { DebugProtectionCustomNodeGroup } from '../../../custom-nodes/debug-protection-nodes/group/DebugProtectionCustomNodeGroup';
import { DomainLockCustomNodeGroup } from '../../../custom-nodes/domain-lock-nodes/group/DomainLockCustomNodeGroup';
import { SelfDefendingCustomNodeGroup } from '../../../custom-nodes/self-defending-nodes/group/SelfDefendingCustomNodeGroup';
import { StringArrayCustomNodeGroup } from '../../../custom-nodes/string-array-nodes/group/StringArrayCustomNodeGroup';

import { BinaryExpressionFunctionNode } from '../../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/BinaryExpressionFunctionNode';
import { ControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-replacers-nodes/binary-expression-control-flow-replacer-nodes/ControlFlowStorageCallNode';
import { ControlFlowStorageNode } from '../../../custom-nodes/control-flow-storage-nodes/ControlFlowStorageNode';
import { ConsoleOutputDisableExpressionNode } from '../../../custom-nodes/console-output-nodes/ConsoleOutputDisableExpressionNode';
import { DebugProtectionFunctionCallNode } from '../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionCallNode';
import { DebugProtectionFunctionIntervalNode } from '../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionIntervalNode';
import { DebugProtectionFunctionNode } from '../../../custom-nodes/debug-protection-nodes/DebugProtectionFunctionNode';
import { DomainLockNode } from '../../../custom-nodes/domain-lock-nodes/DomainLockNode';
import { NodeCallsControllerFunctionNode } from '../../../custom-nodes/node-calls-controller-nodes/NodeCallsControllerFunctionNode';
import { SelfDefendingUnicodeNode } from '../../../custom-nodes/self-defending-nodes/SelfDefendingUnicodeNode';
import { StringArrayCallsWrapper } from '../../../custom-nodes/string-array-nodes/StringArrayCallsWrapper';
import { StringArrayNode } from '../../../custom-nodes/string-array-nodes/StringArrayNode';
import { StringArrayRotateFunctionNode } from '../../../custom-nodes/string-array-nodes/StringArrayRotateFunctionNode';

export const customNodesModule: interfaces.ContainerModule = new ContainerModule((bind: interfaces.Bind) => {
    // custom nodes
    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(BinaryExpressionFunctionNode)
        .whenTargetNamed(CustomNodes.BinaryExpressionFunctionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(ControlFlowStorageCallNode)
        .whenTargetNamed(CustomNodes.ControlFlowStorageCallNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(ControlFlowStorageNode)
        .whenTargetNamed(CustomNodes.ControlFlowStorageNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(ConsoleOutputDisableExpressionNode)
        .whenTargetNamed(CustomNodes.ConsoleOutputDisableExpressionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionCallNode)
        .whenTargetNamed(CustomNodes.DebugProtectionFunctionCallNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionIntervalNode)
        .whenTargetNamed(CustomNodes.DebugProtectionFunctionIntervalNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionNode)
        .whenTargetNamed(CustomNodes.DebugProtectionFunctionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DomainLockNode)
        .whenTargetNamed(CustomNodes.DomainLockNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(NodeCallsControllerFunctionNode)
        .whenTargetNamed(CustomNodes.NodeCallsControllerFunctionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(SelfDefendingUnicodeNode)
        .whenTargetNamed(CustomNodes.SelfDefendingUnicodeNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(StringArrayCallsWrapper)
        .whenTargetNamed(CustomNodes.StringArrayCallsWrapper);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(StringArrayNode)
        .whenTargetNamed(CustomNodes.StringArrayNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(StringArrayRotateFunctionNode)
        .whenTargetNamed(CustomNodes.StringArrayRotateFunctionNode);

    // node groups
    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(ConsoleOutputCustomNodeGroup)
        .inSingletonScope()
        .whenTargetNamed(CustomNodeGroups.ConsoleOutputCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(DebugProtectionCustomNodeGroup)
        .inSingletonScope()
        .whenTargetNamed(CustomNodeGroups.DebugProtectionCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(DomainLockCustomNodeGroup)
        .inSingletonScope()
        .whenTargetNamed(CustomNodeGroups.DomainLockCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(SelfDefendingCustomNodeGroup)
        .inSingletonScope()
        .whenTargetNamed(CustomNodeGroups.SelfDefendingCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(StringArrayCustomNodeGroup)
        .inSingletonScope()
        .whenTargetNamed(CustomNodeGroups.StringArrayCustomNodeGroup);

    // customNode factory
    bind<ICustomNode>(ServiceIdentifiers['Factory<ICustomNode>'])
        .toFactory<ICustomNode>((context: interfaces.Context) => {
            return (customNodeName: CustomNodes) => {
                return context.container.getNamed<ICustomNode>(
                    ServiceIdentifiers.ICustomNode,
                    customNodeName
                );
            };
        });

    // CustomNodeGroup factory
    bind<ICustomNodeGroup>(ServiceIdentifiers['Factory<ICustomNodeGroup>'])
        .toFactory<ICustomNodeGroup>((context: interfaces.Context) => {
            const cache: Map <CustomNodeGroups, ICustomNodeGroup> = new Map <CustomNodeGroups, ICustomNodeGroup> ();

            return (customNodeGroupName: CustomNodeGroups) => {
                if (cache.has(customNodeGroupName)) {
                    return <ICustomNodeGroup>cache.get(customNodeGroupName);
                }

                const customNodeGroup: ICustomNodeGroup = context.container.getNamed<ICustomNodeGroup>(
                    ServiceIdentifiers.ICustomNodeGroup,
                    customNodeGroupName
                );

                cache.set(customNodeGroupName, customNodeGroup);

                return customNodeGroup;
            };
        });
});
