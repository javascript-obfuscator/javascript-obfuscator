import { INodeTransformer } from '../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformers } from '../../enums/container/NodeTransformers';

export type TNodeTransformerFactory = (nodeTransformerName: NodeTransformers) => INodeTransformer;
