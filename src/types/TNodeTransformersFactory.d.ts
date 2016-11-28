import { INodeTransformer } from '../interfaces/INodeTransformer';

export type TNodeTransformersFactory = (nodeTransformersMap: Map<string, string[]>) => (nodeType: string) => INodeTransformer[];
