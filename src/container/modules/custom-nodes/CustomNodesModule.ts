import { InversifyContainerFacade } from '../../InversifyContainerFacade';
import { ContainerModule, ContainerModuleLoadOptions, Newable, Factory } from 'inversify';
import { ServiceIdentifiers } from '../../ServiceIdentifiers';

import { ICustomNode } from '../../../interfaces/custom-nodes/ICustomNode';
import { IStringArrayIndexNode } from '../../../interfaces/custom-nodes/string-array-nodes/IStringArrayIndexNode';

import { ControlFlowCustomNode } from '../../../enums/custom-nodes/ControlFlowCustomNode';
import { DeadCodeInjectionCustomNode } from '../../../enums/custom-nodes/DeadCodeInjectionCustomNode';
import { ObjectExpressionKeysTransformerCustomNode } from '../../../enums/custom-nodes/ObjectExpressionKeysTransformerCustomNode';
import { StringArrayCustomNode } from '../../../enums/custom-nodes/StringArrayCustomNode';

import { BinaryExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/BinaryExpressionFunctionNode';
import { BlockStatementControlFlowFlatteningNode } from '../../../custom-nodes/control-flow-flattening-nodes/BlockStatementControlFlowFlatteningNode';
import { BlockStatementDeadCodeInjectionNode } from '../../../custom-nodes/dead-code-injection-nodes/BlockStatementDeadCodeInjectionNode';
import { CallExpressionControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/CallExpressionControlFlowStorageCallNode';
import { CallExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/CallExpressionFunctionNode';
import { ControlFlowStorageNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ControlFlowStorageNode';
import { ExpressionWithOperatorControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/ExpressionWithOperatorControlFlowStorageCallNode';
import { LogicalExpressionFunctionNode } from '../../../custom-nodes/control-flow-flattening-nodes/LogicalExpressionFunctionNode';
import { ObjectExpressionVariableDeclarationHostNode } from '../../../custom-nodes/object-expression-keys-transformer-nodes/ObjectExpressionVariableDeclarationHostNode';
import { StringArrayCallNode } from '../../../custom-nodes/string-array-nodes/StringArrayCallNode';
import { StringArrayHexadecimalNumberIndexNode } from '../../../custom-nodes/string-array-nodes/string-array-index-nodes/StringArrayHexadecimalNumberIndexNode';
import { StringArrayHexadecimalNumericStringIndexNode } from '../../../custom-nodes/string-array-nodes/string-array-index-nodes/StringArrayHexadecimalNumericStringIndexNode';
import { StringArrayIndexNode } from '../../../enums/custom-nodes/string-array-index-nodes/StringArrayIndexNode';
import { StringArrayScopeCallsWrapperFunctionNode } from '../../../custom-nodes/string-array-nodes/StringArrayScopeCallsWrapperFunctionNode';
import { StringArrayScopeCallsWrapperVariableNode } from '../../../custom-nodes/string-array-nodes/StringArrayScopeCallsWrapperVariableNode';
import { StringLiteralControlFlowStorageCallNode } from '../../../custom-nodes/control-flow-flattening-nodes/control-flow-storage-nodes/StringLiteralControlFlowStorageCallNode';
import { LiteralNode } from '../../../custom-nodes/control-flow-flattening-nodes/LiteralNode';

export const customNodesModule: ContainerModule = new ContainerModule((options: ContainerModuleLoadOptions) => {
    // control flow custom nodes
    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(BinaryExpressionFunctionNode)
        .whenNamed(ControlFlowCustomNode.BinaryExpressionFunctionNode);

    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(BlockStatementControlFlowFlatteningNode)
        .whenNamed(ControlFlowCustomNode.BlockStatementControlFlowFlatteningNode);

    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(CallExpressionControlFlowStorageCallNode)
        .whenNamed(ControlFlowCustomNode.CallExpressionControlFlowStorageCallNode);

    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(CallExpressionFunctionNode)
        .whenNamed(ControlFlowCustomNode.CallExpressionFunctionNode);

    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(ControlFlowStorageNode)
        .whenNamed(ControlFlowCustomNode.ControlFlowStorageNode);

    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(ExpressionWithOperatorControlFlowStorageCallNode)
        .whenNamed(ControlFlowCustomNode.ExpressionWithOperatorControlFlowStorageCallNode);

    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(LiteralNode)
        .whenNamed(ControlFlowCustomNode.LiteralNode);

    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(LogicalExpressionFunctionNode)
        .whenNamed(ControlFlowCustomNode.LogicalExpressionFunctionNode);

    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(StringLiteralControlFlowStorageCallNode)
        .whenNamed(ControlFlowCustomNode.StringLiteralControlFlowStorageCallNode);

    // dead code injection custom nodes
    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(BlockStatementDeadCodeInjectionNode)
        .whenNamed(DeadCodeInjectionCustomNode.BlockStatementDeadCodeInjectionNode);

    // object expression keys transformer nodes
    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(ObjectExpressionVariableDeclarationHostNode)
        .whenNamed(ObjectExpressionKeysTransformerCustomNode.ObjectExpressionVariableDeclarationHostNode);

    // string array nodes
    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(StringArrayCallNode)
        .whenNamed(StringArrayCustomNode.StringArrayCallNode);

    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(StringArrayScopeCallsWrapperFunctionNode)
        .whenNamed(StringArrayCustomNode.StringArrayScopeCallsWrapperFunctionNode);

    options
        .bind<Newable<ICustomNode>>(ServiceIdentifiers.Newable__ICustomNode)
        .toConstantValue(StringArrayScopeCallsWrapperVariableNode)
        .whenNamed(StringArrayCustomNode.StringArrayScopeCallsWrapperVariableNode);

    // string array index nodes
    options
        .bind<IStringArrayIndexNode>(ServiceIdentifiers.IStringArrayIndexNode)
        .to(StringArrayHexadecimalNumberIndexNode)
        .inSingletonScope()
        .whenNamed(StringArrayIndexNode.StringArrayHexadecimalNumberIndexNode);

    options
        .bind<IStringArrayIndexNode>(ServiceIdentifiers.IStringArrayIndexNode)
        .to(StringArrayHexadecimalNumericStringIndexNode)
        .inSingletonScope()
        .whenNamed(StringArrayIndexNode.StringArrayHexadecimalNumericStringIndexNode);

    // control flow customNode constructor factory
    options
        .bind<Factory<ICustomNode, [ControlFlowCustomNode]>>(ServiceIdentifiers.Factory__IControlFlowCustomNode)
        .toFactory(
            InversifyContainerFacade.getConstructorFactory<ControlFlowCustomNode, ICustomNode>(
                ServiceIdentifiers.Newable__ICustomNode,
                ServiceIdentifiers.Factory__IIdentifierNamesGenerator,
                ServiceIdentifiers.ICustomCodeHelperFormatter,
                ServiceIdentifiers.IRandomGenerator,
                ServiceIdentifiers.IOptions
            )
        );

    // dead code injection customNode constructor factory
    options
        .bind<
            Factory<ICustomNode, [DeadCodeInjectionCustomNode]>
        >(ServiceIdentifiers.Factory__IDeadCodeInjectionCustomNode)
        .toFactory(
            InversifyContainerFacade.getConstructorFactory<DeadCodeInjectionCustomNode, ICustomNode>(
                ServiceIdentifiers.Newable__ICustomNode,
                ServiceIdentifiers.Factory__IIdentifierNamesGenerator,
                ServiceIdentifiers.ICustomCodeHelperFormatter,
                ServiceIdentifiers.IRandomGenerator,
                ServiceIdentifiers.IOptions
            )
        );

    // object expression keys transformer customNode constructor factory
    options
        .bind<
            Factory<ICustomNode, [ObjectExpressionKeysTransformerCustomNode]>
        >(ServiceIdentifiers.Factory__IObjectExpressionKeysTransformerCustomNode)
        .toFactory(
            InversifyContainerFacade.getConstructorFactory<ObjectExpressionKeysTransformerCustomNode, ICustomNode>(
                ServiceIdentifiers.Newable__ICustomNode,
                ServiceIdentifiers.Factory__IIdentifierNamesGenerator,
                ServiceIdentifiers.ICustomCodeHelperFormatter,
                ServiceIdentifiers.IRandomGenerator,
                ServiceIdentifiers.IOptions
            )
        );

    // string array customNode constructor factory
    options
        .bind<Factory<ICustomNode, [StringArrayCustomNode]>>(ServiceIdentifiers.Factory__IStringArrayCustomNode)
        .toFactory(
            InversifyContainerFacade.getConstructorFactory<StringArrayCustomNode, ICustomNode>(
                ServiceIdentifiers.Newable__ICustomNode,
                ServiceIdentifiers.Factory__IIdentifierNamesGenerator,
                ServiceIdentifiers.Factory__IStringArrayIndexNode,
                ServiceIdentifiers.ICustomCodeHelperFormatter,
                ServiceIdentifiers.IStringArrayStorage,
                ServiceIdentifiers.IArrayUtils,
                ServiceIdentifiers.IRandomGenerator,
                ServiceIdentifiers.IOptions
            )
        );

    // string array index node factory
    options
        .bind<Factory<IStringArrayIndexNode, [StringArrayIndexNode]>>(ServiceIdentifiers.Factory__IStringArrayIndexNode)
        .toFactory(
            InversifyContainerFacade.getCacheFactory<StringArrayIndexNode, IStringArrayIndexNode>(
                ServiceIdentifiers.IStringArrayIndexNode
            )
        );
});
