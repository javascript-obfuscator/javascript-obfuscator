import { inject, injectable, } from 'inversify';
import { ServiceIdentifiers } from '../../container/ServiceIdentifiers';

import * as estraverse from '@javascript-obfuscator/estraverse';
import * as ESTree from 'estree';

import { TControlFlowCustomNodeFactory } from '../../types/container/custom-nodes/TControlFlowCustomNodeFactory';
import { TControlFlowReplacerFactory } from '../../types/container/node-transformers/TControlFlowReplacerFactory';
import { TControlFlowStorageFactory } from '../../types/container/node-transformers/TControlFlowStorageFactory';

import { IOptions } from '../../interfaces/options/IOptions';
import { IRandomGenerator } from '../../interfaces/utils/IRandomGenerator';
import { IVisitor } from '../../interfaces/node-transformers/IVisitor';

import { ControlFlowReplacer } from '../../enums/node-transformers/control-flow-transformers/control-flow-replacers/ControlFlowReplacer';
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
     * @param {TControlFlowStorageFactory} controlFlowStorageFactory
     * @param {TControlFlowReplacerFactory} controlFlowReplacerFactory
     * @param {TControlFlowCustomNodeFactory} controlFlowCustomNodeFactory
     * @param {IRandomGenerator} randomGenerator
     * @param {IOptions} options
     */
    public constructor (
        @inject(ServiceIdentifiers.Factory__TControlFlowStorage)
            controlFlowStorageFactory: TControlFlowStorageFactory,
        @inject(ServiceIdentifiers.Factory__IControlFlowReplacer)
            controlFlowReplacerFactory: TControlFlowReplacerFactory,
        @inject(ServiceIdentifiers.Factory__IControlFlowCustomNode)
            controlFlowCustomNodeFactory: TControlFlowCustomNodeFactory,
        @inject(ServiceIdentifiers.IRandomGenerator) randomGenerator: IRandomGenerator,
        @inject(ServiceIdentifiers.IOptions) options: IOptions
    ) {
        super(
            controlFlowStorageFactory,
            controlFlowReplacerFactory,
            controlFlowCustomNodeFactory,
            randomGenerator,
            options
        );
    }

    /**
     * @param {NodeTransformationStage} nodeTransformationStage
     * @returns {IVisitor | null}
     */
    public override getVisitor (nodeTransformationStage: NodeTransformationStage): IVisitor | null {
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
}
