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
    const customNodesTag: string = 'customNodes';
    const customNodesConcreteFactoriesTag: string = 'customNodesConcreteFactories';

    // custom nodes
    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(BinaryExpressionFunctionNode)
        .whenTargetTagged(customNodesTag, CustomNodes.BinaryExpressionFunctionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(ControlFlowStorageCallNode)
        .whenTargetTagged(customNodesTag, CustomNodes.ControlFlowStorageCallNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(ControlFlowStorageNode)
        .whenTargetTagged(customNodesTag, CustomNodes.ControlFlowStorageNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(ConsoleOutputDisableExpressionNode)
        .whenTargetTagged(customNodesTag, CustomNodes.ConsoleOutputDisableExpressionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionCallNode)
        .whenTargetTagged(customNodesTag, CustomNodes.DebugProtectionFunctionCallNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionIntervalNode)
        .whenTargetTagged(customNodesTag, CustomNodes.DebugProtectionFunctionIntervalNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DebugProtectionFunctionNode)
        .whenTargetTagged(customNodesTag, CustomNodes.DebugProtectionFunctionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(DomainLockNode)
        .whenTargetTagged(customNodesTag, CustomNodes.DomainLockNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(NodeCallsControllerFunctionNode)
        .whenTargetTagged(customNodesTag, CustomNodes.NodeCallsControllerFunctionNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(SelfDefendingUnicodeNode)
        .whenTargetTagged(customNodesTag, CustomNodes.SelfDefendingUnicodeNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(StringArrayCallsWrapper)
        .whenTargetTagged(customNodesTag, CustomNodes.StringArrayCallsWrapper);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(StringArrayNode)
        .whenTargetTagged(customNodesTag, CustomNodes.StringArrayNode);

    bind<ICustomNode>(ServiceIdentifiers.ICustomNode)
        .to(StringArrayRotateFunctionNode)
        .whenTargetTagged(customNodesTag, CustomNodes.StringArrayRotateFunctionNode);

    // custom nodes concrete factories
    bind<ICustomNodesFactory>(ServiceIdentifiers.ICustomNodesFactory)
        .to(ConsoleOutputCustomNodesFactory)
        .whenTargetTagged(customNodesConcreteFactoriesTag, CustomNodesFactories.ConsoleOutputCustomNodesFactory);

    bind<ICustomNodesFactory>(ServiceIdentifiers.ICustomNodesFactory)
        .to(DebugProtectionCustomNodesFactory)
        .whenTargetTagged(customNodesConcreteFactoriesTag, CustomNodesFactories.DebugProtectionCustomNodesFactory);

    bind<ICustomNodesFactory>(ServiceIdentifiers.ICustomNodesFactory)
        .to(DomainLockCustomNodesFactory)
        .whenTargetTagged(customNodesConcreteFactoriesTag, CustomNodesFactories.DomainLockCustomNodesFactory);

    bind<ICustomNodesFactory>(ServiceIdentifiers.ICustomNodesFactory)
        .to(SelfDefendingCustomNodesFactory)
        .whenTargetTagged(customNodesConcreteFactoriesTag, CustomNodesFactories.SelfDefendingCustomNodesFactory);

    bind<ICustomNodesFactory>(ServiceIdentifiers.ICustomNodesFactory)
        .to(StringArrayCustomNodesFactory)
        .whenTargetTagged(customNodesConcreteFactoriesTag, CustomNodesFactories.StringArrayCustomNodesFactory);

    // customNode factory
    bind<ICustomNode>(ServiceIdentifiers['Factory<ICustomNode>'])
        .toFactory<ICustomNode>((context: interfaces.Context) => {
            return (customNodeName: CustomNodes) => {
                return context.container.getTagged<ICustomNode>(
                    ServiceIdentifiers.ICustomNode,
                    customNodesTag,
                    customNodeName
                );
            };
        });

    // customNodesFactory factory
    bind<ICustomNodesFactory>(ServiceIdentifiers['Factory<ICustomNodesFactory>'])
        .toFactory<ICustomNodesFactory>((context: interfaces.Context) => {
            return (customNodesFactoryName: CustomNodesFactories) => {
                return context.container.getTagged<ICustomNodesFactory>(
                    ServiceIdentifiers.ICustomNodesFactory,
                    customNodesConcreteFactoriesTag,
                    customNodesFactoryName
                );
            };
        });
});
