import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformers } from '../../../enums/container/node-transformers/NodeTransformers';

export type TNodeTransformerFactory = (nodeTransformerName: NodeTransformers) => INodeTransformer;
