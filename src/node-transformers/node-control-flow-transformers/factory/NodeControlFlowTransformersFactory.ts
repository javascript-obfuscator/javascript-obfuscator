import { TNodeTransformer } from '../../../types/TNodeTransformer';

import { NodeType } from '../../../enums/NodeType';

import { FunctionControlFlowTransformer } from '../FunctionControlFlowTransformer';
import { AbstractNodeTransformersFactory } from '../../AbstractNodeTransformersFactory';

export class NodeControlFlowTransformersFactory extends AbstractNodeTransformersFactory {
    /**
     * @type {Map<string, TNodeTransformer[]>}
     */
    protected readonly nodeTransformers: Map <string, TNodeTransformer[]> = new Map <string, TNodeTransformer[]> ([
        [NodeType.FunctionDeclaration, [FunctionControlFlowTransformer]],
        [NodeType.FunctionExpression, [FunctionControlFlowTransformer]]
    ]);
}
