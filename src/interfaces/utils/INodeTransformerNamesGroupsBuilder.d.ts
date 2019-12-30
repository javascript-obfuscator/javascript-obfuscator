import { TNormalizedNodeTransformers } from '../../types/node-transformers/TNormalizedNodeTransformers';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';

export interface INodeTransformerNamesGroupsBuilder {
    /**
     * @param {TNormalizedNodeTransformers} normalizedNodeTransformers
     * @returns {NodeTransformer[][]}
     */
    build (normalizedNodeTransformers: TNormalizedNodeTransformers): NodeTransformer[][];
}
