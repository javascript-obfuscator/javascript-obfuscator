import { INodeTransformer } from '../interfaces/INodeTransformer';

import { NodeTransformers } from '../enums/NodeTransformers';

export type TNodeTransformersFactory = (nodeTransformersMap: Map<string, NodeTransformers[]>) => (nodeType: string) => INodeTransformer[];
