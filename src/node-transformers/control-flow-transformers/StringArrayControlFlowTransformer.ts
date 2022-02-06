import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowReplacerFactory } from '../../types/container/node-transformers/TControlFlowReplacerFactory';
import {
    TControlFlowStorageFactoryCreator
} from '../../types/container/node-transformers/TControlFlowStorageFactoryCreator';
import { TNodeWithStatements } from '../../types/node/TNodeWithStatements';

import { IControlFlowStorage } from '../../interfaces/storages/control-flow-transformers/IControlFlowStorage';
import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { ControlFlowReplacer } from '../../enums/node-transformers/control-flow-transformers/control-flow-replacers/ControlFlowReplacer';
import { ControlFlowStorage } from '../../enums/storages/ControlFlowStorage';
import { NodeType } from '../../enums/node/NodeType';
import { NodeTransformationStage } from '../../enums/node-transformers/NodeTransformationStage';
import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';

import { FunctionControlFlowTransformer } from './FunctionControlFlowTransformer';
import { NodeGuards } from '../../node/NodeGuards';

@injectable()
export class StringArrayControlFlowTransformer extends FunctionControlFlowTransformer {
    /**
     * @type {NodeTransformer[]}
     */
    public override readonly runAfter: NodeTransformer[] = [
        NodeTransformer.StringArrayTransformer,
        NodeTransformer.StringArrayRotateFunctionTransformer,
        NodeTransformer.StringArrayScopeCallsWrapperTransformer
    ];

    /**
     * @type {Map <string, ControlFlowReplacer>}
     */
    protected override readonly controlFlowReplacersMap: Map <string, ControlFlowReplacer> = new Map([
        [NodeType.Literal, ControlFlowReplacer.StringArrayCallControlFlowReplacer]
    ]);

    /**
     * @type {WeakSet<VariableDeclaration>}
     */
    protected readonly controlFlowStorageNodes: WeakSet<ESTree.VariableDeclaration> = new WeakSet();

    /**
     * @param {TControlFlowStorageFactoryCreator} controlFlowStorageFactoryCreator
     * @param {TControlFlowReplacerFactory} controlFlowReplacerFactory
     * @param {TControlFlowCustomNodeFactory} controlFlowCustomNodeFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__TControlFlowStorage)
            controlFlowStorageFactoryCreator: TControlFlowStorageFactoryCreator,
        @inject(ServiceIdentifiers.Factory__IControlFlowReplacer)
            controlFlowReplacerFactory: TControlFlowReplacerFactory,
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
            controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            controlFlowStorageFactoryCreator,
            controlFlowReplacerFactory,
            controlFlowCustomNodeFactory,
            randomGenerator,
            options
        );

        this.controlFlowStorageFactory = controlFlowStorageFactoryCreator(ControlFlowStorage.StringControlFlowStorage);
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public override getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
        if (!this.options.stringArrayCallsTransform) {
            return null;
        }

        switch (nodeTransformationStage) {
            case NodeTransformationStage.StringArray:
                return {
                    leave: (
                        node: ESTree.Node,
                        parentNode: ESTree.Node | null
                    ): ESTree.Node | estraverse.VisitorOption | void => {
                        if (parentNode && NodeGuards.isFunctionNode(node)) {
                            return this.transformNode(node, parentNode);
                        }
                    }
                };

            default:
                return null;
        }
    }

    /**
     * @param {Node} node
     * @param {Node | null} parentNode
     * @param {Function} functionNode
     * @param {IControlFlowStorage} controlFlowStorage
     * @returns {ESTraverse.VisitorOption | Node}
     */
    protected override transformFunctionBodyNode (
        node: ESTree.Node,
        parentNode: ESTree.Node | null,
        functionNode: ESTree.Function,
        controlFlowStorage: IControlFlowStorage
    ): estraverse.VisitorOption | ESTree.Node {
        const isControlFlowStorageNode = NodeGuards.isVariableDeclarationNode(node)
            && this.controlFlowStorageNodes.has(node);

        if (isControlFlowStorageNode) {
            return estraverse.VisitorOption.Skip;
        }

        return super.transformFunctionBodyNode(node, parentNode, functionNode, controlFlowStorage);
    }

    /**
     * @param {TNodeWithStatements} hostNode
     * @returns {TControlFlowStorage}
     */
    protected override getControlFlowStorage (hostNode: TNodeWithStatements): IControlFlowStorage {
        return this.controlFlowStorageFactory();
    }

    /**
     * @param {TNodeWithStatements} hostNode
     * @param {VariableDeclaration} controlFlowStorageNode
     */
    protected override appendControlFlowStorageNode (
        hostNode: TNodeWithStatements,
        controlFlowStorageNode: ESTree.VariableDeclaration
    ): void {
        super.appendControlFlowStorageNode(hostNode, controlFlowStorageNode);

        this.controlFlowStorageNodes.add(controlFlowStorageNode);
    }

    /**
     * @returns {boolean}
     */
    protected override isAllowedTransformationByThreshold (): boolean {
        return this.randomGenerator.getMathRandom() <= this.options.stringArrayCallsTransformThreshold;
    }
}
