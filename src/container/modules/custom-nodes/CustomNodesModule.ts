import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { ICustomNodeGroup } from '../../../interfaces/custom-nodes/ICustomNodeGroup';
import { IOptions } from '../../../interfaces/options/IOptions';

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
    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(BinaryExpressionFunctionNode)
        .whenTargetNamed(CustomNodes.BinaryExpressionFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ControlFlowStorageCallNode)
        .whenTargetNamed(CustomNodes.ControlFlowStorageCallNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ControlFlowStorageNode)
        .whenTargetNamed(CustomNodes.ControlFlowStorageNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(ConsoleOutputDisableExpressionNode)
        .whenTargetNamed(CustomNodes.ConsoleOutputDisableExpressionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(DebugProtectionFunctionCallNode)
        .whenTargetNamed(CustomNodes.DebugProtectionFunctionCallNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(DebugProtectionFunctionIntervalNode)
        .whenTargetNamed(CustomNodes.DebugProtectionFunctionIntervalNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(DebugProtectionFunctionNode)
        .whenTargetNamed(CustomNodes.DebugProtectionFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(DomainLockNode)
        .whenTargetNamed(CustomNodes.DomainLockNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(NodeCallsControllerFunctionNode)
        .whenTargetNamed(CustomNodes.NodeCallsControllerFunctionNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(SelfDefendingUnicodeNode)
        .whenTargetNamed(CustomNodes.SelfDefendingUnicodeNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringArrayCallsWrapper)
        .whenTargetNamed(CustomNodes.StringArrayCallsWrapper);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringArrayNode)
        .whenTargetNamed(CustomNodes.StringArrayNode);

    bind<interfaces.Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstructor(StringArrayRotateFunctionNode)
        .whenTargetNamed(CustomNodes.StringArrayRotateFunctionNode);

    // node groups
    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(ConsoleOutputCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroups.ConsoleOutputCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(DebugProtectionCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroups.DebugProtectionCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(DomainLockCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroups.DomainLockCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(SelfDefendingCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroups.SelfDefendingCustomNodeGroup);

    bind<ICustomNodeGroup>(ServiceIdentifiers.ICustomNodeGroup)
        .to(StringArrayCustomNodeGroup)
        .whenTargetNamed(CustomNodeGroups.StringArrayCustomNodeGroup);

    // customNode factory
    bind<ICustomNode>(ServiceIdentifiers.Factory__ICustomNode)
        .toFactory<ICustomNode>((context: interfaces.Context) => {
            const cache: Map <CustomNodes, interfaces.Newable<ICustomNode>> = new Map();

            let cachedOptions: IOptions;

            return (customNodeName: CustomNodes) => {
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
        .toFactory<ICustomNodeGroup>((context: interfaces.Context) => {
            return (customNodeGroupName: CustomNodeGroups) => {
                return context.container.getNamed<ICustomNodeGroup>(
                    ServiceIdentifiers.ICustomNodeGroup,
                    customNodeGroupName
                );
            };
        });
});
