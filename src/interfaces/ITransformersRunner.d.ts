import * as ESTree from 'estree';

import { NodeTransformer } from '../enums/container/node-transformers/NodeTransformer';

export interface ITransformersRunner {
    /**
     * @param {T} astTree
     * @param {NodeTransformer[]} nodeTransformers
     * @returns {T}
     */
    transform <T extends ESTree.Program> (astTree: T, nodeTransformers: NodeTransformer[]): T;
}
