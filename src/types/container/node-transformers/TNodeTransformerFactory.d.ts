import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/container/node-transformers/NodeTransformer';

export type TNodeTransformerFactory = (nodeTransformerName: NodeTransformer) => INodeTransformer;
