import { ContainerModule, interfaces } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { ICustomNodesFactory } from '../../../interfaces/custom-nodes/ICustomNodesFactory';

import { CustomNodes } from '../../../enums/container/CustomNodes';
import { CustomNodesFactories } from '../../../enums/container/CustomNodesFactories';

import { ConsoleOutputCustomNodesFactory } from '../../../custom-nodes/console-output-nodes/factory/ConsoleOutputCustomNodesFactory';
import { DebugProtectionCustomNodesFactory } from '../../../custom-nodes/debug-protection-nodes/factory/DebugProtectionCustomNodesFactory';
import { DomainLockCustomNodesFactory } from '../../../custom-nodes/domain-lock-nodes/factory/DomainLockCustomNodesFactory';
import { SelfDefendingCustomNodesFactory } from '../../../custom-nodes/self-defending-nodes/factory/SelfDefendingCustomNodesFactory';
import { StringArrayCustomNodesFactory } from '../../../custom-nodes/string-array-nodes/factory/StringArrayCustomNodesFactory';

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

    // custom nodes concrete factories
    bind<ICustomNodesFactory>(ServiceIdentifiers.ICustomNodesFactory)
        .to(ConsoleOutputCustomNodesFactory)
        .whenTargetNamed(CustomNodesFactories.ConsoleOutputCustomNodesFactory);

    bind<ICustomNodesFactory>(ServiceIdentifiers.ICustomNodesFactory)
        .to(DebugProtectionCustomNodesFactory)
        .whenTargetNamed(CustomNodesFactories.DebugProtectionCustomNodesFactory);

    bind<ICustomNodesFactory>(ServiceIdentifiers.ICustomNodesFactory)
        .to(DomainLockCustomNodesFactory)
        .whenTargetNamed(CustomNodesFactories.DomainLockCustomNodesFactory);

    bind<ICustomNodesFactory>(ServiceIdentifiers.ICustomNodesFactory)
        .to(SelfDefendingCustomNodesFactory)
        .whenTargetNamed(CustomNodesFactories.SelfDefendingCustomNodesFactory);

    bind<ICustomNodesFactory>(ServiceIdentifiers.ICustomNodesFactory)
        .to(StringArrayCustomNodesFactory)
        .whenTargetNamed(CustomNodesFactories.StringArrayCustomNodesFactory);

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

    // customNodesFactory factory
    bind<ICustomNodesFactory>(ServiceIdentifiers['Factory<ICustomNodesFactory>'])
        .toFactory<ICustomNodesFactory>((context: interfaces.Context) => {
            return (customNodesFactoryName: CustomNodesFactories) => {
                return context.container.getNamed<ICustomNodesFactory>(
                    ServiceIdentifiers.ICustomNodesFactory,
                    customNodesFactoryName
                );
            };
        });
});
