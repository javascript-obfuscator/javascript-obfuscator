import { INodeTransformer } from '../interfaces/INodeTransformer';

import { NodeTransformers } from '../enums/container/NodeTransformers';

export type TNodeTransformersFactory = (nodeTransformersMap: Map<string, NodeTransformers[]>) => (nodeType: string) => INodeTransformer[];
