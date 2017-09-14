import { INodeTransformer } from '../../../interfaces/node-transformers/INodeTransformer';

import { NodeTransformer } from '../../../enums/node-transformers/NodeTransformer';

export type TNodeTransformerFactory = (nodeTransformerName: NodeTransformer) => INodeTransformer;
