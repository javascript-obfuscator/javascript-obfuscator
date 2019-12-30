import { TNormalizedNodeTransformers } from './TNormalizedNodeTransformers';

import { NodeTransformer } from '../../enums/node-transformers/NodeTransformer';

export type TTransformersRunnerData = [TNormalizedNodeTransformers, NodeTransformer[][]];
